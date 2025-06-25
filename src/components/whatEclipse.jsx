'use client';

export default function WhatIsEclipse() {
  return (
    <section className="w-full px-6 py-12 flex flex-col items-center justify-center text-white bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
      <h2 className="text-5xl md:text-6xl text-center font-ekl italic mb-4">
        What is Eclipse?
      </h2>

      <p className="text-center text-lg md:text-xl font-obv-light mb-3 max-w-2xl">
        We’re not here to change how people date.
      </p>
      <p className="text-center text-lg md:text-xl font-obv-light mb-6 max-w-2xl">
        You already go out—in your city, with friends, overpriced drinks, and a little hope you’ll meet someone.
      </p>

      {/* Logo Placeholder */}
      <div className="w-28 h-28 mb-6 rounded-full bg-white flex items-center justify-center shadow-md">
        <img src="eclipse_logo_color.png" alt="Eclipse Logo" className="h-16 w-16 object-contain" />
      </div>

      <p className="text-center text-lg md:text-xl font-obv-light max-w-2xl mb-4">
        Eclipse is an app that connects people going out in the same neighborhood, on the same night—
        <em> naturally</em> and <em>safely</em>.
      </p>

      <p className="text-center text-lg md:text-xl font-obv-light max-w-2xl">
        Built to move with your night<br />
        You’re never locked in, just always <em>synced</em>.
      </p>
    </section>
  );
}