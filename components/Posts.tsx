import Link from 'next/link';
import React from 'react';
import { PostsData } from '../typings';
import { client } from '../sanity';
import imageUrlBuilder from '@sanity/image-url';

// builds image URL from an image object
const builder = imageUrlBuilder(client);
const urlFor = (source: object) => builder.image(source);
interface Props {
  posts: PostsData[];
}

export const Posts = ({ posts }: Props) => {
  //   console.log(posts);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className=' border rounded-lg group cursor-pointer overflow-hidden'>
            <img
              className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
              src={urlFor(post.mainImage).url()!}
              alt='blog image'
            />
            <div className='flex justify-between p-5 bg-white'>
              <div>
                <p className='text-lg font-bold'>{post.title}</p>
                <p className='text-xs'>
                  {post.description} by {post.author.name}{' '}
                </p>
                <p></p>
              </div>
              <img
                className='h-12 w-12 rounded-full'
                src={urlFor(post.author.image).url()!}
                alt='author image'
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
