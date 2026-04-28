"use client";

import { DailyQuestsContext } from "@/app/context/DailyQuestContext";
import React, { useContext } from "react";

import {
  GiLightningShield,
  GiShieldReflect,
  GiMeshNetwork,
  GiCrystalShine,
} from "react-icons/gi";

import { FaCircleCheck, FaArrowsRotate } from "react-icons/fa6";

type QuestsCardType = {
  id: string;
  title: string;
  type: string;
  description: string;
  xp: number;
};

const QuestIcons: Record<string, React.ReactNode> = {
  "Scalability Wisdom": <GiMeshNetwork className="text-secondary text-4xl" />,
  "Latency Wisdom": <GiLightningShield className="text-tertiary text-4xl" />,
  "Availability Wisdom": <GiShieldReflect className="text-primary text-4xl" />,
  "Consistency Wisdom": (
    <GiCrystalShine className="text-shadow-purple text-4xl" />
  ),
};

function QuestsCard({ id, title, type, description, xp }: QuestsCardType) {
  const dailyQuestsContext = useContext(DailyQuestsContext);
  if (!dailyQuestsContext) return null;

  const currentQuest = dailyQuestsContext.dailyQuestStats.quests.find(
    (q) => q.quest.id === id,
  );

  const isCompleted = currentQuest?.completed;
  const isProcessing = currentQuest?.processing;

  function handleQuestStatus(id: string) {
    if (!currentQuest || currentQuest.completed || currentQuest.processing)
      return;

    dailyQuestsContext?.setDailyQuestStats((prev) => {
      const updated = prev.quests.map((q) =>
        q.quest.id === id ? { ...q, processing: true } : q,
      );

      return { ...prev, quests: updated };
    });

    setTimeout(() => {
      dailyQuestsContext?.setDailyQuestStats((prev) => {
        const updated = prev.quests.map((q) =>
          q.quest.id === id ? { ...q, processing: false, completed: true } : q,
        );

        const earnedXp = updated.reduce(
          (sum, q) => (q.completed ? sum + q.quest.xp : sum),
          0,
        );

        return {
          ...prev,
          quests: updated,
          earnedXp,
        };
      });
    }, 60000);
  }

  return (
    <div className="group relative bg-surface-container-low p-1  hover:-translate-y-1 transition-all duration-300">
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>

      <div className="bg-surface p-6 h-full flex flex-col border border-outline-variant hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-surface-container-high border border-outline-variant flex items-center justify-center ">
            {QuestIcons[type]}
          </div>

          <span className="text-xxs font-display text-gray-400 bg-surface-bright border border-outline-variant px-3 py-1 uppercase tracking-widest">
            {type}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold mb-2 tracking-tight text-white group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mb-8 flex-1 leading-relaxed">
          {description}
        </p>

        {isCompleted ? (
          <div className="w-full flex items-center justify-center gap-3 py-3 bg-primary-container text-on-primary-container ">
            <span className="material-symbols-outlined text-xl">
              <FaCircleCheck />
            </span>
            <span className="font-headline text-xs font-bold uppercase tracking-widest">
              +{xp} XP Earned
            </span>
          </div>
        ) : isProcessing ? (
          <div className="w-full flex items-center justify-center gap-3 py-3 bg-yellow-500/20 text-yellow-400  animate-pulse">
            <span className="material-symbols-outlined text-xl">
              <FaArrowsRotate />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest">
              Processing...
            </span>
          </div>
        ) : (
          <button
            className="w-full flex items-center justify-between px-6 py-3 border border-outline-variant hover:border-primary bg-surface-container transition-colors group/btn"
            onClick={() => handleQuestStatus(id)}
          >
            <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
              ACCEPT QUEST
            </span>
            <span className="font-display text-xxs text-gray-400 tracking-widest">
              +{xp} XP
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestsCard;
