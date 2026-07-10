// useStreak.js
// Drop into src/hooks/useStreak.js
// Tracks daily login/activity streak using localStorage.

import { useState, useEffect } from "react";

const STORAGE_KEY = "elevateher_streak";

function getTodayStr() {
  return new Date().toISOString().split("T")[0]; // "2026-07-10"
}

function daysBetween(d1, d2) {
  const a = new Date(d1);
  const b = new Date(d2);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [isNewToday, setIsNewToday] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = getTodayStr();

    if (!raw) {
      // first ever visit
      const data = { count: 1, lastDate: today };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setStreak(1);
      setIsNewToday(true);
      return;
    }

    const data = JSON.parse(raw);
    const gap = daysBetween(data.lastDate, today);

    if (gap === 0) {
      // already counted today
      setStreak(data.count);
      setIsNewToday(false);
    } else if (gap === 1) {
      // consecutive day - increment
      const newData = { count: data.count + 1, lastDate: today };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setStreak(newData.count);
      setIsNewToday(true);
    } else {
      // streak broken - reset
      const newData = { count: 1, lastDate: today };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setStreak(1);
      setIsNewToday(true);
    }
  }, []);

  return { streak, isNewToday };
}

// --- Example usage in Dashboard.jsx ---
// import { useStreak } from "../hooks/useStreak";
//
// function Dashboard() {
//   const { streak, isNewToday } = useStreak();
//   return (
//     <div className="streak-badge">
//       🔥 {streak} day{streak !== 1 ? "s" : ""} streak
//       {isNewToday && <span className="streak-new"> +1 today!</span>}
//     </div>
//   );
// }