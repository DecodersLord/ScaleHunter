"use client";
import React, { useState, useMemo, useCallback } from "react";

import dummyLeaderboard from "./dummyLeaderboard.json";
import LeaderboardRow from "./components/LeaderboardRow";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";
import { GiKetchup } from "react-icons/gi";

type filteredLeaderboardType = {
  key: string;
  isAscending: boolean;
};
export default function LeaderboardPage() {
  const [filteredLeaderboard, setFilteredLeaderboard] =
    useState<filteredLeaderboardType>({
      key: "",
      isAscending: true,
    });

  const filteredLeaderboardData = useMemo(() => {
    if (filteredLeaderboard.key === "")
      return dummyLeaderboard.dummyLeaderboard;
    return [...dummyLeaderboard.dummyLeaderboard].sort((a, b) => {
      const valueA = a[filteredLeaderboard.key as keyof typeof a];
      const valueB = b[filteredLeaderboard.key as keyof typeof b];

      if (valueA < valueB) {
        return filteredLeaderboard.isAscending ? -1 : 1;
      }
      if (valueA > valueB) {
        return filteredLeaderboard.isAscending ? 1 : -1;
      }

      return 0;
    });
  }, [filteredLeaderboard, dummyLeaderboard]);

  const handleLeaderboardFilter = useCallback((type: string) => {
    console.log("here in filter ", type);
    setFilteredLeaderboard((prev) => {
      if (type === prev.key) {
        return { ...prev, isAscending: !prev.isAscending };
      }
      return { key: type, isAscending: true };
    });
  }, []);

  return (
    <div className="w-full max-w-7xl pt-8 pb-12 flex flex-col gap-8">
      {/* Header Section & Global Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-tertiary font-display text-xs tracking-widest uppercase">
              Global Rankings
            </span>
            <div className="h-px w-12 bg-outline-variant"></div>
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tighter text-white">
            THE HIERARCHY
          </h1>
          <p className="text-gray-400 mt-2">
            Compare your architectural superiority against other awakened
            Hunters.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full border border-outline-variant overflow-hidden bg-surface-container-low shadow-lg">
        {/* Scrollable container for mobile */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high border-outline-variant select-none">
                {/* Dynamically Sortable Columns (Add onClick handlers here!) */}
                <th
                  className="font-display text-xxs tracking-widest text-gray-500 uppercase px-6 py-4 w-16 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleLeaderboardFilter("leaderboardRank")}
                >
                  <div className="flex items-center gap-1">
                    Rank
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {filteredLeaderboard.key === "leaderboardRank" ? (
                        // If active, show Up or Down based on state
                        filteredLeaderboard.isAscending ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        // If not active, show default double arrows
                        <FaSort />
                      )}
                    </span>
                  </div>
                </th>
                <th className="font-display text-xxs tracking-widest text-gray-500 uppercase px-6 py-4">
                  Hunter
                </th>
                <th className="font-display text-xxs tracking-widest text-gray-500 uppercase px-6 py-4 cursor-pointer hover:text-white transition-colors group">
                  <div className="flex items-center gap-1">Class</div>
                </th>
                <th
                  className="font-display text-xxs tracking-widest text-gray-500 uppercase px-6 py-4 w-24 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleLeaderboardFilter("hunterRank")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Grade
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {filteredLeaderboard.key === "hunterRank" ? (
                        // If active, show Up or Down based on state
                        filteredLeaderboard.isAscending ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        // If not active, show default double arrows
                        <FaSort />
                      )}
                    </span>
                  </div>
                </th>
                <th
                  className="font-display text-xxs tracking-widest text-gray-500 uppercase px-6 py-4 w-32 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleLeaderboardFilter("level")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Level
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {filteredLeaderboard.key === "level" ? (
                        // If active, show Up or Down based on state
                        filteredLeaderboard.isAscending ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        // If not active, show default double arrows
                        <FaSort />
                      )}
                    </span>
                  </div>
                </th>
                <th
                  className="font-display text-xxs tracking-widest text-gray-500 uppercase px-6 py-4 w-40 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleLeaderboardFilter("xp")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Total XP
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {filteredLeaderboard.key === "xp" ? (
                        // If active, show Up or Down based on state
                        filteredLeaderboard.isAscending ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        // If not active, show default double arrows
                        <FaSort />
                      )}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboardData.map((entry) => (
                <LeaderboardRow
                  key={entry.leaderboardRank}
                  leaderboardRank={entry.leaderboardRank}
                  userName={entry.userName}
                  hunterClass={entry.hunterClass}
                  hunterRank={entry.hunterRank}
                  level={entry.level}
                  xp={entry.xp}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
