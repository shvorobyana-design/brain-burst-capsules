import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Search, Globe } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

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
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2 group">
<div className="flex items-center gap-2">
  <img 
    src="/logo.jpg" 
    alt="Brain Burst Logo" 
    className="w-10 h-10 object-contain hover:scale-105 transition-transform duration-200" 
  />
  <span className="font-bold text-2xl tracking-tighter">
    Brain<span className="text-primary">Burst</span>
  </span>
</div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Brain<span className="gradient-text">Capsule</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">{t.home}</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">{t.categories}</Link>
            <Link to="/progress" className="hover:text-primary transition-colors">{t.progress}</Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t.search}</span>
              <kbd className="hidden md:inline text-[10px] bg-background px-1.5 py-0.5 rounded border border-border ml-1">⌘K</kbd>
            </button>

            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === "ua" ? "en" : "ua")}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm hover:bg-muted transition-colors border border-border"
              title={lang === "ua" ? "Switch to English" : "Переключити на українську"}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase">{lang === "ua" ? "EN" : "UA"}</span>
            </button>

            <Link
              to="/random"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{t.randomTopic}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
