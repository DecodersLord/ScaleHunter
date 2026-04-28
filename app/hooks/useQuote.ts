"use client";

import { useEffect, useState } from "react";

type dailyQuoteResponse = {
  content: string;
  author: string;
};
export function useQuote() {
  const [dailyQuote, setDailyQuote] = useState<dailyQuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchQuote() {
    try {
      let response = await fetch("http://api.quotable.io/random");
      let quoteResponse = await response.json();

      setDailyQuote(quoteResponse);
      setError(null);
    } catch (e) {
      setError("Failed to fetch quote.");
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return {
    dailyQuote: dailyQuote?.content,
    author: dailyQuote?.author,
    error: error,
    refetch: fetchQuote,
  };
}
