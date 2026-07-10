import React, { createContext, useState, useContext } from 'react';
import { mockProgress } from '../utils/mockData';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(mockProgress);
  const [schedule, setSchedule] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const updateProgress = (newData) => {
    setProgress(prev => ({ ...prev, ...newData }));
  };

  const pauseLearning = () => setIsPaused(true);
  const resumeLearning = () => setIsPaused(false);

  return (
    <ProgressContext.Provider value={{
      progress,
      schedule,
      setSchedule,
      updateProgress,
      isPaused,
      pauseLearning,
      resumeLearning,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

// ✅ ADD THIS DEFAULT EXPORT
export default ProgressContext;