"use client";
import React, { useEffect, useState, useRef } from "react";

import DailyQuotes from "@/app/components/DailyQuotes";
import QuestsCard from "./components/QuestsCard";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

import {
  DailyQuestsContext,
  DailyQuestStats,
  DailyQuests,
} from "@/app/context/DailyQuestContext";

import dummyQuests from "./dummyQuests.json";
import QuestsSkeleton from "./components/QuestsSkeleton";

export default function QuestsPage() {
  const [dailyQuestStats, setDailyQuestStats, isMounted] =
    useLocalStorage<DailyQuestStats>("dailyQuestStats", {
      totalXp: 0,
      earnedXp: 0,
      quests: [] as DailyQuests[],
    });

  useEffect(() => {
    function chooseRandomDailyQuests() {
      const today = new Date().toISOString().split("T")[0];
      const isNewDay = dailyQuestStats.lastUpdated !== today;

      if (!isNewDay && dailyQuestStats.quests.length > 0) return;

      const shuffled = [...dummyQuests.dummyQuests].sort(
        () => 0.5 - Math.random(),
      );
      const selected = shuffled.slice(0, 5);

      const formatted = selected.map((q) => ({
        quest: q,
        completed: false,
        processing: false,
      }));

      const totalXp = selected.reduce((sum, q) => sum + q.xp, 0);

      setDailyQuestStats({
        quests: formatted,
        totalXp: totalXp,
        earnedXp: 0,
      });
    }

    chooseRandomDailyQuests();
  }, [isMounted, setDailyQuestStats, dailyQuestStats.lastUpdated]);

  const dailyQuestsContextValue = {
    dailyQuestStats,
    setDailyQuestStats,
  };

  const progress =
    dailyQuestStats.totalXp === 0
      ? 0
      : (dailyQuestStats.earnedXp / dailyQuestStats.totalXp) * 100;

  const roundedProgress = Math.floor(progress);

  return (
    <>
      <DailyQuestsContext.Provider value={dailyQuestsContextValue}>
        <div className="w-full max-w-7xl pt-8 pb-12 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-secondary font-headline text-xs tracking-widest uppercase">
                Current Objective
              </span>
              <div className="h-px flex-1 bg-outline-variant"></div>
            </div>
            <h1 className="text-5xl font-display font-bold tracking-tighter mb-4 text-white">
              THE DAILY GRIND
            </h1>
            <div className="text-gray-400 mt-2 max-w-md">
              <DailyQuotes />
              <p className="mt-4">
                Complete all objectives to trigger the{" "}
                <span className="text-secondary font-bold">
                  Shadow Monarch's Blessing.
                </span>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-96 p-6 relative overflow-hidden border border-outline-variant bg-surface-container-high shadow-lg">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <span className="block text-xxs text-gray-500 uppercase tracking-widest">
                  Daily XP Bonus
                </span>
                <span className="text-2xl font-display font-bold text-primary tracking-tight">
                  {`${dailyQuestStats.earnedXp} / ${dailyQuestStats.totalXp} XP`}
                </span>
              </div>

              <span className="text-xs text-secondary font-display font-bold">
                {roundedProgress}% Complete
              </span>
            </div>

            <div
              className={`h-full transition-all duration-500 bg-gradient-to-r from-secondary to-on-secondary-container ${
                roundedProgress === 100
                  ? "shadow-[0_0_15px_var(--color-secondary)]"
                  : ""
              }`}
              style={{ width: `${roundedProgress}%` }}
            />

            <div className="mt-5 flex items-center gap-2">
              <span className="text-secondary text-sm">⚡</span>
              <span className="text-xxs text-gray-400 uppercase tracking-wider">
                {roundedProgress === 100
                  ? "All quests completed"
                  : "In progress"}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {!isMounted || dailyQuestStats.quests.length === 0
            ? Array(5)
                .fill(0)
                .map((_, i) => <QuestsSkeleton key={`quests-skeleton-${i}`} />)
            : dailyQuestStats.quests.map((quest) => (
                <QuestsCard
                  key={quest.quest.id}
                  id={quest.quest.id}
                  title={quest.quest.title}
                  description={quest.quest.description}
                  xp={quest.quest.xp}
                  type={quest.quest.type}
                />
              ))}
        </div>
      </DailyQuestsContext.Provider>
    </>
  );
}
