import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Trophy, BookOpen, Flame, Sparkles, Globe, User as UserIcon, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { capsules } from "@/data/capsules";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENTS } from "@/data/achievements";
import { useEffect } from "react";

const T = {
  ua: {
    title: "Профіль", guest: "Гість",
    signedInAs: "Увійшов як", level: "Рівень", xp: "XP",
    capsulesRead: "Прочитано капсул", streak: "Найкраща серія", days: "днів",
    achievements: "Досягнення", language: "Мова",
    signOut: "Вийти", signIn: "Увійти",
    syncOn: "Прогрес синхронізується між пристроями ☁️",
    syncOff: "Увійди, щоб зберегти прогрес назавжди",
    viewAch: "Переглянути всі досягнення",
    nextLevel: "До наступного рівня",
  },
  en: {
    title: "Profile", guest: "Guest",
    signedInAs: "Signed in as", level: "Level", xp: "XP",
    capsulesRead: "Capsules read", streak: "Best streak", days: "days",
    achievements: "Achievements", language: "Language",
    signOut: "Sign out", signIn: "Sign in",
    syncOn: "Progress is synced across devices ☁️",
    syncOff: "Sign in to save progress forever",
    viewAch: "View all achievements",
    nextLevel: "To next level",
  },
};

export default function ProfilePage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { lang, setLang } = useLanguage();
  const t = T[lang];
  const nav = useNavigate();
  const { progress, stats, unlocked, xp, levelInfo, getLevel } = useProgress();
  const totalCapsules = capsules.length;
  const completion = Math.round((unlocked.length / ACHIEVEMENTS.length) * 100);
  const lvlBadge = getLevel();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const switchLang = (next: "ua" | "en") => {
    setLang(next);
    if (user) updateProfile({ language: next });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-24 md:pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header card */}
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-5 sm:p-7 mb-5 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-lg text-2xl sm:text-3xl font-bold shrink-0">
                  {(profile?.display_name || user?.email || "G")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.title}</div>
                  <div className="text-xl sm:text-2xl font-bold truncate">
                    {profile?.display_name || user?.email?.split("@")[0] || t.guest}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user ? `${t.signedInAs}: ${user.email}` : t.syncOff}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{t.level}</div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text leading-none">{levelInfo.level}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>{lvlBadge[lang]}</span>
                    <span>{xp} {t.xp}</span>
                  </div>
                  <Progress value={levelInfo.progress * 100} className="h-2.5" />
                  <div className="text-[10px] text-muted-foreground mt-1">{t.nextLevel}: {levelInfo.levelSpan - levelInfo.intoLevel} XP</div>
                </div>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              <StatCard icon={BookOpen} label={t.capsulesRead} value={`${progress.readCapsules.length}/${totalCapsules}`} color="from-blue-500/10 to-cyan-500/10" />
              <StatCard icon={Flame} label={t.streak} value={`${stats.bestStreak} ${t.days}`} color="from-orange-500/10 to-red-500/10" />
              <StatCard icon={Trophy} label={t.achievements} value={`${unlocked.length}/${ACHIEVEMENTS.length}`} color="from-amber-500/10 to-pink-500/10" />
            </div>

            {/* Achievements link */}
            <Link to="/achievements"
              className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary transition-colors mb-5 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-white shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm">{t.viewAch}</div>
                  <div className="text-xs text-muted-foreground">{completion}% {lang === "en" ? "complete" : "виконано"}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Language */}
            <div className="p-4 rounded-2xl border border-border bg-card mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{t.language}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["ua","en"] as const).map(l => (
                  <button key={l} onClick={() => switchLang(l)}
                    className={`h-11 rounded-xl text-sm font-semibold border transition-all ${lang === l ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground border-transparent shadow-md" : "bg-muted/40 border-border text-muted-foreground hover:text-foreground"}`}>
                    {l === "ua" ? "🇺🇦 Українська" : "🇬🇧 English"}
                  </button>
                ))}
              </div>
            </div>

            {/* Sync status */}
            <div className={`p-4 rounded-2xl border mb-5 text-sm ${user ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400" : "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400"}`}>
              <Sparkles className="w-4 h-4 inline mr-1.5" />
              {user ? t.syncOn : t.syncOff}
            </div>

            {/* Auth action */}
            {user ? (
              <button onClick={() => { signOut(); nav("/"); }}
                className="w-full h-12 rounded-xl border border-border bg-card hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors font-semibold flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />{t.signOut}
              </button>
            ) : (
              <Link to="/auth"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-md shadow-primary/30">
                <UserIcon className="w-4 h-4" />{t.signIn}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-gradient-to-br ${color} p-4`}>
      <Icon className="w-5 h-5 text-muted-foreground mb-2" />
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">{label}</div>
      <div className="text-lg sm:text-xl font-bold">{value}</div>
    </div>
  );
}