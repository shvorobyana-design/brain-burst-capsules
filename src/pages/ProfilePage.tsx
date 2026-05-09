import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Trophy, BookOpen, Flame, Sparkles, Globe,
  User as UserIcon, ArrowRight, Camera, Check, Pencil, X, Loader2, Crown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { capsules } from "@/data/capsules";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENTS } from "@/data/achievements";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
    viewLeaderboard: "Таблиця лідерів",
    nextLevel: "До наступного рівня",
    edit: "Редагувати", save: "Зберегти", cancel: "Скасувати",
    nickname: "Нікнейм", changeAvatar: "Змінити аватарку",
    saved: "Збережено!", uploading: "Завантаження…",
    errUpload: "Не вдалося завантажити", tooBig: "Файл занадто великий (макс 2МБ)",
    nicknameMin: "Мінімум 2 символи",
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
    viewLeaderboard: "Leaderboard",
    nextLevel: "To next level",
    edit: "Edit", save: "Save", cancel: "Cancel",
    nickname: "Nickname", changeAvatar: "Change avatar",
    saved: "Saved!", uploading: "Uploading…",
    errUpload: "Upload failed", tooBig: "File too large (max 2MB)",
    nicknameMin: "Min 2 characters",
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

  const [editingNick, setEditingNick] = useState(false);
  const [nickValue, setNickValue] = useState("");
  const [nickSaving, setNickSaving] = useState(false);
  const [nickFlash, setNickFlash] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarFlash, setAvatarFlash] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    if (profile?.display_name) setNickValue(profile.display_name);
  }, [profile?.display_name]);

  const switchLang = (next: "ua" | "en") => {
    setLang(next);
    if (user) updateProfile({ language: next });
  };

  const handleSaveNick = async () => {
    const v = nickValue.trim();
    if (v.length < 2) { toast({ title: t.nicknameMin, variant: "destructive" as any }); return; }
    setNickSaving(true);
    await updateProfile({ display_name: v });
    setNickSaving(false);
    setEditingNick(false);
    setNickFlash(true);
    setTimeout(() => setNickFlash(false), 1500);
    toast({ title: t.saved });
  };

  const handleAvatarFile = async (file: File) => {
    if (!user) return;
    if (file.size > 2 * 1024 * 1024) { toast({ title: t.tooBig, variant: "destructive" as any }); return; }
    setAvatarUploading(true);
    try {
      const ext = file.name.split(".").pop() || "png";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      await updateProfile({ avatar_url: data.publicUrl });
      setAvatarFlash(true);
      setTimeout(() => setAvatarFlash(false), 1500);
      toast({ title: t.saved });
    } catch (e: any) {
      toast({ title: t.errUpload, description: e.message, variant: "destructive" as any });
    } finally {
      setAvatarUploading(false);
    }
  };

  const initial = (profile?.display_name || user?.email || "G")[0].toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-24 pb-24 md:pb-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header card */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-card to-secondary/15 p-5 sm:p-7 mb-5 shadow-xl">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <motion.div
                    animate={avatarFlash ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-2xl text-4xl font-bold ring-4 ${avatarFlash ? "ring-emerald-400" : "ring-primary/30"} transition-all`}
                  >
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                    ) : initial}
                  </motion.div>
                  {user && (
                    <button
                      onClick={() => fileRef.current?.click()}
                      disabled={avatarUploading}
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center shadow-lg ring-2 ring-card hover:scale-110 transition-transform disabled:opacity-50"
                      aria-label={t.changeAvatar}
                    >
                      {avatarUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleAvatarFile(f); e.target.value = ""; }}
                  />
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t.title}</div>
                  {/* Nickname editor */}
                  <AnimatePresence mode="wait">
                    {editingNick ? (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 mt-1"
                      >
                        <input
                          autoFocus
                          value={nickValue}
                          onChange={e => setNickValue(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") handleSaveNick(); if (e.key === "Escape") setEditingNick(false); }}
                          maxLength={32}
                          className="flex-1 min-w-0 h-10 px-3 rounded-xl bg-background/80 border-2 border-primary/40 text-base font-semibold outline-none focus:border-primary"
                        />
                        <button onClick={handleSaveNick} disabled={nickSaving}
                          className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors disabled:opacity-50 shrink-0">
                          {nickSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button onClick={() => { setEditingNick(false); setNickValue(profile?.display_name || ""); }}
                          className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 transition-colors shrink-0">
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="view"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 justify-center sm:justify-start mt-0.5"
                      >
                        <motion.div
                          animate={nickFlash ? { color: ["#10b981", "#10b981", "currentColor"] } : {}}
                          transition={{ duration: 1.5 }}
                          className="text-2xl sm:text-3xl font-bold truncate max-w-[200px] sm:max-w-none"
                        >
                          {profile?.display_name || user?.email?.split("@")[0] || t.guest}
                        </motion.div>
                        {user && (
                          <button onClick={() => { setNickValue(profile?.display_name || ""); setEditingNick(true); }}
                            className="w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
                            aria-label={t.edit}>
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="text-xs text-muted-foreground truncate mt-1">
                    {user ? `${t.signedInAs}: ${user.email}` : t.syncOff}
                  </div>
                </div>
              </div>

              <div className="relative mt-5 flex items-end gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{t.level}</div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text leading-none">{levelInfo.level}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span className="truncate">{lvlBadge[lang]}</span>
                    <span className="shrink-0">{xp} {t.xp}</span>
                  </div>
                  <Progress value={levelInfo.progress * 100} className="h-2.5" />
                  <div className="text-[10px] text-muted-foreground mt-1">{t.nextLevel}: {levelInfo.levelSpan - levelInfo.intoLevel} XP</div>
                </div>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              <StatCard icon={BookOpen} label={t.capsulesRead} value={`${progress.readCapsules.length}/${totalCapsules}`} color="from-blue-500/10 to-cyan-500/10" />
              <StatCard icon={Flame} label={t.streak} value={`${stats.bestStreak} ${t.days}`} color="from-orange-500/10 to-red-500/10" />
              <StatCard icon={Trophy} label={t.achievements} value={`${unlocked.length}/${ACHIEVEMENTS.length}`} color="from-amber-500/10 to-pink-500/10" />
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <Link to="/achievements"
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
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
              <Link to="/leaderboard"
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shrink-0">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">{t.viewLeaderboard}</div>
                    <div className="text-xs text-muted-foreground">{lang === "en" ? "Compete with others" : "Змагайся з іншими"}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

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

            <div className={`p-4 rounded-2xl border mb-5 text-sm ${user ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400" : "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400"}`}>
              <Sparkles className="w-4 h-4 inline mr-1.5" />
              {user ? t.syncOn : t.syncOff}
            </div>

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
    <div className={`rounded-2xl border border-border bg-gradient-to-br ${color} p-3 sm:p-4`}>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mb-1.5 sm:mb-2" />
      <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5 line-clamp-1">{label}</div>
      <div className="text-sm sm:text-lg md:text-xl font-bold">{value}</div>
    </div>
  );
}
