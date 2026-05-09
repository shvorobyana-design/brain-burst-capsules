import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Search, Globe, Trophy, BookOpen, BarChart3, Home, LogIn, LogOut, User as UserIcon } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { trackLangSwitch, trackLogoClick, trackSearch } = useProgress();
  const { user, profile, signOut, updateProfile } = useAuth();

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

  return (
    <>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-3 sm:px-4 gap-2">
          <Link to="/" onClick={trackLogoClick} className="flex items-center gap-2 group shrink-0">
          <div className="flex items-center gap-2">
  <img 
    src="https://img.icons8.com/external-flat-land-kalash/64/external-brain-business-concepts-flat-land-kalash.png"
    alt="Brain Burst Logo" 
    className="w-9 h-9 sm:w-10 sm:h-10 object-contain hover:scale-105 transition-transform duration-200" 
  />
</div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Brain<span className="gradient-text">Capsule</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">{t.home}</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">{t.categories}</Link>
            <Link to="/progress" className="hover:text-primary transition-colors">{t.progress}</Link>
            <Link to="/achievements" className="hover:text-primary transition-colors flex items-center gap-1">
              <Trophy className="w-4 h-4" />{lang === "en" ? "Achievements" : "Досягнення"}
            </Link>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile quick links */}
            <Link
              to="/achievements"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-pink-500/20 text-amber-600 dark:text-amber-400 border border-amber-400/30 hover:scale-105 transition-transform"
              title={lang === "en" ? "Achievements" : "Досягнення"}
              aria-label={lang === "en" ? "Achievements" : "Досягнення"}
            >
              <Trophy className="w-4 h-4" />
            </Link>
            <button
              onClick={() => { setSearchOpen(true); trackSearch(); }}
              className="flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
              aria-label={t.search}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t.search}</span>
            </button>

            {/* Language switcher */}
            <button
              onClick={() => {
                const next = lang === "ua" ? "en" : "ua";
                setLang(next);
                trackLangSwitch();
                if (user) updateProfile({ language: next });
              }}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
              title={lang === "ua" ? "Switch to English" : "Переключити на українську"}
            >
              <Globe className="w-4 h-4 hidden sm:inline-block" />
              <span className="text-xs font-semibold uppercase">{lang === "ua" ? "EN" : "UA"}</span>
            </button>

            {user ? (
              <Link
                to="/profile"
                title={profile?.display_name || user.email || ""}
                className="flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground text-sm hover:from-primary/30 hover:to-secondary/30 transition-colors border border-primary/30"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden md:inline truncate max-w-[80px] font-medium">{profile?.display_name || user.email?.split("@")[0]}</span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
                aria-label={lang === "en" ? "Sign in" : "Увійти"}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === "en" ? "Sign in" : "Увійти"}</span>
              </Link>
            )}

            <Link
              to="/random"
              className="flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              aria-label={t.randomTopic}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{t.randomTopic}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border shadow-lg pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4 h-14">
          <Link to="/" className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t.home}</span>
          </Link>
          <Link to="/categories" className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium truncate max-w-[70px]">{t.categories}</span>
          </Link>
          <Link to="/achievements" className="flex flex-col items-center justify-center gap-0.5 text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors active:scale-95">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-medium">{lang === "en" ? "Badges" : "Ачівки"}</span>
          </Link>
          <Link to="/progress" className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors active:scale-95">
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t.progress}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
