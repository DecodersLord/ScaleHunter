"use client";
import { createContext } from "react";

export type DailyDungeonsType = {
  id: number;
  title: string;
  description: string;
  rank: "S" | "A" | "B" | "C" | "D" | "E";
  xp: number;
  targetArchitecture: Array<string>;
  status: "Open" | "Cleared" | "Failed";
  masteryQuadrant: string;
};

export type DailyDungeons = {
  dungeon: DailyDungeonsType;
  completed: boolean;
  processing: boolean;
};

export type DailyDungeonsStats = {
  dungeons: Array<DailyDungeons>;
  totalXp: number;
  earnedXp: number;
  lastUpdated?: string;
};

export type DailyDungeonsContextType = {
  dailyDungeonsStats: DailyDungeonsStats;
  setDailyDungeonsStats: (
    value:
      | DailyDungeonsStats
      | ((val: DailyDungeonsStats) => DailyDungeonsStats),
  ) => void;
};

export const DailyDungeonsContext = createContext<
  DailyDungeonsContextType | undefined
>(undefined);
