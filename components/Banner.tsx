import React from 'react';

export const Banner = () => {
  return (
    <div className='flex justify-between items-center bg-white border-y border-slate-400 py-10'>
      <div className='px-10 space-y-5'>
        <h1 className='text-6xl max-w-xl '>
          <span className='underline decoration-black decoration-4'>
            Coincora
          </span>{' '}
          The Crypto Knowledge Base
        </h1>{' '}
        <h2>Lowering risk and ambiguity in crypto-investing</h2>
      </div>
      <img
        className='hidden md:inline-flex h-44 lg:h-50'
        src='/btc-favicon8.png'
        alt='logo'
      />
      <div></div>
    </div>
  );
};
