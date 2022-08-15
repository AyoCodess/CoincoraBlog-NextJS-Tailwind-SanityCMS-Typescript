import type { NextPage } from 'next';
import Head from 'next/head';
import { Headers, Banner, Posts } from '../components';
import { client } from '../sanity';
import { PostsData } from '../typings';

interface Props {
  posts: PostsData[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Coincora Blog</title>
        <link rel='icon' href='/btc-favicon8.png' />
        {/* <!-- * META TAGS FOR SOCIAL MEDIA * --> */}
        <meta property='og:title' content='Coincora Blog' />
        <meta property='og:description' content='The Crypto Knowledge Base' />
        <meta name='description' content='The Crypto Knowledge Base' />
        <meta property='og:image' content='https://i.imgur.com/7iee3YZ.png' />
        <meta property='og:url' content='https://coincora-blog.vercel.app/' />
        <meta property='og:site_name' content='Ayo Codes - Portfolio Website' />
        <meta property='og:locale' content='en_GB' />
        <meta property='og:type' content='website' />
        <meta name='twitter:image' content='https://i.imgur.com/7iee3YZ.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Coincora Blog' />
        <meta name='twitter:description' content='The Crypto Knowledge Base' />
        <meta name='twitter:site' content='@ayo__codes' />
        <meta name='twitter:creator' content='@ayo__codes' />
        {/* <!-- * META TAGS FOR SOCIAL MEDIA ENDS * -->*/}
      </Head>
      <Headers />
      <Banner />
      <Posts posts={posts} />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `* [_type == "post"] {
  _id,
  title,
  author -> {
  name,
  image
},
description,
body,
mainImage,
slug
}
`;

  const posts = await client.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
