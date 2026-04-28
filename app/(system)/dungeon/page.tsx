"use client";

import React, { useContext, useState, useEffect } from "react";

import DungeonCard from "./components/DungeonCard";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

import {
  DailyDungeonsContext,
  DailyDungeonsStats,
  DailyDungeons,
  DailyDungeonsType,
} from "@/app/context/DailyDungeonsContext";
import { HunterContext } from "@/app/context/HunterContext";

import dungeonData from "./dungeonData.json";
import DungeonSkeleton from "./components/DungeonSkeleton";

function page() {
  const context = useContext(HunterContext);
  if (!context) return null;

  const { hunter } = context;

  const [dailyDungeonsStats, setDailyDungeonsStats, isMounted] =
    useLocalStorage<DailyDungeonsStats>("dailyDungeonStats", {
      totalXp: 0,
      earnedXp: 0,
      dungeons: [] as DailyDungeons[],
    });

  useEffect(() => {
    function chooseRandomDailyDungeons() {
      const today = new Date().toISOString().split("T")[0];
      const isNewDay = dailyDungeonsStats.lastUpdated !== today;

      if (!isNewDay && dailyDungeonsStats.dungeons.length > 0) return;

      const shuffled = [...dungeonData]
        .filter((dungeonData) => hunter.rank === dungeonData.rank)
        .sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);

      const formatted = selected.map((d) => ({
        dungeon: d as DailyDungeonsType,
        completed: false,
        processing: false,
      }));

      const totalXp = selected.reduce((sum, d) => sum + d.xp, 0);

      setDailyDungeonsStats({
        dungeons: formatted,
        totalXp: totalXp,
        earnedXp: 0,
        lastUpdated: today,
      });
    }

    chooseRandomDailyDungeons();
  }, [isMounted, setDailyDungeonsStats, hunter, dailyDungeonsStats.lastUpdated]);

  const dailyDungeonsContextValue = {
    dailyDungeonsStats,
    setDailyDungeonsStats,
  };

  return (
    <>
      <DailyDungeonsContext.Provider value={dailyDungeonsContextValue}>
        <div className="w-full max-w-7xl pt-8 pb-12 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="mb-10">
              <h1 className="text-5xl font-black headline-font italic text-on-surface uppercase tracking-tighter mb-2">
                Available Dungeons
              </h1>
              <div className="h-1 w-24 bg-tertiary"></div>
            </div>
          </div>
          {!isMounted || dailyDungeonsStats.dungeons.length === 0
            ? Array(5)
                .fill(0)
                .map((_, i) => <DungeonSkeleton key={`skeleton-${i}`} />)
            : dailyDungeonsStats.dungeons.map((dungeon) => (
                <DungeonCard
                  key={dungeon.dungeon.id}
                  id={dungeon.dungeon.id}
                  title={dungeon.dungeon.title}
                  description={dungeon.dungeon.description}
                  xp={dungeon.dungeon.xp}
                  rank={dungeon.dungeon.rank}
                  status={dungeon.dungeon.status}
                  masteryQuadrant={dungeon.dungeon.masteryQuadrant}
                  targetArchitecture={dungeon.dungeon.targetArchitecture}
                />
              ))}
        </div>
      </DailyDungeonsContext.Provider>
    </>
  );
}

export default page;
