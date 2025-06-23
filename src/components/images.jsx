import React from "react";
import Waitlist from "@/components/waitlist";

const images = [
  "chicago1.JPG",
  "chicago9.JPG",
  "chicago2.jpeg",
  "chicago3.jpeg",
  "chicago8.jpeg",
  "chicago4.JPG",
  "chicago5.jpeg",
  "chicago10.jpeg",
  "chicago6.jpeg",
  "chicago7.jpeg",
  "chicago8.jpeg",
  "chicago9.JPG",
  "chicago3.jpeg",
  "chicago5.jpeg",
    "chicago2.jpeg",
    "chicago10.jpeg",
    "chicago3.jpeg"

];

export default function VictoryGrid() {
  return (
    <div className="relative bg-[#1D225B] w-full p-6">
      <div className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <Waitlist/>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 space-y-6 pointer-events-none relative z-10">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Victory item ${idx}`}
            className="w-full  break-inside-avoid"
          />
        ))}
      </div>
    </div>
  );
}