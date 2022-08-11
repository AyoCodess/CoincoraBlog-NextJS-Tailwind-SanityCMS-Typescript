import { GetStaticProps } from 'next';
import React, { Children } from 'react';
import { client } from '../../sanity';
import { PostsData } from '../../typings';
import imageUrlBuilder from '@sanity/image-url';
import PortableText from 'react-portable-text';
import { Form, Header } from '../../components';

// builds image URL from an image object
const builder = imageUrlBuilder(client);
const urlFor = (source: object) => builder.image(source);
interface Props {
  post: PostsData;
}

const Post = ({ post }: Props) => {
  console.log(post);
  return (
    <main>
      <Header />
      <img
        className='w-full h-40 object-cover'
        src={urlFor(post.mainImage).url()!}
      />
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          {post.description}
        </h2>

        <div className='flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={urlFor(post.author.image).url()!}
            alt='author image'
          />
          <p className='font-extralight text-sm'>
            Blog post By{' '}
            <span className='text-green-600'>{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <PortableText
            className='mt-10'
            content={post.body}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            serializers={{
              h1: (props: any) => (
                <h1 className='text-2xl font-bold my-5'>{props}</h1>
              ),
              h2: (props: any) => (
                <h2 className='text-xl font-bold my-5'>{props}</h2>
              ),
              li: (props: any) => <li className='ml-4 list-disc'>{props}</li>,
              link: ({ href, children }: any) => (
                <a className='text-blue-500 hover:underline' href={href}>
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
      <Form />
    </main>
  );
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
