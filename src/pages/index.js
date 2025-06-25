import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import Waitlist from "@/components/waitlist";
import Header from "@/components/header";
import VictoryGrid from "@/components/images";
import ScrollingBanner from "@/components/banner";
import TitleSaying from "@/components/titleSaying";
import TimePremise from "@/components/timePremise";
import Footer from "@/components/footer"
import TheCore from "@/components/coreValues";
import WhatIsEclipse from "@/components/whatEclipse";
import Head from "next/head";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const neighborhoods = [
  "Rodgers Park / Loyola",
  "Lincoln Square / Andersonville",
  "Lakeview / Wrigley",
  "Lincoln Park / Old Town",
  "Wicker / Bucktown / Logan Square",
  "Pilsen / Bridgeport",
  "West Loop / Fulton Market",
  "River North / Gold Coast",
  "The Loop",
];

export default function Home() {
  return (
    <>
    <Head>
        <title>Eclipse</title>
    </Head>
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/chicago4.JPG')" }}>
      <div className="absolute inset-0 backdrop-brightness-50 z-0" />
      {/* <div className="absolute inset-0 bg-[#ACDCFF]/60 backdrop-brightness-40 z-0" /> */}

      
      <div className="relative z-10">
        <div className="min-h-screen">
          <Header />
          <ScrollingBanner/>
          <TitleSaying />
          <Waitlist />
        </div>

        <TimePremise />
        <WhatIsEclipse/>
        <TheCore/>
        <Footer/>
      </div>
    </div>
    </>
  );
}