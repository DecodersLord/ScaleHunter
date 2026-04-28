import React from "react";

import { DailyDungeonsType } from "../../../context/DailyDungeonsContext";

import {
  GiLightningShield,
  GiShieldReflect,
  GiMeshNetwork,
  GiCrystalShine,
} from "react-icons/gi";

const rankStyle: Record<string, string> = {
  S: `border-tertiary text-tertiary`,
  A: `border-secondary text-secondary`,
  B: `border-primary text-primary`,
  C: `border-primary text-primary`,
  D: `border-primary text-primary`,
  E: `border-primary text-primary`,
};

const DungeonMasteryIcons: Record<string, React.ReactNode> = {
  Scalability: <GiMeshNetwork className="text-secondary" />,
  Latency: <GiLightningShield className="text-tertiary " />,
  Availability: <GiShieldReflect className="text-primary " />,
  Consistency: <GiCrystalShine className="text-shadow-purple" />,
};

function DungeonCard({
  id,
  title,
  description,
  xp,
  rank,
  status,
  masteryQuadrant,
  targetArchitecture,
}: DailyDungeonsType) {
  return (
    <div
      className={`relative group overflow-hidden bg-surface-container-low p-6 flex items-center gap-6 border-l-4 ${rankStyle[rank]} hover:bg-surface-container transition-colors`}
    >
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <span className="text-9xl leading-none select-none">
          {DungeonMasteryIcons[masteryQuadrant]}
        </span>
      </div>
      <div
        className={`flex flex-col items-center justify-center min-w-20 h-20 bg-surface-bright border border-outline-variant tracking-widest ${rank === "S" ? `shadow-glow-secondary` : ``}`}
      >
        <span className="text-3xl font-black font-display">{rank}</span>
        <span className="text-xxs text-gray-500 uppercase font-bold tracking-widest">
          RANK
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          {targetArchitecture.map((architecture) => (
            <span
              className="text-xxs text-tertiary font-bold uppercase tracking-widest bg-tertiary/10 px-2 py-0.5"
              key={architecture}
            >
              {architecture}
            </span>
          ))}

          <span className="text-xxs text-secondary font-bold uppercase tracking-widest border border-secondary/30 px-2 py-0.5">
            {masteryQuadrant}
          </span>
        </div>
        <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-400 max-w-xl">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-4">
        <div className="text-right">
          <span className="block text-xxs text-gray-500 uppercase font-bold tracking-widest mb-1">
            REWARD
          </span>
          <span className="text-secondary font-black font-display">
            {`+${xp} xp`}
          </span>
        </div>
        <button className="bg-primary text-background px-6 py-2 font-display font-bold uppercase text-xs border border-primary-fixed hover:shadow-[0_0_15px_var(--color-tertiary)] transition-all duration-300">
          ENTER DUNGEON
        </button>
      </div>
    </div>
  );
}

export default DungeonCard;
