import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, Trophy, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";
import { capsules } from "@/data/capsules";
import { capsuleTranslationsEn } from "@/data/capsules-en";
import { Progress } from "@/components/ui/progress";

const ProgressPage = () => {
  const { lang, t } = useLanguage();
  const { progress, getLevel } = useProgress();

  const level = getLevel();
  const levelLabel = lang === "en" ? level.en : level.ua;
  const readCount = progress.readCapsules.length;
  const testsCount = Object.keys(progress.quizResults).length;
  const totalCapsules = capsules.length;

  const avgScore = testsCount > 0
    ? Math.round(Object.values(progress.quizResults).reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / testsCount)
    : 0;

  const stats = [
    { icon: BookOpen, label: t.readCapsulesLabel, value: `${readCount}/${totalCapsules}`, gradient: "from-primary to-primary/60" },
    { icon: CheckCircle, label: t.testsPassed, value: String(testsCount), gradient: "from-secondary to-secondary/60" },
    { icon: Trophy, label: t.knowledgeLevel, value: levelLabel, gradient: "from-accent to-accent/60" },
  ];

  const recentQuizzes = Object.entries(progress.quizResults)
    .sort(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

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
          <h1 className="text-3xl font-bold mb-8">{t.yourProgress} <span className="gradient-text">{t.yourProgressHighlight}</span></h1>

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
              <span className="text-sm text-muted-foreground">{Math.round((readCount / totalCapsules) * 100)}%</span>
            </div>
            <Progress value={(readCount / totalCapsules) * 100} className="h-3" />
          </div>

          {/* Average quiz score */}
          {testsCount > 0 && (
            <div className="bg-card rounded-xl border border-border p-6 mb-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-accent" />
                <span className="font-semibold text-foreground">
                  {lang === "en" ? "Average quiz score" : "Середній бал тестів"}
                </span>
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{avgScore}%</div>
              <Progress value={avgScore} className="h-2" />
            </div>
          )}

          {/* Recent quiz results */}
          {recentQuizzes.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                {lang === "en" ? "Quiz results" : "Результати тестів"}
              </h2>
              <div className="space-y-3">
                {recentQuizzes.map(([capsuleId, result]) => {
                  const pct = Math.round((result.score / result.total) * 100);
                  return (
                    <Link
                      key={capsuleId}
                      to={`/capsule/${capsuleId}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-border/50 group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                        pct >= 80 ? "bg-accent/10 text-accent" : pct >= 50 ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {pct}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                          {getCapsuleTitle(capsuleId)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {result.score}/{result.total} • {new Date(result.date).toLocaleDateString()}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {readCount === 0 && (
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
