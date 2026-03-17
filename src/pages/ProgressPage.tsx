import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, Trophy } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import { capsules, categories, getLocalizedTitle, getLocalizedCategoryName } from "@/data/capsules";
import { Link } from "react-router-dom";

const ProgressPage = () => {
  const { completedCapsules, quizResults, totalCompleted, totalQuizzes } = useProgress();
  const { lang, t } = useLanguage();

  const level = totalCompleted >= 50 ? t.master : totalCompleted >= 20 ? t.expert : totalCompleted >= 5 ? t.learner : t.beginner;

  const stats = [
    { icon: BookOpen, label: t.capsulesRead, value: String(totalCompleted), gradient: "from-primary to-primary/60" },
    { icon: CheckCircle, label: t.quizzesPassed, value: String(totalQuizzes), gradient: "from-secondary to-secondary/60" },
    { icon: Trophy, label: t.knowledgeLevel, value: level, gradient: "from-accent to-accent/60" },
  ];

  const completedData = completedCapsules.map(id => capsules.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">{t.progressTitle}</h1>
          <div className="grid gap-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
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

          {completedData.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4 text-foreground">{t.capsulesRead}</h2>
              <div className="space-y-2">
                {completedData.map(c => {
                  if (!c) return null;
                  const cat = categories.find(ct => ct.id === c.category);
                  const qr = quizResults[c.id];
                  return (
                    <Link key={c.id} to={`/capsule/${c.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors">
                      <span className="text-xl">{c.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">{getLocalizedTitle(c, lang)}</div>
                        <div className="text-xs text-muted-foreground">{cat ? getLocalizedCategoryName(cat, lang) : ""}</div>
                      </div>
                      {qr && (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${qr.score >= qr.total * 0.7 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>
                          {qr.score}/{qr.total}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm mt-8">{t.startReadingPrompt}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressPage;
