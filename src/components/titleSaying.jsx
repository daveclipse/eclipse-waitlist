import React from 'react';

function TitleSaying({}) {
  return (
    <div className="flex mt-10 justify-center items-center flex-col min-h-1/2 text-white px-4 text-center">
      <h1 className="font-obv-light text-2xl md:text-3xl lg:text-5xl leading-tight tracking-tight max-w-3xl">
        You won’t need to lie about where you met.
      </h1>
      <h1 className="font-obv-italic text-xl md:text-2xl lg:text-3xl mt-6 tracking-wide max-w-xl">
        Let Eclipse make the introduction.
      </h1>
    </div>
  );
}

export default TitleSaying;