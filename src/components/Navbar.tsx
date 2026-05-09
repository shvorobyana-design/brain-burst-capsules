import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sparkles, Search, Globe, Trophy, BookOpen, BarChart3, Home,
  LogIn, User as UserIcon, Menu, X, Crown, LogOut,
} from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { trackLangSwitch, trackLogoClick, trackSearch } = useProgress();
  const { user, profile, updateProfile, signOut } = useAuth();
  const loc = useLocation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [loc.pathname]);

  const switchLang = () => {
    const next = lang === "ua" ? "en" : "ua";
    setLang(next);
    trackLangSwitch();
    if (user) updateProfile({ language: next });
  };

  const navItems = [
    { to: "/", icon: Home, label: t.home, color: "from-blue-400 to-cyan-500" },
    { to: "/categories", icon: BookOpen, label: t.categories, color: "from-violet-400 to-purple-500" },
    { to: "/progress", icon: BarChart3, label: t.progress, color: "from-emerald-400 to-teal-500" },
    { to: "/achievements", icon: Trophy, label: lang === "en" ? "Achievements" : "Досягнення", color: "from-amber-400 to-orange-500" },
    { to: "/leaderboard", icon: Crown, label: lang === "en" ? "Leaderboard" : "Лідери", color: "from-yellow-400 to-pink-500" },
    { to: "/profile", icon: UserIcon, label: lang === "en" ? "Account" : "Акаунт", color: "from-pink-400 to-rose-500" },
  ];

  const isActive = (path: string) => loc.pathname === path;

  return (
    <>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-3 sm:px-4 gap-2">
          <Link to="/" onClick={trackLogoClick} className="flex items-center gap-2 group shrink-0">
            <img
              src="https://img.icons8.com/external-flat-land-kalash/64/external-brain-business-concepts-flat-land-kalash.png"
              alt="BrainCapsule"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain hover:scale-105 transition-transform duration-200"
            />
            <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Brain<span className="gradient-text">Capsule</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">{t.home}</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">{t.categories}</Link>
            <Link to="/progress" className="hover:text-primary transition-colors">{t.progress}</Link>
            <Link to="/achievements" className="hover:text-primary transition-colors flex items-center gap-1">
              <Trophy className="w-4 h-4" />{lang === "en" ? "Achievements" : "Досягнення"}
            </Link>
            <Link to="/leaderboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <Crown className="w-4 h-4" />{lang === "en" ? "Leaderboard" : "Лідери"}
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => { setSearchOpen(true); trackSearch(); }}
              className="flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
              aria-label={t.search}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t.search}</span>
            </button>

            <button
              onClick={switchLang}
              className="hidden sm:flex items-center gap-1 px-2.5 py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
              title={lang === "ua" ? "Switch to English" : "Переключити на українську"}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">{lang === "ua" ? "EN" : "UA"}</span>
            </button>

            {user ? (
              <Link
                to="/profile"
                title={profile?.display_name || user.email || ""}
                className="hidden lg:flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground text-sm hover:from-primary/30 hover:to-secondary/30 transition-colors border border-primary/30"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
                <span className="truncate max-w-[80px] font-medium">{profile?.display_name || user.email?.split("@")[0]}</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="hidden lg:flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === "en" ? "Sign in" : "Увійти"}</span>
              </Link>
            )}

            <Link
              to="/random"
              className="hidden sm:flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.randomTopic}</span>
            </Link>

            {/* Hamburger — visible on mobile + tablet */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Menu"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X className="w-5 h-5" />
                      </motion.span>
                    ) : (
                      <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88vw] max-w-sm p-0 border-l border-white/10 bg-gradient-to-br from-background/95 via-card/95 to-background/95 backdrop-blur-2xl"
              >
                {/* glow blobs */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

                <div className="relative h-full flex flex-col p-5 pt-14 overflow-y-auto">
                  {/* Profile chip */}
                  <Link
                    to={user ? "/profile" : "/auth"}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/20 mb-4 hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        (profile?.display_name || user?.email || "G")[0].toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">
                        {user ? (profile?.display_name || user.email?.split("@")[0]) : (lang === "en" ? "Guest" : "Гість")}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {user ? (lang === "en" ? "View profile" : "Переглянути профіль") : (lang === "en" ? "Tap to sign in" : "Натисни щоб увійти")}
                      </div>
                    </div>
                  </Link>

                  {/* Nav items */}
                  <div className="space-y-1.5 mb-4">
                    {navItems.map((it, i) => {
                      const active = isActive(it.to);
                      const Icon = it.icon;
                      return (
                        <motion.div
                          key={it.to}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            to={it.to}
                            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all active:scale-[0.98] ${
                              active
                                ? "bg-gradient-to-r from-primary/15 to-secondary/15 border-primary/30 shadow-md"
                                : "border-transparent hover:bg-muted/50"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${it.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`flex-1 font-semibold ${active ? "text-foreground" : "text-foreground/80"}`}>{it.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Link to="/random"
                      className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold shadow-md">
                      <Sparkles className="w-4 h-4" />{t.randomTopic}
                    </Link>
                    <button onClick={switchLang}
                      className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-muted/60 border border-border text-sm font-semibold">
                      <Globe className="w-4 h-4" />{lang === "ua" ? "EN" : "UA"}
                    </button>
                  </div>

                  <div className="mt-auto">
                    {user ? (
                      <button
                        onClick={() => { signOut(); setMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-border bg-card hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors text-sm font-semibold"
                      >
                        <LogOut className="w-4 h-4" />{lang === "en" ? "Sign out" : "Вийти"}
                      </button>
                    ) : (
                      <Link to="/auth"
                        className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold shadow-md">
                        <LogIn className="w-4 h-4" />{lang === "en" ? "Sign in" : "Увійти"}
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
