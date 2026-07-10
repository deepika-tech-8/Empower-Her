import React, { createContext, useState, useContext, useEffect } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [momentumScore, setMomentumScore] = useState(100); // 0 to 100
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseDate, setPauseDate] = useState(null);
  const [resumeTriggered, setResumeTriggered] = useState(false);
  const [helperPoints, setHelperPoints] = useState(25); // Peer points tracker
  const [readinessScores, setReadinessScores] = useState({
    formulas: 0.65,
    pivotTables: 0.40,
    dataCleaning: 0.35,
  });

  // Simple heuristic decay to avoid streak-shaming (called daily or on-app-open)
  const applyMomentumDecay = (daysMissed) => {
    if (isPaused || daysMissed <= 1) return;
    setMomentumScore((prev) => {
      const penalty = daysMissed * 2.5; // -2.5% per day
      const nextScore = prev - penalty;
      return Math.max(nextScore, 20); // capped decay at 20%
    });
  };

  const togglePauseMode = () => {
    if (isPaused) {
      setIsPaused(false);
      setPauseDate(null);
      setResumeTriggered(true); // Triggers Welcome Back recap screen
    } else {
      setIsPaused(true);
      setPauseDate(new Date().toISOString());
    }
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
      setMomentumScore((prev) => Math.min(prev + 5, 100)); // Boost momentum softly
    }
  };

  const awardHelperPoints = (points) => {
    setHelperPoints((prev) => prev + points);
  };

  return (
    <ProgressContext.Provider value={{
      momentumScore,
      completedLessons,
      isPaused,
      pauseDate,
      resumeTriggered,
      setResumeTriggered,
      helperPoints,
      readinessScores,
      setReadinessScores,
      togglePauseMode,
      completeLesson,
      awardHelperPoints,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);