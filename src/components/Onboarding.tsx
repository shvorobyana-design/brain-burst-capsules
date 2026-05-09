import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BookOpen, Trophy, Brain, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const KEY = "braincapsule-onboarded-v1";

const T = {
  ua: {
    skip: "Пропустити",
    next: "Далі",
    start: "Почати!",
    steps: [
      { icon: Brain, title: "Привіт! 👋", desc: "BrainCapsule — твоя бібліотека міні-уроків з 7 шкільних предметів. Вчись по 5 хвилин і запам'ятовуй назавжди." },
      { icon: BookOpen, title: "Капсули знань", desc: "Кожна капсула — теорія, приклади, факти, тест. Обирай тему або тисни «Випадкова»!" },
      { icon: Trophy, title: "Досягнення та XP", desc: "Виконуй тести, тримай серії, відкривай 60+ ачівок різної рідкості. Прогрес зберігається у твоєму акаунті." },
    ],
  },
  en: {
    skip: "Skip",
    next: "Next",
    start: "Let's go!",
    steps: [
      { icon: Brain, title: "Hi there! 👋", desc: "BrainCapsule is your library of micro-lessons across 7 school subjects. Learn in 5 minutes — remember forever." },
      { icon: BookOpen, title: "Knowledge capsules", desc: "Every capsule has theory, examples, facts and a quiz. Pick a topic or hit «Random»!" },
      { icon: Trophy, title: "Achievements & XP", desc: "Take quizzes, keep your streak, unlock 60+ badges of every rarity. Progress is saved to your account." },
    ],
  },
};

export default function Onboarding() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  const close = () => { localStorage.setItem(KEY, "1"); setOpen(false); };
  const next = () => { if (step < t.steps.length - 1) setStep(s => s + 1); else close(); };

  const Icon = t.steps[step].icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 22 }}
            className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8"
          >
            <button onClick={close} aria-label="close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
              <X className="w-4 h-4" />
            </button>

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/30 mb-4">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{t.steps[step].title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.steps[step].desc}</p>
            </motion.div>

            <div className="flex justify-center gap-1.5 mt-6">
              {t.steps.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-1.5 bg-border"}`} />
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6">
              <button onClick={close} className="flex-1 h-11 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                {t.skip}
              </button>
              <button onClick={next}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-md shadow-primary/30 flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                {step === t.steps.length - 1 ? t.start : t.next}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <Link to="/auth" onClick={close}
              className="block mt-3 text-center text-xs text-primary hover:underline">
              <Sparkles className="w-3 h-3 inline mr-1" />
              {lang === "en" ? "Sign in to sync across devices" : "Увійти, щоб синхронізувати між пристроями"}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}