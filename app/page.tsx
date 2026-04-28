"use client";
import { useContext } from "react";

import Link from "next/link";
import DailyQuotes from "./components/DailyQuotes";
import { HunterContext } from "./context/HunterContext";

export default function Home() {
  const context = useContext(HunterContext);
  if (!context) return null;

  const { hunter, setHunter } = context;

  return (
    <>
      <div className="bg-surface-container-high flex flex-col h-screen w-screen justify-center items-center gap-4 p-4">
        <div className="flex flex-col text-2xl font-semibold italic align-middle items-center justify-center">
          <DailyQuotes />
        </div>
        <Link
          href="profile"
          className="flex h-12 w-48 items-center justify-center bg-primary text-background font-bold tracking-widest text-xs px-6 opacity-80 hover:opacity-100 transition-opacity"
          onClick={() => {
            setHunter({
              userName: "Shadow Monarch",
              rank: "E",
              level: 25,
              xp: 750000,
            });
          }}
        >
          Enter System
        </Link>
      </div>
    </>
  );
}
