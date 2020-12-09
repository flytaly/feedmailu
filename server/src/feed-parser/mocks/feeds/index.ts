import fs from 'fs';
import path from 'path';

function readXMLFilesInDir(dir: string) {
    const files = fs.readdirSync(path.join(__dirname, dir));

    return files
        .filter((x) => x.endsWith('.xml'))
        .reduce((acc, currentFile) => {
            const data = fs.readFileSync(path.join(__dirname, dir, currentFile), 'utf-8');

            return { ...acc, [currentFile.slice(0, -4)]: data };
        }, {});
}

export type MockFeedName = 'habrahabr' | 'dzone' | 'nytimes';

type FeedMocks = {
    [key in MockFeedName]: string;
};

export const mocks = readXMLFilesInDir('feeds') as FeedMocks;
export const updatedFeeds = readXMLFilesInDir('updated') as FeedMocks;

export const feeds: { url: URL; mock: string; updateMock: string }[] = [
    {
        url: new URL('https://habrahabr.ru/rss/hubs/all'),
        mock: mocks.habrahabr,
        updateMock: updatedFeeds.habrahabr,
    },
    {
        url: new URL('http://rss.nytimes.com/services/xml/rss/nyt/World.xml'),
        mock: mocks.nytimes,
        updateMock: updatedFeeds.nytimes,
    },
    {
        url: new URL('http://feeds.dzone.com/home'),
        mock: mocks.dzone,
        updateMock: updatedFeeds.dzone,
    },
];