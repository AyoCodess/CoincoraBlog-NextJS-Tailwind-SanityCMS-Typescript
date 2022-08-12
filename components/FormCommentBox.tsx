import React from 'react';
import { PostsData } from '../typings';

interface Props {
  post: PostsData;
}

export const FormCommentBox = ({ post }: Props) => {
  //   console.log(post);
  return (
    <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-blue-500 shadow space-y-2'>
      {post.comments.length === 0 && <h3 className='text-4xl'>No Comments</h3>}
      {post.comments.length > 0 && (
        <div>
          <h3 className='text-4xl'>Comments</h3>
          <hr className='pb-2' />
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <span className='text-blue-500'>{comment.name}: </span>
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
