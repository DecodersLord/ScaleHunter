"use client";
import React from "react";

import { FaRegEdit } from "react-icons/fa";

import { useState, useRef } from "react";

import RankProgressBar from "./components/RankProgressBar";
import HunterBadgeSection from "./components/HunterBadgeSection";

import MasteryQudrant from "./components/MasteryQudrant";

export default function page() {
  const renderCounterRef = useRef(0);

  renderCounterRef.current++;

  return (
    <>
      <main className="flex flex-1 w-full flex-col items-center gap-4">
        <div className="flex flex-row gap-12">
          <HunterBadgeSection />
          <div className="flex flex-col gap-6">
            <RankProgressBar />
            <MasteryQudrant />
          </div>
        </div>
      </main>
    </>
  );
}
