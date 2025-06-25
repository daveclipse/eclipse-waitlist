'use client';

import { motion } from "framer-motion";

export default function ScrollingBanner({
  text = "Launching Exclusively in Chicago this July • Only Accepting the First 3,000 Sign-Ups • ",
  speed = 60, 
}) {
  return (
    <div className="w-full overflow-hidden bg-[#1d225b] text-white font-obv-light py-1.5">
      <div className="relative whitespace-nowrap flex">
        <motion.div
          className="flex gap-16 text-base"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: speed,
          }}
        >
          <span className="flex gap-16">
            {text.repeat(10)}
          </span>
        </motion.div>
      </div>
    </div>
  );
}