import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "braincapsule-progress";

export interface ProgressData {
  readCapsules: string[];
  // Результати квізів всередині капсул
  quizResults: Record<string, { score: number; total: number; date: string }>;
  // НОВЕ: Результати фінальних тестів по категоріях
  finalTests: Record<string, { score: number; total: number; date: string }>;
}

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      // Гарантуємо наявність нового поля при завантаженні
      return {
        readCapsules: data.readCapsules || [],
        quizResults: data.quizResults || {},
        finalTests: data.finalTests || {},
      };
    }
  } catch {}
  return { readCapsules: [], quizResults: {}, finalTests: {} };
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

  // НОВЕ: Метод для збереження фінального тесту
  const saveFinalTestResult = useCallback((categoryId: string, score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      finalTests: {
        ...prev.finalTests,
        [categoryId]: { score, total, date: new Date().toISOString() },
      },
    }));
  }, []);

  const getLevel = useCallback(() => {
    const read = progress.readCapsules.length;
    const tests = Object.keys(progress.quizResults).length;
    // Фінальний тест дає буст до досвіду
    const finals = Object.keys(progress.finalTests).length;
    const totalXP = read + tests + (finals * 5); 

    if (totalXP >= 50) return { ua: "Майстер", en: "Master" };
    if (totalXP >= 30) return { ua: "Експерт", en: "Expert" };
    if (totalXP >= 15) return { ua: "Досвідчений", en: "Experienced" };
    if (totalXP >= 5) return { ua: "Учень", en: "Student" };
    return { ua: "Новачок", en: "Beginner" };
  }, [progress]);

  return { progress, markRead, saveQuizResult, saveFinalTestResult, getLevel };
}