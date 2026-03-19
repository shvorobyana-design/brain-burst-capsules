import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "braincapsule-progress";

export interface ProgressData {
  readCapsules: string[];
  quizResults: Record<string, { score: number; total: number; date: string }>;
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { readCapsules: [], quizResults: {} };
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markRead = useCallback((capsuleId: string) => {
    setProgress(prev => {
      if (prev.readCapsules.includes(capsuleId)) return prev;
      return { ...prev, readCapsules: [...prev.readCapsules, capsuleId] };
    });
  }, []);

  const saveQuizResult = useCallback((capsuleId: string, score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [capsuleId]: { score, total, date: new Date().toISOString() },
      },
    }));
  }, []);

  const getLevel = useCallback(() => {
    const read = progress.readCapsules.length;
    const tests = Object.keys(progress.quizResults).length;
    const total = read + tests;
    if (total >= 30) return { ua: "Майстер", en: "Master" };
    if (total >= 20) return { ua: "Експерт", en: "Expert" };
    if (total >= 10) return { ua: "Досвідчений", en: "Experienced" };
    if (total >= 5) return { ua: "Учень", en: "Student" };
    return { ua: "Новачок", en: "Beginner" };
  }, [progress]);

  return { progress, markRead, saveQuizResult, getLevel };
}
