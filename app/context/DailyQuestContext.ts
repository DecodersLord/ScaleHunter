"use client";
import { createContext } from "react";

export type DailyQuestsType = {
  id: string;
  type: string;
  title: string;
  description: string;
  xp: number;
};

export type DailyQuests = {
  quest: DailyQuestsType;
  completed: boolean;
  processing: boolean;
};

export type DailyQuestStats = {
  quests: Array<DailyQuests>;
  totalXp: number;
  earnedXp: number;
  lastUpdated?: string;
};

export type DailyQuestsContextType = {
  dailyQuestStats: DailyQuestStats;
  setDailyQuestStats: (
    value: DailyQuestStats | ((val: DailyQuestStats) => DailyQuestStats),
  ) => void;
};

export const DailyQuestsContext = createContext<
  DailyQuestsContextType | undefined
>(undefined);
