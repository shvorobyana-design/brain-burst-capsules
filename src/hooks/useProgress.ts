import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { ACHIEVEMENTS, AchStats, computeXP, evaluateAchievements, levelFromXP, ProgressData } from "@/data/achievements";
import { capsules } from "@/data/capsules";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type { ProgressData };

const STORAGE_KEY = "braincapsule-progress";
const STATS_KEY = "braincapsule-stats";
const ACH_KEY = "braincapsule-achievements";
const ACH_DATES_KEY = "braincapsule-ach-dates";
const SESSION_INIT_FLAG = "braincapsule-session-init-v1";

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
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

const defaultStats: AchStats = {
  streakDays: 0, bestStreak: 0,
  fastQuizzes: 0, perfectQuizzes: 0, perfectFinals: 0,
  wrongAnswers: 0, totalAnswers: 0,
  nightSessions: 0, daySessions: 0, weekendSessions: 0,
  capsulesOpenedToday: 0, totalSessions: 0, totalReadTimeMin: 0,
  retakes: 0, randomVisits: 0, searchesUsed: 0, aiQuestionsAsked: 0,
  languageSwitches: 0, finalTestsPassed: 0,
  capsulesPerSubject: {}, finalsPerfect: {},
  konami: false, clickedLogo: 0, visitedAt3am: false,
};
interface StatsState extends AchStats { lastDay?: string; todayDay?: string; }
function loadStats(): StatsState {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return { ...defaultStats, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultStats };
}
function saveStats(s: StatsState) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }
function loadUnlocked(): string[] {
  try { return JSON.parse(localStorage.getItem(ACH_KEY) || "[]"); } catch { return []; }
}
function saveUnlocked(a: string[]) { localStorage.setItem(ACH_KEY, JSON.stringify(a)); }
function loadDates(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(ACH_DATES_KEY) || "{}"); } catch { return {}; }
}
function saveDates(d: Record<string, string>) { localStorage.setItem(ACH_DATES_KEY, JSON.stringify(d)); }

