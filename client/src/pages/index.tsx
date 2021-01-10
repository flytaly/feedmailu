import { NextPage } from 'next';
import React from 'react';
import Layout from '../components/layout/layout';
import WelcomeCard from '../components/welcome-card';

const Home: NextPage = () => {
  return (
    <Layout>
      <WelcomeCard />
    </Layout>
  );
};

export default Home;