"use client";
import { useState, useContext } from "react";

import { BsListColumns } from "react-icons/bs";
import { MdCastle } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { MdLeaderboard } from "react-icons/md";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { HunterContext } from "../context/HunterContext";

function Sidebar() {
  const context = useContext(HunterContext);
  if (!context) return null;

  const { hunter } = context;

  const pathname = usePathname();
  const links = {
    Dungeon: <MdCastle />,
    Quests: <BsListColumns />,
    Leaderboard: <MdLeaderboard />,
    Profile: <ImProfile />,
  };

  let baseClass = `px-6 py-3 tracking-widest text-sm flex items-center gap-3 transition-colors`;
  let activeClass = `bg-surface-container-high border-l-4 border-tertiary text-tertiary`;
  let staticClass = `text-gray-400 hover:text-white`;

  return (
    <aside className="w-64 bg-surface-container-lowest border-surface-container-high flex flex-col justify-between py-6">
      <div>
        <div className="px-6 mb-8">
          <h2 className="font-bold tracking-widest text-primary text-4xl">
            {hunter.userName}
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {Object.entries(links).map(([key, value]) => {
            const path = `/${key.toLowerCase()}`;
            const isActive = pathname === path;

            return (
              <Link
                key={key}
                href={path}
                className={`${baseClass} ${isActive ? activeClass : staticClass}`}
              >
                <span>{value}</span> {key}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-6">
        <button className="w-full bg-primary text-background py-3 font-bold tracking-widest border border-primary-fixed hover:shadow-[0_0_15px_var(--color-tertiary)] transition-all duration-300">
          START RAID
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
