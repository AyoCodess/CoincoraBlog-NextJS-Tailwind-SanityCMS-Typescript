import Link from 'next/link';
import React from 'react';

export const Header = () => {
  return (
    <header>
      <div>
        <Link href='/'>
          <img
            className='w-44 object-contain'
            src='https://links.papareact.com/yvf'
          />
        </Link>
      </div>
      <div></div>
    </header>
  );
};
