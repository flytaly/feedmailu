const schedule = require('node-schedule');
const pLimit = require('p-limit');
const pick = require('lodash.pick');
const logger = require('../logger');
const { getNewItems } = require('../feed-parser');

class Watcher {
    /**
     * @param {object} db - connection to Prisma Binding
     * @param {string} cron - update schedule time in cron format
     * @param {object} [options]
     * @param {number} options.maxConnections=40 - maximum number of concurrent connection for updating feeds
     * @param {number} options.maxNewItems=150 - maximum number of new items saving per feed
     * @param {number} options.itemMaxTime - maximum time of storing items
     */
    constructor(db, {
        cron = '*/1 * * * *',
        maxConnections = 40,
        maxNewItems = 150,
        itemMaxTime = (1000 * 60 * 60 * 24) * 2, // 2 days
    } = {}) {
        this.db = db;
        this.cron = cron;
        this.maxConnections = maxConnections;
        this.maxNewItems = maxNewItems;
        this.itemMaxTime = itemMaxTime;
    }

    async getFeedsInfo() {
        return this.db.query.feeds({}, '{ url }');
    }

    async getItems(url) {
        const { items } = await this.db.query.feed({ where: { url } }, '{ items { pubDate guid } }');
        return items;
    }

    /**
     * Delete items that are older than this.itemMaxTime except one last item
     */
    async deleteOldItems(url) {
        try {
            const lastItem = (await this.db.query.feedItems({
                last: 1,
                where: { feed: { url } },
            },
            '{ id }'));
            const lastItemId = lastItem[0] ? lastItem[0].id : null;
            if (lastItemId) {
                const oldItems = {
                    AND: [{ createdAt_lt: new Date(Date.now() - this.itemMaxTime) },
                        { feed: { url } },
                        { id_not: lastItemId }],
                };
                await this.db.mutation.deleteManyItemEnclosures({
                    where: {
                        item: oldItems,
                    },
                });
                const { count } = await this.db.mutation.deleteManyFeedItems({
                    where: oldItems,
                });
                if (count) { logger.info({ count, url }, 'items were deleted'); }
            }
            /* const { aggregate: { count } } = await this.db.query.feedItemsConnection(
                { where: { feed: { url } } },
                '{aggregate {count}}',
            );
            logger.info(`total number of ${url} items: ${count}`); */
        } catch (e) {
            logger.error(e);
        }
    }

    async saveFeed(url, newItems) {
        const items = newItems
            .sort((a, b) => a.pubDate - b.pubDate)
            .slice(-this.maxNewItems);
        const query = {
            where: { url },
            data: { items: { create: items } },
        };
        await this.db.mutation.updateFeed(query);
        return items.length;
    }

    async updateMeta(url, feedMeta) {
        const fields = ['title', 'description', 'link', 'language'];
        const meta = pick(feedMeta, fields);
        meta.imageUrl = feedMeta.image.url;
        meta.imageTitle = feedMeta.image.title;
        return this.db.mutation.updateFeed({
            where: { url },
            data: meta,
        });
    }

    async update() {
        const feeds = await this.getFeedsInfo();
        const limit = pLimit(this.maxConnections);
        let [totalFeeds, totalNewItems] = [0, 0];
        await Promise.all(
            feeds.map(({ url }) => limit(async () => {
                try {
                    let savedItemsCount = 0;
                    const items = await this.getItems(url);

                    const { feedItems: newItems, feedMeta } = await getNewItems(url, items, Watcher.filterFields);
                    this.updateMeta(url, feedMeta);
                    if (newItems.length) {
                        savedItemsCount = await this.saveFeed(url, newItems);
                        totalNewItems += savedItemsCount;
                    }
                    logger.info({ url, newItems: savedItemsCount }, 'A feed was updated');
                    totalFeeds += 1;
                    this.deleteOldItems(url);
                } catch (error) {
                    logger.error({ url, message: error.message }, 'Couldn\'t update a feed');
                }
            })),
        );
        logger.info({ totalFeeds, totalNewItems }, 'Feeds were updated');
    }

    start() {
        this.job = schedule.scheduleJob(this.cron, () => this.update());
    }

    cancel() {
        this.job.cancel();
        logger.info('Watcher stopped');
    }

    reschedule(spec) {
        this.job.reschedule(spec);
    }

    getNextUpdateTime() {
        return this.job.nextInvocation();
    }

    static filterFields(item) {
        const fields = ['title', 'description', 'summary', 'pubDate', 'link', 'guid'];
        const encFields = ['url', 'type', 'length'];

        const obj = pick(item, fields);
        if (item.image && item.image.url) {
            obj.imageUrl = item.image.url;
        }
        if (item.enclosures && item.enclosures.length) {
            obj.enclosures = { create: item.enclosures.map(e => pick(e, encFields)) };
        }

        return obj;
    }
}

module.exports = Watcher;
