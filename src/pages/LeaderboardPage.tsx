import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Crown, Trophy, Medal, Loader2, Sparkles, Star, ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { levelFromXP } from "@/data/achievements";
import { Link } from "react-router-dom";

interface LBEntry {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  xp: number;
}

const T = {
  ua: {
    title: "Таблиця лідерів",
    sub: "Топ найрозумніших мізків BrainCapsule 🧠",
    yourPlace: "Твоє місце",
    of: "з",
    level: "рів.",
    xp: "XP",
    you: "Ти",
    empty: "Поки що немає учасників. Будь першим! 🚀",
    refresh: "Оновити",
    signinHint: "Увійди, щоб з'явитися в рейтингу",
    refreshing: "Оновлення…",
    auto: "Авто-оновлення кожні 30с",
  },
  en: {
    title: "Leaderboard",
    sub: "Top smartest brains on BrainCapsule 🧠",
    yourPlace: "Your rank",
    of: "of",
    level: "lvl",
    xp: "XP",
    you: "You",
    empty: "No participants yet. Be the first! 🚀",
    refresh: "Refresh",
    signinHint: "Sign in to appear on the leaderboard",
    refreshing: "Refreshing…",
    auto: "Auto-refreshes every 30s",
  },
};

export default function LeaderboardPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const { user } = useAuth();
  const [entries, setEntries] = useState<LBEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url, xp")
      .order("xp", { ascending: false })
      .limit(100);
    setEntries((data as LBEntry[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const i = setInterval(load, 30000);
    return () => clearInterval(i);
  }, []);

  const meIdx = useMemo(() => user ? entries.findIndex(e => e.id === user.id) : -1, [entries, user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-24 md:pb-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold truncate">
                  <span className="gradient-text">{t.title}</span>
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{t.sub}</p>
              </div>
            </div>

            {/* Your rank */}
            {user && meIdx >= 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center gap-3">
                <Star className="w-5 h-5 text-primary shrink-0" />
                <div className="text-sm flex-1">
                  <span className="text-muted-foreground">{t.yourPlace}: </span>
                  <span className="font-bold text-lg">#{meIdx + 1}</span>
                  <span className="text-muted-foreground"> {t.of} {entries.length}</span>
                </div>
                <div className="text-sm font-semibold text-primary">{entries[meIdx].xp} {t.xp}</div>
              </motion.div>
            )}
            {!user && (
              <div className="mt-4 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span className="flex-1">{t.signinHint}</span>
                <Link to="/auth" className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors">
                  {lang === "en" ? "Sign in" : "Увійти"}
                </Link>
              </div>
            )}

            <div className="mt-4 mb-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{t.auto}</span>
              <button onClick={load} disabled={loading} className="flex items-center gap-1 hover:text-foreground transition-colors disabled:opacity-50">
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowUp className="w-3 h-3" />}
                {loading ? t.refreshing : t.refresh}
              </button>
            </div>

            {loading && entries.length === 0 ? (
              <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
            ) : entries.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">{t.empty}</div>
            ) : (
              <div className="space-y-2">
                {entries.map((e, i) => {
                  const lvl = levelFromXP(e.xp || 0).level;
                  const isMe = user?.id === e.id;
                  return <Row key={e.id} entry={e} idx={i} level={lvl} isMe={isMe} t={t} />;
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Row({ entry, idx, level, isMe, t }: { entry: LBEntry; idx: number; level: number; isMe: boolean; t: any }) {
  const rank = idx + 1;
  const isPodium = rank <= 3;
  const podiumStyles: Record<number, { bg: string; ring: string; medalColor: string; medal: any; glow: string }> = {
    1: { bg: "from-yellow-400/20 via-amber-400/15 to-orange-400/20", ring: "ring-yellow-400/60", medalColor: "from-yellow-400 to-amber-500", medal: Crown, glow: "shadow-yellow-500/40" },
    2: { bg: "from-slate-300/20 via-slate-200/15 to-slate-400/20", ring: "ring-slate-400/60", medalColor: "from-slate-300 to-slate-500", medal: Trophy, glow: "shadow-slate-500/40" },
    3: { bg: "from-orange-400/20 via-amber-300/15 to-yellow-500/20", ring: "ring-orange-500/60", medalColor: "from-orange-400 to-amber-600", medal: Medal, glow: "shadow-orange-500/40" },
  };
  const p = podiumStyles[rank];
  const initial = (entry.display_name || "?")[0].toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(idx * 0.03, 0.5) }}
      whileHover={{ scale: 1.015, x: 2 }}
      className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl border transition-all ${
        isPodium ? `bg-gradient-to-r ${p.bg} border-transparent ring-2 ${p.ring} shadow-lg ${p.glow}` :
        isMe ? "bg-primary/5 border-primary/30" : "bg-card border-border hover:border-primary/40"
      }`}
    >
      {/* Rank */}
      {(() => {
        if (!isPodium || !p) return <span className="w-10 sm:w-12 shrink-0 text-muted-foreground text-base font-bold text-center">#{rank}</span>;
        const MedalIcon = p.medal;
        return (
          <div className="w-10 sm:w-12 shrink-0 flex items-center justify-center">
            <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${p.medalColor} flex items-center justify-center text-white shadow-lg ${p.glow}`}>
              <MedalIcon className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-card text-foreground text-[10px] font-bold flex items-center justify-center border border-border">{rank}</span>
            </div>
          </div>
        );
      })()}

      {/* Avatar */}
      <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold shrink-0 ${
        isPodium ? `ring-2 ${p.ring}` : ""
      }`}>
        {entry.avatar_url ? <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" /> : initial}
      </div>

      {/* Name + level */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="font-semibold text-sm sm:text-base truncate">{entry.display_name || "Anonymous"}</div>
          {isMe && <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground font-bold">{t.you}</span>}
        </div>
        <div className="text-[11px] sm:text-xs text-muted-foreground">{t.level} {level}</div>
      </div>

      {/* XP */}
      <div className="text-right shrink-0">
        <div className={`text-base sm:text-lg font-bold tabular-nums ${isPodium ? "gradient-text" : ""}`}>{entry.xp || 0}</div>
        <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{t.xp}</div>
      </div>
    </motion.div>
  );
}
