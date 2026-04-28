"use client";
import { createContext } from "react";

export type HunterStats = {
  userName: string;
  xp: number;
  rank: string;
  level: number;
};

export type HunterContextType = {
  hunter: HunterStats;
  setHunter: React.Dispatch<React.SetStateAction<HunterStats>>;
};

export const HunterContext = createContext<HunterContextType | undefined>(
  undefined,
);
