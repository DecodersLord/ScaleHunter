"use client";

import { useEffect, useState } from "react";
import { useQuote } from "../hooks/useQuote";

export default function DailyQuotes() {
  const { dailyQuote, author, error, refetch } = useQuote();

  return (
    <>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : dailyQuote ? (
        <p>{dailyQuote}</p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
