import React from "react";
import { useContext, useState } from "react";
import { HunterContext } from "../../../context/HunterContext";

export default function RankProgressBar() {
  const context = useContext(HunterContext);
  if (!context) return null;

  const { hunter } = context;

  const [progress, setProgress] = useState((hunter.xp * 100) / 10000000);

  return (
    <div className="flex-1 min-w-2xl flex flex-col justify-between pt-4">
      {/* Level & XP Bar */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-white font-bold tracking-widest text-xl">
            LEVEL PROGRESSION
          </h3>
          <h2 className="text-6xl font-display font-bold italic text-white drop-shadow-lg">
            {`LVL ${hunter.level}`}
          </h2>
        </div>
        <div className="h-4 w-full bg-surface-container-high flex border-r-4 border-tertiary">
          {/* Change the width percentage via inline styles using your state! */}
          <div
            className="h-full bg-tertiary shadow-glow-primary"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono tracking-widest uppercase">
          <span>XP: {hunter.xp} / 10,000,000</span>
          <span className="text-tertiary font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
