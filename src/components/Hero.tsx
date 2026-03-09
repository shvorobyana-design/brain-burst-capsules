import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, Clock, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { capsules } from "@/data/capsules";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof capsules>([]);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      setSuggestions(capsules.filter(c => c.title.toLowerCase().includes(value.toLowerCase())).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
            <Zap className="w-3.5 h-3.5 text-accent" />
            Ультрашвидке навчання нового покоління
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Вивчай будь-яку тему{" "}
            <span className="gradient-text">за 5 хвилин</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Капсули знань — короткі структуровані уроки, які пояснюють складні теми просто, зрозуміло та візуально.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <div className="glass neon-glow-purple flex items-center gap-3 px-5 py-4">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Шукай тему: фотосинтез, ДНК, чорні діри..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-20">
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { navigate(`/capsule/${s.id}`); setSuggestions([]); setQuery(""); }}
                    className="w-full text-left px-5 py-3 hover:bg-muted/50 transition-colors flex items-center gap-3"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.shortDescription}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <span>{capsules.length}+ капсул</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span>1-5 хвилин</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Безкоштовно</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
