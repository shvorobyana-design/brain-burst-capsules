import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { capsules, categories } from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const results = query.length > 1
    ? capsules.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    if (!open) setQuery("");
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, open]);

  const goTo = (id: string) => {
    navigate(`/capsule/${id}`);
    onClose();
  };

  const diffColor: Record<string, string> = {
    "базовий": "text-accent bg-accent/10",
    "середній": "text-secondary bg-secondary/10",
    "поглиблений": "text-primary bg-primary/10",
    "олімпіадний": "text-destructive bg-destructive/10",
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-foreground/20 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg mx-4 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
            />
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto">
            {query.length > 1 && results.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {t.nothingFound}
              </div>
            )}
            {results.map(r => {
              const cat = categories.find(c => c.id === r.category);
              return (
                <button
                  key={r.id}
                  onClick={() => goTo(r.id)}
                  className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors flex items-center gap-3 border-b border-border/50 last:border-0"
                >
                  <span className="text-xl shrink-0">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{r.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{cat?.name} • {r.shortDescription}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${diffColor[r.difficulty]}`}>
                      {r.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />{r.readTime}{t.min}
                    </span>
                  </div>
                </button>
              );
            })}
            {query.length <= 1 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {t.startTyping}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchDialog;
