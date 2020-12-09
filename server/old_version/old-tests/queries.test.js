/* eslint-env jest */
const { HttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');
const { execute, makePromise } = require('apollo-link');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const createServer = require('../server');
const db = require('../bind-prisma');
const mocks = require('./mocks/queries.mocks');
const createAuthMiddleware = require('../middlewares/jwtAuth');

let yogaApp;
let user;

const addTestData = async (prisma) => {
    const { schedule, url } = mocks.feed;
    const email = mocks.user.email.toLowerCase();
    const createFeed = { create: { url } };
    const createUserFeed = { create: { schedule, feed: createFeed } };
    const newUser = {
        email,
        password: await bcrypt.hash(mocks.user.password, 10),
        permissions: { set: ['USER'] },
        feeds: createUserFeed,
    };
    user = await prisma.mutation.createUser({ data: newUser });
};

const clearTestDB = async (prisma) => {
    const { email } = mocks.user;
    const { url } = mocks.feed;
    const userExists = await prisma.exists.User({ email });
    const feedExists = await prisma.exists.Feed({ url });
    if (userExists) {
        await prisma.mutation.deleteUser({ where: { email } });
    }
    if (feedExists) {
        await prisma.mutation.deleteFeed({ where: { url } });
    }
};

beforeAll(async () => {
    const server = createServer(db);
    server.express.use(cookieParser());
    server.express.use(createAuthMiddleware(db));
    const app = await server.start({ port: 0 });

    yogaApp = app;
    await clearTestDB(db);
    await addTestData(db);
});

afterAll(async () => {
    yogaApp.close();
    await clearTestDB(db);
});

describe('Test GraphQL queries:', () => {
    let link;
    let linkWithAuthCookies;

    beforeAll(() => {
        const { port } = yogaApp.address();

        link = new HttpLink({ uri: `http://127.0.0.1:${port}`, fetch });
        linkWithAuthCookies = new HttpLink({
            uri: `http://127.0.0.1:${port}`,
            fetch,
            credentials: 'same-origin',
            headers: {
                cookie: `token=${jwt.sign({ userId: user.id }, process.env.APP_SECRET)}`,
            },
        });
    });

    describe('me', () => {
        const USER_WITH_FEEDS_QUERY = gql`query{
            me {
                email
                id
                feeds {
                    schedule
                    feed {
                        url
                    }
                }
            }
        }`;
        test('should return user with feeds', async () => {
            const { data } = await makePromise(execute(linkWithAuthCookies, {
                query: USER_WITH_FEEDS_QUERY,
                variables: { email: mocks.user.email },
            }));

            const { schedule, url } = mocks.feed;
            expect(data.me).toMatchObject({
                id: user.id,
                email: user.email,
                feeds: [{ schedule, feed: { url } }],
            });
        });

        test('should return error if user isn\'t authenticated', async () => {
            const { data, errors } = await makePromise(execute(link, {
                query: USER_WITH_FEEDS_QUERY,
                variables: { email: mocks.user.email },
            }));
            expect(data.me).toBeNull();
            expect(errors[0].message).toEqual('Authentication is required');
        });
    });

    describe('myFeeds', () => {
        const MY_FEEDS_QUERY = gql`query{
            myFeeds {
                    schedule
                    feed {
                        url
                    }
            }
        }`;
        test('should return feeds', async () => {
            const { data } = await makePromise(execute(linkWithAuthCookies, {
                query: MY_FEEDS_QUERY,
            }));

            const { schedule, url } = mocks.feed;
            expect(data.myFeeds[0]).toMatchObject({
                schedule,
                feed: { url },
            });
        });

        test('should return error if user isn\'t authenticated', async () => {
            const { data, errors } = await makePromise(execute(link, {
                query: MY_FEEDS_QUERY,
            }));
            expect(data).toBeNull();
            expect(errors[0].message).toEqual('Authentication is required');
        });
    });

    describe('feedTitle', () => {
        const USER_FEED_TITLE_QUERY = gql`query (
            $id: ID!
          ) {
            userFeedTitle(
              id: $id
            ) {
              title
            }
        }`;
        test('should return title', async () => {
            const { url } = mocks.feed;
            const title = 'Some Test Title';
            const userFeeds = await db.query.userFeeds({ where: { feed: { url } } }, '{ id feed { title url link } }');
            const { id } = userFeeds[0];

            const makeQuery = () => makePromise(execute(link, {
                query: USER_FEED_TITLE_QUERY,
                variables: { id },
            }));

            const { data: noTitle } = await makeQuery();
            expect(noTitle).toMatchObject({ userFeedTitle: { title: url } });

            await db.mutation.updateFeed({ where: { url }, data: { title } });
            const { data: withTitle } = await makeQuery();
            expect(withTitle).toMatchObject({ userFeedTitle: { title } });
        });

        test('should return error', async () => {
            const { errors } = await makePromise(execute(link, {
                query: USER_FEED_TITLE_QUERY,
                variables: { id: 'fakeID' },
            }));

            expect(errors).toHaveLength(1);
            expect(errors[0]).toMatchObject({ message: 'The feed doesn\'t exist' });
        });
    });
});