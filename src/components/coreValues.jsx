import React, { useEffect, useRef, useState } from "react";
import { FaUserLock, FaClock, FaHeart } from "react-icons/fa";
import { MdOutlineNightlight } from "react-icons/md";
import { BsStars } from "react-icons/bs";

const cards = [
  {
    title: "Safety First",
    icon: <FaUserLock size={28} />,
    text: (
      <>
        Neighborhood-based, never exact venues—your location stays private.
        <br /><br />
        Close enough to meet, spread out enough to feel safe.
        <br /><br />
        You’re always in public, always in control.
      </>
    ),
  },
  {
    title: "Designed Around Your Night",
    icon: <MdOutlineNightlight size={28} />,
    text: (
      <>
        During the day, no profile browsing, swiping or chatting.
        <br /><br />
        Just choose where you’re going out that night.
        <br /><br />
        At <strong>7 PM</strong>, see people that match your preferences and plans.
      </>
    ),
  },
  {
    title: "Confidence and Clarity",
    icon: <FaClock size={28} />,
    text: (
      <>
        With just 3 matches per night in your neighborhood, every like is intentional.
        <br /><br />
        No cold approaches. No confusion. Just mutual interest.
      </>
    ),
  },
  {
    title: "No Algorithm. No Paywall.",
    icon: <BsStars size={28} />,
    text: (
      <>
        Eclipse is 100% free. No subscriptions. No premium features.
        <br /><br />
        No referrals or application—just download and start.
        <br /><br />
        No algorithms. Just options.
      </>
    ),
  },
  {
    title: "Mimics Real Dating",
    icon: <FaHeart size={28} />,
    text: (
      <>
        Built to meet, not text forever.
        <br /><br />
        Matches and chats reset every morning.
        <br /><br />
        Profiles show just enough to spark something—you figure out the rest in person.
      </>
    ),
  },
];

export default function TheCore() {
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        setCurrentIndex(nextIndex);
        const child = scrollContainer.children[nextIndex];
        scrollContainer.scrollTo({
          left: child.offsetLeft - scrollContainer.offsetWidth / 2 + child.offsetWidth / 2,
          behavior: "smooth",
        });
      }, 4000);
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    return (
      <div className="w-full bg-white py-6">
        <h2 className="text-3xl font-ekl text-[#1d225b] text-center mb-4">
          Why Eclipse is <em>different</em>
        </h2>
        <div
          ref={scrollRef}
          className="h-[50vh] overflow-x-scroll no-scrollbar flex snap-x snap-mandatory space-x-6 px-4 scroll-smooth"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`snap-center my-10 shrink-0 transition-all duration-500 ${
                index === currentIndex ? "scale-105 shadow-xl" : "scale-95 opacity-80"
              } w-[85%] sm:w-[60%] md:w-[40%] bg-white border border-[#1d225b]/20 text-[#1d225b] p-6 rounded-lg shadow-md flex flex-col justify-center`}
            >
              <div className="flex justify-center mb-3 text-[#1d225b]">{card.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-center font-obv">{card.title}</h3>
              <p className="text-sm text-center font-obv-light leading-snug">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }