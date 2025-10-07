import { useEffect, useState } from "react";

type Quote = {
  id: number;
  author: string;
  quote: string;
};

const STORAGE_KEY = "cachedQuote";
const REST_TIME_MS = 60 * 60 * 1000; // 1 hour in ms

const RandomQuote = () => {
  const [quote, setQuote] = useState<Quote>({
    id: 999,
    author: "Jeff Sickel",
    quote: "Deleted code is debugged code.",
  });

  // Helper: get cached quote
  const getCachedQuote = (): { data: Quote; timestamp: number } | null => {
    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  };

  // Helper: save quote to localStorage with timestamp
  const saveQuote = (data: Quote) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  };

  // Fetch from background (or API if standalone)
  const fetchQuote = () => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ action: "fetchQuote" }, (response) => {
        if (response.success) {
          setQuote(response.data);
          saveQuote(response.data); // store new quote
        } else {
          console.error("Error fetching quote:", response.error);
        }
      });
    } else {
      console.warn(
        "RQ: Chrome API not available — are you running outside extension?"
      );
    }
  };

  useEffect(() => {
    const cached = getCachedQuote();

    if (cached && Date.now() - cached.timestamp < REST_TIME_MS) {
      // ✅ Use cached quote if within 1hr
      setQuote(cached.data);
    } else {
      // ⏳ Expired or not found → fetch new one
      fetchQuote();
    }
  }, []);

  return (
    <p className="text-xl italic">
      "{quote?.quote}" - {quote?.author}
    </p>
  );
};

export default RandomQuote;
