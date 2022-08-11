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

export const Posts = ({ posts }: Props) => (
  <>
    {posts.map((post) => (
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div>
          <img src={urlFor(post.mainImage).url()!} alt='blog image' />
          <div>
            <div>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </>
);
