import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '/components';

const Home: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header /> 
    </div>
  );
};

export default Home;
