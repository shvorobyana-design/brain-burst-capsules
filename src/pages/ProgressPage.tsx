import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, Trophy, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { capsules } from "@/data/capsules";
import { capsuleTranslationsEn } from "@/data/capsules-en";
import { Progress } from "@/components/ui/progress";

const ProgressPage = () => {
  const { lang, t } = useLanguage();

  // Локальний стан завершених капсул
  const [completedCapsules, setCompletedCapsules] = useState<string[]>([]);

  const markDone = (id: string) => {
    setCompletedCapsules(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const totalCapsules = capsules.length;
  const completedCount = completedCapsules.length;
  const progressPercent = (completedCount / totalCapsules) * 100;

  // Показ статистики (можна адаптувати під твої старі stats)
  const readCount = completedCount;
  const levelLabel = `${completedCount}/${totalCapsules}`;

  const stats = [
    { icon: BookOpen, label: t.readCapsulesLabel, value: `${readCount}/${totalCapsules}`, gradient: "from-primary to-primary/60" },
    { icon: Trophy, label: t.knowledgeLevel, value: levelLabel, gradient: "from-accent to-accent/60" },
  ];

  const getCapsuleTitle = (id: string) => {
    const c = capsules.find(cap => cap.id === id);
    if (!c) return id;
    if (lang === "en" && capsuleTranslationsEn[id]) return capsuleTranslationsEn[id].title;
    return c.title;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">
            {t.yourProgress} <span className="gradient-text">{t.yourProgressHighlight}</span>
          </h1>

          {/* Stats */}
          <div className="grid gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-md`}>
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                {lang === "en" ? "Overall progress" : "Загальний прогрес"}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-4" />
          </div>

          {/* Capsule buttons */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm grid grid-cols-2 gap-3">
            {capsules.map((cap) => (
              <button
                key={cap.id}
                onClick={() => markDone(cap.id)}
                disabled={completedCapsules.includes(cap.id)}
                className={`p-3 rounded-lg font-medium text-sm transition-colors ${
                  completedCapsules.includes(cap.id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-gray-200 text-foreground hover:bg-gray-300"
                }`}
              >
                {getCapsuleTitle(cap.id)}
              </button>
            ))}
          </div>

          {completedCount === 0 && (
            <p className="text-center text-muted-foreground text-sm mt-8">
              {t.startReadingProgress}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressPage;