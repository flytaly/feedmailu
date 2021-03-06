import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import AddDigestFeedForm from '../components/forms/add-digest-feed-form';
import Layout from '../components/layout/layout';
import { MessageItem } from '../components/main-card/animated-message';
import FormSide from '../components/main-card/form-side';
import MessagesSide from '../components/main-card/messages-side';
import MainCard from '../components/main-card/main-card';
import { useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/is-server';

const infoMessages: MessageItem[] = [
  {
    text:
      'FeedMailu is an RSS/Atom reader that also can aggregate your feeds into digests and send them to you via email.',
    key: 'intro-message',
  },
  {
    text:
      'To start receiving digests just enter an address of the desired feed, email, and digest period',
    key: 'digest-message',
  },
];

const ifLogoutMsg: MessageItem[] = [
  {
    content: (
      <span>
        <span>To read or manage your feeds </span>
        <Link href="/login">
          <a className="underline text-primary">log in</a>
        </Link>
        {' or '}
        <Link href="/register">
          <a className="underline text-primary">register</a>
        </Link>
      </span>
    ),
    key: 'login-reader-message',
  },
];

const Home: NextPage = () => {
  const { data, loading } = useMeQuery({ skip: isServer() });
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const items = [...infoMessages, ...(!loading && !data?.me ? ifLogoutMsg : []), ...messages];
  return (
    <Layout>
      <MainCard>
        <MessagesSide items={items} />
        <FormSide>
          <h2 className="text-xl font-bold mb-4 text-center">Add a feed</h2>
          <AddDigestFeedForm email={data?.me?.email} setMessages={setMessages} />
        </FormSide>
      </MainCard>
    </Layout>
  );
};

export default Home;
