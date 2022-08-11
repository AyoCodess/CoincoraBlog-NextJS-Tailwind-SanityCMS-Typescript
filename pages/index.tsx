import type { NextPage } from 'next';
import Head from 'next/head';
import { Header, Banner, Posts } from '../components';
import { client } from '../sanity';
import { PostsData } from '../typings';

interface Props {
  posts: PostsData[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header /> 
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
