import React from "react";

type leaderBoardRowProp = {
  leaderboardRank: number;
  userName: string;
  hunterClass: string;
  hunterRank: string;
  level: number;
  xp: number;
};

function LeaderboardRow({
  leaderboardRank,
  userName,
  hunterClass,
  hunterRank,
  level,
  xp,
}: leaderBoardRowProp) {
  let sRankClass = `text-white group-hover:text-tertiary transition-colors`;
  let otherClass = `text-gray-500`;
  return (
    <>
      {/* TODO: Run your dummyLeaderboard.json Array.map() right here! */}
      {/* ROW 1: EXAMPLE S-RANK */}
      <tr className="group hover:bg-surface-container transition-colors border-outline-variant/30">
        {/* Leaderboard Position */}
        <td className="px-6 py-4">
          <span
            className={`font-display text-xl font-bold tracking-tighter ${hunterRank === "S" ? sRankClass : otherClass} `}
          >
            {leaderboardRank}
          </span>
        </td>

        {/* Hunter Profile */}
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="font-bold text-gray-300 tracking-wide group-hover:text-white transition-colors">
              {userName}
            </span>
          </div>
        </td>

        {/* Hunter Class */}
        <td className="px-6 py-4">
          <div className="inline-flex items-center bg-surface-bright border border-outline-variant px-3 py-1">
            <span className="font-display text-xxs text-gray-300 tracking-widest uppercase">
              {hunterClass}
            </span>
          </div>
        </td>

        {/* Hunter Rank (Grade Card) */}
        <td className="px-6 py-4 pt-5 text-center">
          <span
            className={`inline-block bg-tertiary/10 text-tertiary border font-display font-bold px-3 py-1 tracking-widest transform -skew-x-12 ${hunterRank === "S" ? `border-tertiary/50 shadow-glow-secondary` : `border-primary/50`}`}
          >
            <span className="block skew-x-12">{hunterRank}</span>
          </span>
        </td>

        {/* Hunter Level */}
        <td className="px-6 py-4 text-right">
          <span className="font-display font-bold text-gray-400 text-lg group-hover:text-white transition-colors">
            {level}
          </span>
        </td>

        {/* Hunter XP */}
        <td className="px-6 py-4 text-right">
          <span className="font-display text-gray-400 tracking-wider">
            {xp}
          </span>
        </td>
      </tr>
    </>
  );
}

export default LeaderboardRow;
