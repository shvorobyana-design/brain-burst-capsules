import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Trophy, Lock, Sparkles, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ACHIEVEMENTS, RARITY_META, Rarity, computeXP, levelFromXP } from "@/data/achievements";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { capsules } from "@/data/capsules";
import { Progress } from "@/components/ui/progress";

const rarities: (Rarity | "all")[] = ["all","common","rare","epic","legendary"];

const AchievementsPage = () => {
  const { lang, t } = useLanguage();
  const { progress, stats, unlocked, xp, levelInfo } = useProgress();
  const [filter, setFilter] = useState<Rarity | "all">("all");
  const [query, setQuery] = useState("");
  const [showLocked, setShowLocked] = useState(true);

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
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(({ a, isUnlocked, cur, pct }, i) => {
                  const meta = RARITY_META[a.rarity];
                  const hidden = a.secret && !isUnlocked;
                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.4) }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`group relative rounded-2xl p-[2px] transition-all ${
                        isUnlocked ? `bg-gradient-to-br ${meta.gradient} shadow-xl ${meta.glow}` : "bg-border"
                      }`}
                    >
                      <div className={`relative rounded-2xl bg-card p-4 h-full overflow-hidden ${!isUnlocked ? "opacity-90" : ""}`}>
                        {isUnlocked && a.rarity === "legendary" && (
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
                        )}
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 ${
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
                            <div className={`font-bold text-sm leading-tight ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                              {hidden ? "???" : a.title[lang]}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              {hidden ? STR.secret[lang] : a.desc[lang]}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-gradient-to-r ${meta.gradient} transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                          <div className="text-[11px] text-muted-foreground font-medium tabular-nums">
                            {hidden ? "?/?" : `${cur}/${a.target}`}
                          </div>
                          <div className="text-[11px] font-bold gradient-text">+{a.xp}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AchievementsPage;