export const achievementBus = new EventTarget();

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [stats, setStats] = useState<StatsState>(loadStats);
  const [unlocked, setUnlocked] = useState<string[]>(loadUnlocked);
  const [unlockDates, setUnlockDates] = useState<Record<string,string>>(loadDates);
  const { user } = useAuth();
  const [hydratedFromCloud, setHydratedFromCloud] = useState(false);
  // Track previous user id to detect logout/account change → clear local cache.
  const prevUserIdRef = useRef<string | null>(null);

  // Persist to localStorage. For logged-in users we wait for cloud hydration
  // so we don't clobber the cached state during the hydration race.
  useEffect(() => { if (!user || hydratedFromCloud) saveProgress(progress); }, [progress, user, hydratedFromCloud]);
  useEffect(() => { if (!user || hydratedFromCloud) saveStats(stats); }, [stats, user, hydratedFromCloud]);
  useEffect(() => { if (!user || hydratedFromCloud) saveUnlocked(unlocked); }, [unlocked, user, hydratedFromCloud]);
  useEffect(() => { if (!user || hydratedFromCloud) saveDates(unlockDates); }, [unlockDates, user, hydratedFromCloud]);

  // ===== Cloud hydration on sign-in (with auto-merge of guest progress) =====
  useEffect(() => {
    if (!user) {
      // Logged out → reset hydration flag; clear local data if we were logged in before.
      if (prevUserIdRef.current) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STATS_KEY);
        localStorage.removeItem(ACH_KEY);
        localStorage.removeItem(ACH_DATES_KEY);
        setProgress({ readCapsules: [], quizResults: {}, finalTests: {} });
        setStats({ ...defaultStats });
        setUnlocked([]);
        setUnlockDates({});
      }
      prevUserIdRef.current = null;
      setHydratedFromCloud(false);
      return;
    }
    // If the account changed, wipe local cache before hydrating the new account.
    if (prevUserIdRef.current && prevUserIdRef.current !== user.id) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STATS_KEY);
      localStorage.removeItem(ACH_KEY);
      localStorage.removeItem(ACH_DATES_KEY);
    }
    prevUserIdRef.current = user.id;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cancelled) return;
      const cloud = data as any;
      // Merge guest (local) with cloud — keep best of both
      const localProg = loadProgress();
      const localStats = loadStats();
      const localUnlocked = loadUnlocked();
      const mergedReadCapsules = Array.from(new Set([
        ...(cloud?.read_capsules || []),
        ...localProg.readCapsules,
      ]));
      const mergeBestScore = (a: any = {}, b: any = {}) => {
        const out: any = { ...a };
        for (const k of Object.keys(b)) {
          const av = a[k]; const bv = b[k];
          if (!av) out[k] = bv;
          else if ((bv?.score ?? 0) > (av?.score ?? 0)) out[k] = bv;
        }
        return out;
      };
      const mergedQuiz = mergeBestScore(cloud?.quiz_results || {}, localProg.quizResults);
      const mergedFinal = mergeBestScore(cloud?.final_tests || {}, localProg.finalTests);
      const cloudStats = (cloud?.stats || {}) as Partial<StatsState>;
      const mergedStats: StatsState = {
        ...defaultStats,
        ...cloudStats,
        ...localStats,
        // take maximums on counters
        bestStreak: Math.max(cloudStats.bestStreak || 0, localStats.bestStreak || 0),
        streakDays: Math.max(cloudStats.streakDays || 0, localStats.streakDays || 0),
        totalSessions: Math.max(cloudStats.totalSessions || 0, localStats.totalSessions || 0),
        totalReadTimeMin: Math.max(cloudStats.totalReadTimeMin || 0, localStats.totalReadTimeMin || 0),
        wrongAnswers: Math.max(cloudStats.wrongAnswers || 0, localStats.wrongAnswers || 0),
        totalAnswers: Math.max(cloudStats.totalAnswers || 0, localStats.totalAnswers || 0),
        fastQuizzes: Math.max(cloudStats.fastQuizzes || 0, localStats.fastQuizzes || 0),
        retakes: Math.max(cloudStats.retakes || 0, localStats.retakes || 0),
      };
      const mergedUnlocked = Array.from(new Set([
        ...(cloud?.unlocked_achievements || []),
        ...localUnlocked,
      ]));
      const cloudDates = (cloudStats as any).achievementDates || {};
      const localDates = loadDates();
      const mergedDates: Record<string,string> = { ...cloudDates, ...localDates };
      setProgress({ readCapsules: mergedReadCapsules, quizResults: mergedQuiz, finalTests: mergedFinal });
      setStats(mergedStats);
      setUnlocked(mergedUnlocked);
      setUnlockDates(mergedDates);
      setHydratedFromCloud(true);
    })();
    return () => { cancelled = true; };
  }, [user]);

  // ===== Debounced cloud save when authenticated =====
  useEffect(() => {
    if (!user || !hydratedFromCloud) return;
    const t = setTimeout(() => {
      supabase.from("user_progress").upsert({
        user_id: user.id,
        read_capsules: progress.readCapsules,
        quiz_results: progress.quizResults as any,
        final_tests: progress.finalTests as any,
        stats: { ...stats, achievementDates: unlockDates } as any,
        unlocked_achievements: unlocked,
      }, { onConflict: "user_id" }).then(() => { /* silent */ });
      // Also sync XP to profile so leaderboard works
      const xpNow = computeXP({ progress, totalCapsules: capsules.length, stats });
      supabase.from("profiles").update({ xp: xpNow }).eq("id", user.id).then(() => {});
    }, 800);
    return () => clearTimeout(t);
  }, [user, hydratedFromCloud, progress, stats, unlocked, unlockDates]);

  // Session + streak (run ONCE per browser session, not per useProgress() mount)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_INIT_FLAG)) return;
    sessionStorage.setItem(SESSION_INIT_FLAG, "1");
    const now = new Date();
    const today = now.toISOString().slice(0,10);
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    setStats(prev => {
      const next: StatsState = { ...prev };
      next.totalSessions = (prev.totalSessions||0) + 1;
      if (hour >= 22 || hour < 5) next.nightSessions = (prev.nightSessions||0) + 1;
      if (hour >= 5 && hour < 8) next.daySessions = (prev.daySessions||0) + 1;
      if (isWeekend) next.weekendSessions = (prev.weekendSessions||0) + 1;
      if (hour === 3) next.visitedAt3am = true;
      if (prev.todayDay !== today) { next.todayDay = today; next.capsulesOpenedToday = 0; }
      if (prev.lastDay !== today) {
        if (prev.lastDay) {
          const last = new Date(prev.lastDay + "T00:00:00").getTime();
          const t0 = new Date(today + "T00:00:00").getTime();
          const diff = Math.round((t0 - last) / 86400000);
          next.streakDays = diff === 1 ? (prev.streakDays||0) + 1 : 1;
        } else {
          next.streakDays = 1;
        }
        next.lastDay = today;
        next.bestStreak = Math.max(prev.bestStreak||0, next.streakDays);
      }
      return next;
    });
    const seq = ["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"];
    let i = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === seq[i]) { i++; if (i === seq.length) { setStats(s=>({...s, konami: true})); i=0; } }
      else i = 0;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ===== Derived stats — always consistent with progress =====
  const effectiveStats: AchStats = useMemo(() => {
    const perSubject: Record<string, number> = {};
    let readMin = 0;
    for (const id of progress.readCapsules) {
      const cap = capsules.find(c => c.id === id);
      if (!cap) continue;
      perSubject[cap.category] = (perSubject[cap.category] || 0) + 1;
      readMin += cap.readTime || 2;
    }
    const perfectQuizzes = Object.values(progress.quizResults).filter(r => r.score === r.total).length;
    const finalsPerfect: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(progress.finalTests)) {
      finalsPerfect[k] = v.score === v.total;
    }
    const perfectFinals = Object.values(finalsPerfect).filter(Boolean).length;
    const finalTestsPassed = Object.keys(progress.finalTests).length;
    return {
      ...stats,
      capsulesPerSubject: perSubject,
      totalReadTimeMin: Math.max(stats.totalReadTimeMin || 0, readMin),
      perfectQuizzes,
      perfectFinals,
      finalTestsPassed,
      finalsPerfect,
    };
  }, [progress, stats]);

  // Re-evaluate achievements
  useEffect(() => {
    const ctx = { progress, totalCapsules: capsules.length, stats: effectiveStats };
    const set = evaluateAchievements(ctx);
    const newOnes = [...set].filter(id => !unlocked.includes(id));
    if (newOnes.length) {
      setUnlocked(prev => [...prev, ...newOnes]);
      setUnlockDates(prev => {
        const out = { ...prev };
        const now = new Date().toISOString();
        newOnes.forEach(id => { if (!out[id]) out[id] = now; });
        return out;
      });
      newOnes.forEach(id => achievementBus.dispatchEvent(new CustomEvent("unlock", { detail: id })));
    }
  }, [effectiveStats, progress, unlocked]);

  const markRead = useCallback((capsuleId: string) => {
    let isNew = false;
    setProgress(prev => {
      if (prev.readCapsules.includes(capsuleId)) return prev;
      isNew = true;
      return { ...prev, readCapsules: [...prev.readCapsules, capsuleId] };
    });
    // Only bump the "today" counter when we actually added a new capsule.
    // Use a microtask so it runs after the setProgress updater (whose return value
    // is the source of truth for `isNew`).
    queueMicrotask(() => {
      if (isNew) {
        setStats(prev => ({ ...prev, capsulesOpenedToday: (prev.capsulesOpenedToday || 0) + 1 }));
      }
    });
  }, []);

  const saveQuizResult = useCallback((capsuleId: string, score: number, total: number, meta?: { durationSec?: number; wrongCount?: number; isRetake?: boolean }) => {
    // Detect retake from current state (read once, outside the setter).
    const wasTaken = !!progress.quizResults[capsuleId];
    const isRetake = meta?.isRetake ?? wasTaken;
    setProgress(prev => ({
      ...prev,
      quizResults: { ...prev.quizResults, [capsuleId]: { score, total, date: new Date().toISOString() } },
    }));
    setStats(prev => ({
      ...prev,
      retakes: prev.retakes + (isRetake ? 1 : 0),
      fastQuizzes: prev.fastQuizzes + ((meta?.durationSec ?? 999) < 30 ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (meta?.wrongCount ?? Math.max(0, total - score)),
      totalAnswers: prev.totalAnswers + total,
    }));
  }, [progress.quizResults]);

  const saveFinalTestResult = useCallback((categoryId: string, score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      finalTests: { ...prev.finalTests, [categoryId]: { score, total, date: new Date().toISOString() } },
    }));
    // perfectFinals / finalTestsPassed / finalsPerfect are now derived from progress.finalTests.
  }, []);

  const trackAi = useCallback(() => setStats(p => ({ ...p, aiQuestionsAsked: p.aiQuestionsAsked + 1 })), []);
  const trackSearch = useCallback(() => setStats(p => ({ ...p, searchesUsed: p.searchesUsed + 1 })), []);
  const trackRandom = useCallback(() => setStats(p => ({ ...p, randomVisits: p.randomVisits + 1 })), []);
  const trackLangSwitch = useCallback(() => setStats(p => ({ ...p, languageSwitches: p.languageSwitches + 1 })), []);
  const trackLogoClick = useCallback(() => setStats(p => ({ ...p, clickedLogo: p.clickedLogo + 1 })), []);

  const xp = computeXP({ progress, totalCapsules: capsules.length, stats: effectiveStats });
  const levelInfo = levelFromXP(xp);

  const getLevel = useCallback(() => {
    const lv = levelInfo.level;
    if (lv >= 25) return { ua: "Майстер", en: "Master" };
    if (lv >= 15) return { ua: "Експерт", en: "Expert" };
    if (lv >= 8) return { ua: "Досвідчений", en: "Experienced" };
    if (lv >= 3) return { ua: "Учень", en: "Student" };
    return { ua: "Новачок", en: "Beginner" };
  }, [levelInfo.level]);

  return {
    progress, stats: effectiveStats, unlocked, unlockDates,
    markRead, saveQuizResult, saveFinalTestResult,
    trackAi, trackSearch, trackRandom, trackLangSwitch, trackLogoClick,
    getLevel, xp, levelInfo,
    achievements: ACHIEVEMENTS,
  };
}