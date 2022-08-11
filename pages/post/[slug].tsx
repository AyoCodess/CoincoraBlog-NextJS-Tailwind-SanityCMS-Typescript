import { GetStaticProps } from 'next';
import React from 'react';
import { client } from '../../sanity';
import { PostsData } from '../../typings';

interface Props {
  post: PostsData;
}

const Post = ({ post }: Props) => {
  console.log(post);
  return <main>game</main>;
};

export default Post;

// gets us an array of slugs to build each page and creates the paths to pre-build
export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug {
            current
        }
    }`;

  const posts = await client.fetch(query);

  const paths = posts.map((post: PostsData) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

// gets us the data for each page from the slugs we built
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        'comments': *[
           _type == "comment" &&
           post._ref == ^._id && 
           approved == true],
        description,
        mainImage,
        slug,
        body
}`;

  const post = await client.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24, // after 1day it will update the old cache
  };
};
