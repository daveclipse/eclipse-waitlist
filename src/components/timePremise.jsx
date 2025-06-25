'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  { time: '7am-7pm', blurb: 'Pick your neighborhood for tonight.', phrase: 'No swiping. No chatting. Just set your plans.' },
  { time: '7pm', blurb: 'See who’s going out where you are—and fits your type.', phrase: 'Meet that same night.' },
  { time: '7am', blurb: 'Chats and matches disappear.', phrase: 'A fresh start every morning.' },
];

const radius = 200;
const duration = 1.4;

export default function TimePremise() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isNight = titles[index].time === '7pm';

  return (
    <motion.div
      className="relative flex items-center justify-center pt-10 h-[40vh] overflow-hidden"
      animate={{ backgroundColor: isNight ? '#1D225B' : '#F89C1B' }}
      transition={{ duration: 1 }}
    >
      {/* Semi-circle path */}
      <svg
        viewBox="0 0 400 400"
        className="absolute w-[500px] h-[500px] top-[10%]"
      >
        <path
          d="M0,200 A200,200 0 0,1 400,200"
          fill="none"
          stroke="white"
          strokeWidth="4"
        />
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={titles[index].time}
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          className="absolute origin-bottom"
          style={{
            top: `calc(10% + ${radius}px)`,
            transform: `translateX(-50%)`,
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{ transform: `translateY(-${radius}px)` }}
          >
            <h1 className="text-3xl mt-4 font-bold text-white font-ekl mb-2">
              {titles[index].time}
            </h1>
            <p className="text-2xl text-white/90 mt-4 font-obv-light w-[300px] text-center">
              {titles[index].blurb}
            </p>
            <p className="text-lg text-white/90 mt-4 font-obv-italic w-[300px] text-center">
              {titles[index].phrase}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}