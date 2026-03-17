import { useState, useEffect, useCallback } from "react";

interface ProgressData {
  completedCapsules: string[];
  quizResults: Record<string, { score: number; total: number; date: string }>;
}

const STORAGE_KEY = "braincapsule-progress";

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedCapsules: [], quizResults: {} };
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>(loadProgress);

  useEffect(() => { saveProgress(data); }, [data]);

  const markCompleted = useCallback((capsuleId: string) => {
    setData(prev => ({
      ...prev,
      completedCapsules: prev.completedCapsules.includes(capsuleId)
        ? prev.completedCapsules
        : [...prev.completedCapsules, capsuleId],
    }));
  }, []);

  const saveQuizResult = useCallback((capsuleId: string, score: number, total: number) => {
    setData(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [capsuleId]: { score, total, date: new Date().toISOString() },
      },
      completedCapsules: prev.completedCapsules.includes(capsuleId)
        ? prev.completedCapsules
        : [...prev.completedCapsules, capsuleId],
    }));
  }, []);

  const isCompleted = useCallback((capsuleId: string) => {
    return data.completedCapsules.includes(capsuleId);
  }, [data.completedCapsules]);

  const getQuizResult = useCallback((capsuleId: string) => {
    return data.quizResults[capsuleId] || null;
  }, [data.quizResults]);

  return {
    completedCapsules: data.completedCapsules,
    quizResults: data.quizResults,
    markCompleted,
    saveQuizResult,
    isCompleted,
    getQuizResult,
    totalCompleted: data.completedCapsules.length,
    totalQuizzes: Object.keys(data.quizResults).length,
  };
}
