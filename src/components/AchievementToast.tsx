import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ACHIEVEMENTS, RARITY_META } from "@/data/achievements";
import { achievementBus } from "@/hooks/useProgress";
import { useLanguage } from "@/contexts/LanguageContext";

interface QueueItem { id: string; }

function playUnlockSound(legendary: boolean) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = legendary ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.25);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.12);
      o.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {}
}

const AchievementToast = () => {
  const { lang } = useLanguage();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const current = queue[0];

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      // skip on initial load: only show toasts after 1.5s grace
      if (Date.now() - mountTime < 1500) return;
      setQueue(q => [...q, { id }]);
    };
    const mountTime = Date.now();
    achievementBus.addEventListener("unlock", handler);
    return () => achievementBus.removeEventListener("unlock", handler);
  }, []);

  useEffect(() => {
    if (!current) return;
    const ach = ACHIEVEMENTS.find(a => a.id === current.id);
    if (!ach) { setQueue(q => q.slice(1)); return; }
    const isLegendary = ach.rarity === "legendary";
    playUnlockSound(isLegendary);
    if (isLegendary || ach.rarity === "epic") {
      confetti({ particleCount: isLegendary ? 220 : 120, spread: 90, origin: { y: 0.3 }, colors: ["#fbbf24","#ec4899","#8b5cf6","#06b6d4","#10b981"] });
      if (isLegendary) {
        setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { x: 0.2, y: 0.4 } }), 250);
        setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { x: 0.8, y: 0.4 } }), 450);
      }
    }
    const t = setTimeout(() => setQueue(q => q.slice(1)), 4200);
    return () => clearTimeout(t);
  }, [current]);

  const ach = current ? ACHIEVEMENTS.find(a => a.id === current.id) : null;

  return (
    <AnimatePresence>
      {ach && (
        <motion.div
          key={current!.id}
          initial={{ y: -120, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed top-[72px] sm:top-20 left-1/2 -translate-x-1/2 z-[100] w-[min(94vw,420px)] px-1"
        >
          <div className={`relative rounded-2xl p-[2px] bg-gradient-to-r ${RARITY_META[ach.rarity].gradient} shadow-2xl ${RARITY_META[ach.rarity].glow}`}>
            <div className="rounded-2xl bg-card p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-gradient-to-br ${RARITY_META[ach.rarity].gradient} flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}
              >
                {ach.emoji}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-muted-foreground truncate">
                  {lang === "en" ? "Achievement unlocked" : "Досягнення відкрито"} · {RARITY_META[ach.rarity][lang]}
                </div>
                <div className="font-bold text-foreground text-sm sm:text-base leading-tight line-clamp-2">
                  {ach.title[lang]}
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 mt-0.5">{ach.desc[lang]}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] sm:text-xs text-muted-foreground">+XP</div>
                <div className="font-bold gradient-text text-sm sm:text-base">{ach.xp}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;