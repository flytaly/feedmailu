import 'reflect-metadata';
import { Feed } from '../../entities/Feed';
import { Item } from '../../entities/Item';
import { User } from '../../entities/User';
import { UserFeed } from '../../entities/UserFeed';
import '../../tests/test-utils/connection';
import { generateItemEntity, generateUserWithFeed } from '../../tests/test-utils/generate-feed';
import { transport } from '../../mail/transport';
import { buildAndSendDigests } from '../build-and-send';
import { composeDigest } from '../compose-mail';
import { composeEmailSubject } from '../compose-subject';
import { isFeedReady } from '../is-feed-ready';

jest.mock('../is-feed-ready', () => ({
    isFeedReady: jest.fn((uf: UserFeed) => {
        expect(uf.schedule).toBeDefined();
        expect(uf.user.timeZone).toBeDefined();
        expect(uf.user.options.dailyDigestHour).toBeDefined();
        return true;
    }),
}));
jest.mock('../../mail/transport', () => ({ transport: { sendMail: jest.fn(async () => {}) } }));
jest.mock('../compose-mail', () => ({
    composeDigest: jest.fn((uf: UserFeed, feed: Feed, items: Item[]) => {
        expect(uf.schedule).toBeDefined();
        expect(uf.user.timeZone).toBeDefined();
        expect(uf.user.options.dailyDigestHour).toBeDefined();
        expect(feed.title).toBeDefined();
        expect(items.length > 0).toBeTruthy();
        expect(items[0].guid).toBeDefined();
        return { text: 'text', html: 'html', errors: [] };
    }),
}));

let user: User;
let feed: Feed;
let userFeed: UserFeed;

beforeAll(async () => {
    ({ user, feed, userFeed } = await generateUserWithFeed());
});

afterAll(async () => {
    await user.remove();
    await feed.remove();
});

const hour = 1000 * 60 * 60;

describe('Build and Send Digests', () => {
    const newItems: Item[] = [];
    const oldItems: Item[] = [];
    beforeAll(async () => {
        const now = Date.now();
        const lastDigestTime = now - hour * 24;
        userFeed.lastDigestSentAt = new Date(lastDigestTime);
        await userFeed.save();
        const item = (time: number) => generateItemEntity(feed.id, new Date(time));
        oldItems.push(await item(lastDigestTime - hour * 2));
        oldItems.push(await item(lastDigestTime - hour));
        oldItems.push(await item(lastDigestTime));
        newItems.push(await item(lastDigestTime + hour));
        newItems.push(await item(lastDigestTime + hour * 2));
        newItems.push(await item(lastDigestTime + hour * 3));
    });
    test('should get new items and send digest mail', async () => {
        await buildAndSendDigests(feed.id);
        expect(isFeedReady).toHaveBeenCalled();
        expect(composeDigest).toHaveBeenCalled();
        const call = (composeDigest as jest.Mock).mock.calls[0];
        const itemsPassed = call[2] as Item[];
        expect(itemsPassed).toHaveLength(newItems.length);
        const ids = new Set(newItems.map((i) => i.id));
        itemsPassed.forEach((item) => expect(ids.has(item.id)).toBeTruthy());

        expect(transport.sendMail).toHaveBeenCalledWith({
            from: process.env.MAIL_FROM,
            subject: composeEmailSubject(feed.title, userFeed.schedule, user.options.customSubject),
            to: user.email,
            html: 'html',
            text: 'text',
        });
    });

    test('should not send too old items even if they were created after last digest', async () => {
        (composeDigest as jest.Mock).mockClear();
        userFeed.lastDigestSentAt = new Date(0);
        await userFeed.save();
        // save very old item
        await generateItemEntity(feed.id, new Date(Date.now() - hour * 48));

        await buildAndSendDigests(feed.id);
        const call = (composeDigest as jest.Mock).mock.calls[0];
        const itemsPassed = call[2] as Item[];
        expect(itemsPassed.length).toBe(newItems.length + oldItems.length);

        const ids = new Set([...oldItems, ...newItems].map((i) => i.id));
        itemsPassed.forEach((item) => expect(ids.has(item.id)).toBeTruthy());
    });
});