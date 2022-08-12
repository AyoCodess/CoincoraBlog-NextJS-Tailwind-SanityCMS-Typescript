import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Header = () => {
  return (
    <header className='flex justify-between p-5 max-w-7xl mx-auto'>
      <div className='flex items-center space-x-5'>
        <Link href='/'>
          <a>
            <Image
              className='cursor-pointer'
              src='/btc-favicon8.png'
              width={44}
              height={44}
              alt='logo'
            />
          </a>
        </Link>
        <div className='hidden md:inline-flex items-center space-x-5'>
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className='text-white bg-blue-600 px-4 py-1 rounded-full'>
            Follow
          </h3>
        </div>
      </div>
      <div className='flex items-center space-x-5 text-blue-600'>
        <h3>Sign In</h3>
        <h3 className='border px-4 py-1 rounded-full border-blue-600'>
          Get Started
        </h3>
      </div>
    </header>
  );
};
