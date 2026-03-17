import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, Clock, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { capsules, getLocalizedTitle, getLocalizedDesc } from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof capsules>([]);
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const q = value.toLowerCase();
      setSuggestions(capsules.filter(c =>
        getLocalizedTitle(c, lang).toLowerCase().includes(q) ||
        getLocalizedDesc(c, lang).toLowerCase().includes(q)
      ).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      navigate(`/capsule/${suggestions[0].id}`);
      setSuggestions([]);
      setQuery("");
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] bg-accent/6 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {t.heroBadge}
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-foreground">
            {t.heroTitle1}{" "}<span className="gradient-text">{t.heroTitle2}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">{t.heroSubtitle}</p>
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative max-w-xl mx-auto">
            <div className="bg-card rounded-2xl border-2 border-primary/20 shadow-lg shadow-primary/5 flex items-center gap-3 px-5 py-4 transition-all focus-within:border-primary/40 focus-within:shadow-xl focus-within:shadow-primary/10">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input type="text" value={query} onChange={e => handleSearch(e.target.value)}
                placeholder={t.heroSearchPlaceholder}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
              {query.length > 0 && (
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
                  {t.search}
                </button>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-20">
                {suggestions.map(s => (
                  <button key={s.id} type="button"
                    onClick={() => { navigate(`/capsule/${s.id}`); setSuggestions([]); setQuery(""); }}
                    className="w-full text-left px-5 py-3 hover:bg-muted/50 transition-colors flex items-center gap-3">
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{getLocalizedTitle(s, lang)}</div>
                      <div className="text-xs text-muted-foreground">{getLocalizedDesc(s, lang)}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.form>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center justify-center gap-8 mt-12">
            {[
              { icon: Brain, label: `${capsules.length}+ ${t.capsuleCount}`, color: "text-primary", bg: "bg-primary/10" },
              { icon: Clock, label: t.minutes, color: "text-secondary", bg: "bg-secondary/10" },
              { icon: Zap, label: t.free, color: "text-accent", bg: "bg-accent/10" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
