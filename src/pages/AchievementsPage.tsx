import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, Lock, Sparkles, Filter, Download, Upload, Save, X, Calendar, Target, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ACHIEVEMENTS, RARITY_META, Rarity, Achievement } from "@/data/achievements";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { capsules } from "@/data/capsules";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const rarities: (Rarity | "all")[] = ["all","common","rare","epic","legendary"];

const AchievementsPage = () => {
  const { lang, t } = useLanguage();
  const { progress, stats, unlocked, xp, levelInfo, unlockDates } = useProgress();
  const [filter, setFilter] = useState<Rarity | "all">("all");
  const [query, setQuery] = useState("");
  const [showLocked, setShowLocked] = useState(true);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: localStorage.getItem("braincapsule-progress"),
      stats: localStorage.getItem("braincapsule-stats"),
      achievements: localStorage.getItem("braincapsule-achievements"),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `braincapsule-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    toast({ title: lang === "en" ? "Backup downloaded" : "Резервну копію збережено" });
  };
  const importData = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.progress) localStorage.setItem("braincapsule-progress", data.progress);
      if (data.stats) localStorage.setItem("braincapsule-stats", data.stats);
      if (data.achievements) localStorage.setItem("braincapsule-achievements", data.achievements);
      toast({ title: lang === "en" ? "Restored! Reloading…" : "Відновлено! Перезавантаження…" });
      setTimeout(() => window.location.reload(), 800);
    } catch {
      toast({ title: lang === "en" ? "Invalid backup file" : "Невірний файл резервної копії", variant: "destructive" as any });
    }
  };

  const ctx = { progress, totalCapsules: capsules.length, stats };

  const items = useMemo(() => {
    return ACHIEVEMENTS
      .filter(a => filter === "all" || a.rarity === filter)
      .map(a => {
        const isUnlocked = unlocked.includes(a.id);
        const cur = Math.min(a.target, a.progress(ctx));
        return { a, isUnlocked, cur, pct: Math.round((cur / a.target) * 100) };
      })
      .filter(x => showLocked || x.isUnlocked)
      .filter(x => {
        if (!query) return true;
        const q = query.toLowerCase();
        return x.a.title[lang].toLowerCase().includes(q) || x.a.desc[lang].toLowerCase().includes(q);
      })
      .sort((x,y) => Number(y.isUnlocked) - Number(x.isUnlocked) || y.pct - x.pct);
  }, [filter, query, showLocked, unlocked, ctx, lang]);

  const totalUnlocked = unlocked.length;
  const totalAch = ACHIEVEMENTS.length;
  const completionPct = Math.round((totalUnlocked / totalAch) * 100);

  const STR = {
    title: { ua: "Досягнення", en: "Achievements" },
    sub: { ua: "Збирай круті ачівки за навчання, серії і смішні моменти", en: "Collect cool badges for learning, streaks and silly moments" },
    completion: { ua: "Виконано", en: "Completion" },
    level: { ua: "Рівень", en: "Level" },
    xp: { ua: "XP", en: "XP" },
    placeholder: { ua: "Шукай ачівку...", en: "Search achievement..." },
    showLocked: { ua: "Показати закриті", en: "Show locked" },
    locked: { ua: "Закрито", en: "Locked" },
    unlocked: { ua: "Відкрито", en: "Unlocked" },
    secret: { ua: "Секретна ачівка", en: "Secret achievement" },
    nothing: { ua: "Нічого не знайдено", en: "Nothing found" },
    nextLevel: { ua: "До наступного рівня", en: "To next level" },
    autosave: { ua: "Прогрес зберігається автоматично", en: "Progress saved automatically" },
    export: { ua: "Експорт", en: "Export" },
    import: { ua: "Імпорт", en: "Import" },
    conditions: { ua: "Умови отримання", en: "How to unlock" },
    progressLabel: { ua: "Прогрес", en: "Progress" },
    receivedOn: { ua: "Отримано", en: "Unlocked on" },
    descUa: { ua: "Опис (UA)", en: "Description (UA)" },
    descEn: { ua: "Опис (EN)", en: "Description (EN)" },
    reward: { ua: "Нагорода", en: "Reward" },
    notUnlocked: { ua: "Ще не відкрито", en: "Not unlocked yet" },
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center sm:text-left">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-amber-500" />
              <h1 className="text-3xl md:text-4xl font-bold">
                {lang === "en" ? "Your " : "Твої "}<span className="gradient-text">{STR.title[lang]}</span>
              </h1>
            </div>
            <p className="text-muted-foreground mb-8">{STR.sub[lang]}</p>


            {/* Stats card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-5">
                <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">{STR.level[lang]}</div>
                <div className="flex items-end gap-2 mb-2">
                  <div className="text-4xl font-bold gradient-text">{levelInfo.level}</div>
                  <div className="text-xs text-muted-foreground mb-1.5">{xp} {STR.xp[lang]}</div>
                </div>
                <Progress value={levelInfo.progress * 100} className="h-2" />
                <div className="text-[11px] text-muted-foreground mt-1">{STR.nextLevel[lang]}: {levelInfo.levelSpan - levelInfo.intoLevel} XP</div>
              </div>
              <div className="rounded-2xl border border-border bg-gradient-to-br from-amber-500/5 to-pink-500/5 p-5">
                <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">{STR.completion[lang]}</div>
                <div className="text-4xl font-bold mb-2">{totalUnlocked}<span className="text-muted-foreground text-xl">/{totalAch}</span></div>
                <Progress value={completionPct} className="h-2" />
                <div className="text-[11px] text-muted-foreground mt-1">{completionPct}%</div>
              </div>
              <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 p-5 flex flex-col">
                <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-1">{lang === "en" ? "Best streak" : "Найкраща серія"}</div>
                <div className="text-4xl font-bold mb-2">🔥 {stats.bestStreak}</div>
                <div className="text-[11px] text-muted-foreground">{lang === "en" ? "days" : "днів"}</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={STR.placeholder[lang]}
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={() => setShowLocked(s => !s)}
                className={`h-10 px-3 rounded-xl border text-sm font-medium flex items-center gap-1.5 transition-colors ${showLocked ? "bg-card border-border text-foreground" : "bg-primary/10 border-primary/40 text-primary"}`}
              >
                <Filter className="w-4 h-4" /> {STR.showLocked[lang]}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {rarities.map(r => {
                const active = filter === r;
                const label = r === "all" ? (lang === "en" ? "All" : "Усі") : RARITY_META[r as Rarity][lang];
                return (
                  <button key={r} onClick={() => setFilter(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      active
                        ? r === "all" ? "bg-foreground text-background border-foreground" : `bg-gradient-to-r ${RARITY_META[r as Rarity].gradient} text-white border-transparent shadow-md`
                        : "bg-card border-border text-muted-foreground hover:text-foreground"
                    }`}>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            {items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">{STR.nothing[lang]} 😕</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-left">
                {items.map(({ a, isUnlocked, cur, pct }, i) => {
                  const meta = RARITY_META[a.rarity];
                  const hidden = a.secret && !isUnlocked;
                  return (
                    <motion.button
                      key={a.id}
                      onClick={() => setSelected(a)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.4) }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group relative rounded-2xl p-[2px] transition-all text-left ${
                        isUnlocked ? `bg-gradient-to-br ${meta.gradient} shadow-xl ${meta.glow}` : "bg-border"
                      }`}
                    >
                      <div className={`relative rounded-2xl bg-card p-3 sm:p-4 h-full overflow-hidden ${!isUnlocked ? "opacity-90" : ""}`}>
                        {isUnlocked && a.rarity === "legendary" && (
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                        )}
                        <div className="flex items-start gap-2.5 sm:gap-3 mb-3">
                          <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 ${
                            isUnlocked ? `bg-gradient-to-br ${meta.gradient} shadow-lg` : "bg-muted grayscale"
                          }`}>
                            {hidden ? "❓" : a.emoji}
                            {!isUnlocked && !hidden && (
                              <Lock className="absolute -bottom-1 -right-1 w-4 h-4 text-muted-foreground bg-card rounded-full p-0.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-[10px] uppercase tracking-wider font-bold mb-0.5 ${isUnlocked ? "text-foreground/70" : "text-muted-foreground"}`}>
                              {meta[lang]}{isUnlocked && " · ✓"}
                            </div>
                            <div className={`font-bold text-[13px] sm:text-sm leading-tight line-clamp-2 ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                              {hidden ? "???" : a.title[lang]}
                            </div>
                            <div className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 mt-0.5 hidden sm:block">
                              {hidden ? STR.secret[lang] : a.desc[lang]}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: Math.min(i * 0.02, 0.4) }}
                              className={`h-full rounded-full bg-gradient-to-r ${meta.gradient}`}
                            />
                          </div>
                          <div className="text-[11px] text-muted-foreground font-medium tabular-nums">
                            {hidden ? "?/?" : `${cur}/${a.target}`}
                          </div>
                          <div className="text-[11px] font-bold gradient-text">+{a.xp}</div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AchievementModal a={selected} onClose={() => setSelected(null)} ctx={ctx} unlocked={unlocked} unlockDates={unlockDates} lang={lang} STR={STR} />

      <Footer />
    </div>
  );
};

export default AchievementsPage;

function AchievementModal({ a, onClose, ctx, unlocked, unlockDates, lang, STR }: any) {
  if (!a) return null;
  const meta = RARITY_META[a.rarity as Rarity];
  const isUnlocked = unlocked.includes(a.id);
  const hidden = a.secret && !isUnlocked;
  const cur = Math.min(a.target, a.progress(ctx));
  const pct = Math.round((cur / a.target) * 100);
  const date = unlockDates?.[a.id];
  const dateStr = date ? new Date(date).toLocaleDateString(lang === "en" ? "en-US" : "uk-UA", { day: "numeric", month: "long", year: "numeric" }) : null;

  return (
    <Dialog open={!!a} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className={`relative rounded-3xl p-[3px] bg-gradient-to-br ${meta.gradient} shadow-2xl ${meta.glow}`}
        >
          <div className="relative rounded-3xl bg-card p-5 sm:p-7 max-h-[85vh] overflow-y-auto">
            <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10">
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mb-5">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 14, delay: 0.1 }}
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl mb-3 ${
                  isUnlocked ? `bg-gradient-to-br ${meta.gradient} shadow-xl ${meta.glow}` : "bg-muted grayscale"
                }`}
              >
                {hidden ? "❓" : a.emoji}
                {isUnlocked && a.rarity === "legendary" && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-pulse" />
                )}
              </motion.div>
              <div className={`text-[11px] uppercase tracking-wider font-bold mb-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r ${meta.gradient} text-white`}>
                {meta[lang]}{isUnlocked && " · ✓"}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">{hidden ? "???" : a.title[lang]}</h2>
              <div className="text-sm text-muted-foreground">{hidden ? STR.secret[lang] : a.desc[lang === "en" ? "ua" : "en"]}</div>
            </div>

            {/* Bilingual descriptions */}
            {!hidden && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <div className="rounded-xl bg-muted/40 border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">🇺🇦 UA</div>
                  <div className="text-sm">{a.desc.ua}</div>
                </div>
                <div className="rounded-xl bg-muted/40 border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">🇬🇧 EN</div>
                  <div className="text-sm">{a.desc.en}</div>
                </div>
              </div>
            )}

            {/* Conditions */}
            <div className="rounded-xl bg-muted/40 border border-border p-3 mb-3">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
                <Target className="w-3.5 h-3.5" /> {STR.conditions[lang]}
              </div>
              <div className="text-sm">
                {hidden ? STR.secret[lang] : (lang === "en" ? `Reach ${a.target} of "${a.title.en}".` : `Досягни ${a.target} для «${a.title.ua}».`)}
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-xl bg-muted/40 border border-border p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                  <Award className="w-3.5 h-3.5" /> {STR.progressLabel[lang]}
                </div>
                <div className="text-sm font-semibold tabular-nums">
                  {hidden ? "?/?" : `${cur} / ${a.target}`} <span className="text-muted-foreground">({pct}%)</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full rounded-full bg-gradient-to-r ${meta.gradient}`}
                />
              </div>
            </div>

            {/* Reward + date */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-3">
                <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-0.5">{STR.reward[lang]}</div>
                <div className="text-lg font-bold gradient-text">+{a.xp} XP</div>
              </div>
              <div className={`rounded-xl border p-3 ${isUnlocked ? "bg-emerald-500/10 border-emerald-500/30" : "bg-muted/40 border-border"}`}>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-0.5">
                  <Calendar className="w-3 h-3" /> {STR.receivedOn[lang]}
                </div>
                <div className={`text-sm font-semibold ${isUnlocked ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"}`}>
                  {isUnlocked ? (dateStr || "—") : STR.notUnlocked[lang]}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}