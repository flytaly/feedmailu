/* eslint-env jest */
const moment = require('moment');

const { getNewItems } = require('../feed-parser/parse-utils');
const Watcher = require('../feed-watcher');
const { filterAndClearHtml } = require('../feed-watcher/utils');
const mocks = require('./mocks/feed-watcher.mocks');
const cache = require('../cache');

jest.mock('../feed-parser/parse-utils', () => ({
    getNewItems: jest.fn(() => ({ feedItems: mocks.newFeedItems, feedMeta: null })),
}));

jest.mock('../mail-sender/dispatcher.js', () => ({
    buildAndSendDigests: jest.fn(),
}));

jest.mock('../cache');

const db = {
    query: {
        feeds: jest.fn(async () => [mocks.feed]),
        feed: jest.fn(async () => ({ items: mocks.oldFeedItems })),
        feedItems: jest.fn(async () => [{ id: mocks.id }]),
    },
    mutation: {
        updateFeed: jest.fn(async () => null),
        deleteManyItemEnclosures: jest.fn(async () => ({ count: 1 })),
        deleteManyFeedItems: jest.fn(async () => ({ count: 1 })),
    },
};

beforeEach(() => {
    jest.resetModules();
});

describe('Feed watcher', () => {
    test('should create watcher\'s instance that has managing methods', () => {
        const feedWatcher = new Watcher(db);
        feedWatcher.start();
        expect(moment.isMoment(feedWatcher.getNextUpdateTime())).toBeTruthy();

        feedWatcher.cancel();
        expect(feedWatcher.getNextUpdateTime()).toBeNull();
    });

    test('should call update every fixed amount of time', async () => {
        const feedWatcher = new Watcher(db, { cron: '*/1 * * * * *' }); // update every second
        feedWatcher.update = jest.fn();
        feedWatcher.start();
        await new Promise(resolve => setTimeout(resolve, 2010));
        feedWatcher.cancel();
        expect(feedWatcher.update).toHaveBeenCalledTimes(2);
    });

    test('should update feed with new items', async () => {
        const feedWatcher = new Watcher(db);
        await feedWatcher.update();
        expect(db.query.feeds).toHaveBeenCalled();
        expect(db.query.feed).toHaveBeenCalledWith(
            { where: { url: mocks.feed.url } },
            '{ items { pubDate guid } }',
        );
        expect(getNewItems).toHaveBeenCalledWith(mocks.feed.url, mocks.oldFeedItems, filterAndClearHtml);
        expect(db.mutation.updateFeed).toHaveBeenCalledWith({
            where: { url: mocks.feed.url },
            data: { items: { create: mocks.newFeedItems } },
        });
    });

    test('should delete old items', () => {
        const feedWatcher = new Watcher(db);
        feedWatcher.deleteOldItems(mocks.feed.url);

        expect(db.mutation.deleteManyItemEnclosures).toHaveBeenCalled();
        expect(db.mutation.deleteManyFeedItems).toHaveBeenCalled();
    });
});

describe('Feed watcher: filterFields method', () => {
    test('should return object with necessary fields and clean dirty HTML', () => {
        const item = {
            ...mocks.item,
            needless: 'Unnecessary field',
            image: mocks.itemImage,
        };
        const resultItem = {
            ...mocks.itemClean,
            imageUrl: mocks.itemImage.url,
        };
        expect(filterAndClearHtml(item)).toEqual(resultItem);
    });

    test('should return object with enclosures', () => {
        const item = {
            ...mocks.item,
            image: mocks.itemImage,
            enclosures: mocks.enclosures,
        };
        const resultItem = {
            ...mocks.itemClean,
            imageUrl: mocks.itemImage.url,
            enclosures: {
                create: mocks.enclosures,
            },
        };
        expect(filterAndClearHtml(item)).toEqual(resultItem);
    });
});

describe('Url locker', () => {
    let feedWatcher = {};
    const { url } = mocks.feed;
    beforeAll(() => {
        feedWatcher = new Watcher(db);
        feedWatcher.updateFeed = jest.fn(async () => 1);
        feedWatcher.setFeedUpdateTime = jest.fn(async () => {});
    });
    beforeEach(jest.clearAllMocks);
    test('should lock and then unlock url', async () => {
        await feedWatcher.update();
        expect(cache.isLocked).toHaveBeenCalledWith(url);
        expect(cache.lock).toHaveBeenCalledWith(url);
        expect(cache.unlock).toHaveBeenCalledWith(url);
        expect(feedWatcher.updateFeed).toHaveBeenCalled();
        expect(feedWatcher.setFeedUpdateTime).toHaveBeenCalled();
    });
    test('shouldn\'t update if url is locked', async () => {
        cache.isLocked.mockImplementationOnce(async () => true);
        await feedWatcher.update();
        expect(cache.isLocked).toHaveBeenCalledWith(url);
        expect(cache.lock).not.toHaveBeenCalledWith(url);
        expect(cache.unlock).not.toHaveBeenCalledWith(url);
        expect(feedWatcher.updateFeed).not.toHaveBeenCalled();
        expect(feedWatcher.setFeedUpdateTime).not.toHaveBeenCalled();
    });
});