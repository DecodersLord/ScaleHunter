"use client";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { HunterContext } from "./HunterContext";

export function HunterProvider({ children }: { children: React.ReactNode }) {
  const [user, setHunter, isMounted] = useLocalStorage("hunter_profile", {
    userName: "Shadow Monarch",
    xp: 7000000,
    rank: "E",
    level: 25,
  });

  if (!isMounted) return null;

  const contextValue = {
    hunter: user,
    setHunter,
  };
  return (
    <HunterContext.Provider value={contextValue}>
      {children}
    </HunterContext.Provider>
  );
}
