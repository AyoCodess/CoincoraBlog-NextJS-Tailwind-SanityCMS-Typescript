import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PostsData } from '../typings';

interface FieldValues {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: PostsData;
}

export const Form = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
      setSubmitted(false);
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <>
      {submitted && (
        <div className='flex flex-col p-10 my-10 bg-blue-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>Thank you for your comment</h3>
          <p>Once it has been approved it will appear below</p>
        </div>
      )}
      {!submitted && (
        <form
          className='flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10'
          onSubmit={handleSubmit(onSubmit)}>
          <h3 className=' text-sm text-blue-500'>Enjoy this article</h3>
          <h4 className='text-3xl font-bold'>Leave a comment below</h4>
          <hr className='oy-3 mt-2' />

          <input
            {...register('_id')}
            type='hidden'
            name='_id'
            value={post._id}
          />

          <label className=' block mb-5'>
            <span className='text-gray-700'>Name</span>
            <input
              {...register('name', { required: true })}
              className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 outline-none focus:ring  '
              type='text'
              placeholder='Your Name'
            />
          </label>
          <label className=' block mb-5'>
            <span className='text-gray-700'>Email</span>
            <input
              {...register('email', { required: true })}
              className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-blue-500 outline-none focus:ring  '
              type='text'
              placeholder='Your Name'
            />
          </label>
          <label className=' block mb-5'>
            <span className='text-gray-700'>Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className='shadow border rounded py-2 px-3 form-textarea mt-2 block w-full ring-blue-500 outline-none focus:ring'
              rows={8}
              placeholder='Your Name'
            />
          </label>
          {/* // errors will return when field validation fails */}
          <div className='flex flex-col p-5'>
            {errors.name && (
              <span className='text-red-500'> - Name is required</span>
            )}
            {errors.email && (
              <span className='text-red-500'> - Email is required</span>
            )}
            {errors.comment && (
              <span className='text-red-500'>- Comment is required</span>
            )}
          </div>

          <input
            type='Submit'
            className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
          />
        </form>
      )}
    </>
  );
};
