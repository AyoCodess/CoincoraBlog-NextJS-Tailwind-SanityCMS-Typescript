import { GetStaticProps } from 'next';
import React, { Children } from 'react';
import { client } from '../../sanity';
import { PostsData } from '../../typings';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { Form, FormCommentBox, Headers } from '../../components';

// builds image URL from an image object
const builder = imageUrlBuilder(client);
const urlFor = (source: object) => builder.image(source);
interface Props {
  post: PostsData;
}

const Post = ({ post }: Props) => {
  console.log(post);

  const components = {
    block: {
      h1: ({ children }: any) => (
        <h1 className='text-4xl font-bold my-5'>{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className='text-3xl font-bold my-5'>{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className='text-2xl font-bold my-5'>{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className='text-xl font-bold my-5'>{children}</h4>
      ),
      normal: ({ children }: any) => <p className=' my-2'>{children}</p>,
    },

    marks: {
      link: ({ value, children }: any) => (
        <a
          target='_blank'
          rel='noopener'
          className='text-blue-500 hover:underline cursor-pointer'
          href={value.href}>
          {children}
        </a>
      ),
      br: () => <br className='my-2' />,
    },

    list: {
      bullet: ({ children }: any) => (
        <ul className='ml-4 list-none my-4'>{children}</ul>
      ),
      number: ({ children }: any) => <ol className='my-4 '>{children}</ol>,
    },
  };

  return (
    <main>
      <Headers />
      <img
        className='w-full h-40 object-cover'
        src={urlFor(post.mainImage).url()!}
      />
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-5 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          {post.description}
        </h2>

        <div className='flex items-center space-x-2 mt-4'>
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
        <div className='mt-10'>
          <PortableText value={post.body} components={components} />
        </div>
      </article>
      <hr className='max-w-lg my-5 mx-auto border border-blue-500' />
      <Form post={post} />
      <FormCommentBox post={post} />
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
    revalidate: 60 * 60, // after 1 hour it will update the old cache
  };
};
