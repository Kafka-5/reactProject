import { useEffect, useState } from "react";
import styles from "./MotivationalPannel.module.css";

// Mock API - simulate fetching a quote
function fetchQuote(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const quotes = [
        "Believe you can and you're halfway there.",
        "Success is not final; failure is not fatal.",
        "Small steps every day lead to big results.",
        "Dream big. Start small. Act now.",
        "Discipline beats motivation.",
        "You are stronger than you think.",
      ];
      const random = Math.floor(Math.random() * quotes.length);
      resolve(quotes[random]);
    }, 800); // simulate network delay
  });
}

export default function MotivationPanel() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoLoad, setAutoLoad] = useState(true);

  // Fetch a new quote
  const loadQuote = async () => {
    setLoading(true);
    const q = await fetchQuote();
    setQuote(q);
    setLoading(false);
  };

  // Fetch quote every 10 seconds (only if autoLoad is ON)
  useEffect(() => {
    if (!autoLoad) return;

    loadQuote(); // load immediately on switch ON

    const interval = setInterval(() => {
      loadQuote();
    }, 10000);

    return () => clearInterval(interval);
  }, [autoLoad]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Motivation</h2>

      {loading ? (
        <p className={styles.loading}>Loading quote…</p>
      ) : (
        <p className={styles.quote}>{quote}</p>
      )}

      <button className={styles.button} onClick={loadQuote}>
        Load New Quote
      </button>

      <div className={styles.switchRow}>
        <label>Auto-Load every 10s</label>
        <input
          type="checkbox"
          checked={autoLoad}
          onChange={(e) => setAutoLoad(e.target.checked)}
        />
      </div>
    </div>
  );
}
