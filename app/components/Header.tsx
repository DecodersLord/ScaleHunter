"use client";
import React from "react";

import { useState, useContext, useEffect } from "react";
import { HunterContext } from "../context/HunterContext";
import { Facehash } from "facehash";

import Image from "next/image";

function Header() {
  const [apiHealth, setApiHealth] = useState("");
  const context = useContext(HunterContext);
  if (!context) return null;

  const { hunter } = context;

  useEffect(() => {
    async function apiHealthCheck() {
      let res = await fetch("http://localhost:5000/api/health");
      let healthCheck = await res.json();

      if (healthCheck.status !== undefined || healthCheck.status !== "") {
        setApiHealth(healthCheck.status);
      }
    }

    apiHealthCheck();

    return () => setApiHealth("");
  }, []);

  return (
    <header className="h-16 bg-surface-container-lowest border-surface-container-high flex justify-between items-center px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Scale Hunter Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="font-display text-2xl tracking-widest italic font-bold">
            SCALE HUNTER
          </h1>
          {apiHealth !== "" ? (
            <p className="text-6xl text-green-600">{apiHealth}</p>
          ) : (
            <p className="text-6xl text-red-600">"Error"</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right text-md">
          <div className="text-tertiary font-bold tracking-widest">
            {hunter.userName}
          </div>
          <div className="flex flex-row text-sm space-x-4">
            <div className="text-white font-bold">
              LVL <span className="text-primary-container">{hunter.level}</span>
            </div>
            <div className="text-white font-bold">
              Rank <span className="text-primary-container">{hunter.rank}</span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 bg-surface-container-high flex items-center justify-center">
          <Facehash name={hunter.userName} size={24} />
        </div>
      </div>
    </header>
  );
}

export default Header;
