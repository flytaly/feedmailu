const moment = require('moment-timezone');
const nanoid = require('nanoid');
const normalizeUrl = require('normalize-url');
const { getFeedStream, checkFeedInfo } = require('../../feed-parser');
const { filterMeta } = require('../../feed-watcher/utils');
const logger = require('../../logger');
const { sendConfirmSubscription } = require('../../mail-sender/dispatcher');

async function addFeed(parent, args, ctx) {
    let feedMeta = {};
    const { feedSchedule: schedule, locale, timeZone } = args;

    const email = args.email.trim().toLowerCase();
    let url;
    try {
        url = normalizeUrl(args.feedUrl);
        if (!url.includes('.')) throw new Error();
    } catch (e) {
        return new Error('Not valid argument: feedUrl');
    }
    if (!email) { // TODO: add additional validations
        throw new Error('Not valid argument: email');
    }
    if (timeZone && !moment.tz.zone(timeZone)) {
        return new Error('Not valid argument: timeZone');
    }

    // check if url is a valid feed before adding it to db
    if (!await ctx.db.exists.Feed({ url })) {
        try {
            const feedStream = await getFeedStream(url, { timeout: 3000 });
            const { isFeed, meta } = await checkFeedInfo(feedStream);

            if (!isFeed) throw new Error('Not a feed');

            feedMeta = meta;
        } catch (e) {
            if (e.message === 'Not a feed') throw e;
            logger.error(e);
            throw new Error('Couldn\'t get access to feed');
        }
    }

    const feed = await ctx.db.mutation.upsertFeed({
        where: { url },
        create: { url, ...filterMeta(feedMeta) },
        update: {},
    });
    if (!feed) throw new Error(`Couldn't save feed ${url}`);

    const userFeeds = await ctx.db.query.userFeeds({ where: {
        user: { email },
        feed: { url },
    } }, '{ id activated }');
    const userFeed = userFeeds && userFeeds.length && userFeeds[0];

    if (userFeed && userFeed.activated) throw new Error('The feed was already added');

    const activationToken = await nanoid(20);
    const activationTokenExpiry = new Date(Date.now() + 1000 * 3600 * 24); // 24 hours
    const createNewUserFeed = {
        create: {
            schedule,
            activationToken,
            activationTokenExpiry,
            feed: { connect: { id: feed.id } },
        },
    };

    const upsertUserFeed = {
        upsert: {
            where: { id: userFeed && userFeed.id },
            update: { schedule, activationToken, activationTokenExpiry },
            create: createNewUserFeed.create,
        },
    };

    let user;
    try {
        user = await ctx.db.mutation.upsertUser({
            where: { email },
            create: {
                email,
                permissions: { set: ['USER'] },
                feeds: createNewUserFeed,
                ...(locale ? { locale } : {}),
                ...(timeZone ? { timeZone } : {}),
            },
            update: {
                feeds: upsertUserFeed,
                ...(locale ? { locale } : {}),
                ...(timeZone ? { timeZone } : {}),
            },
        });
    } catch (e) {
        logger.error(e);
    }
    if (!user) throw new Error(`Couldn't save feed to user ${email}`);

    const title = feedMeta.title ? feedMeta.title : url;
    await sendConfirmSubscription(email, activationToken, title);

    return { message: `Activation link has been sent to ${email}` };
}

module.exports = addFeed;
