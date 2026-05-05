import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/capsules";
import { getFinalTest } from "@/data/finalTests";
import { useLanguage } from "@/contexts/LanguageContext";
// Імпортуємо твій оновлений хук
import { useProgress } from "@/hooks/useProgress";

const subjectGradient: Record<string, string> = {
  biology: "from-green-500 to-emerald-600",
  math: "from-blue-500 to-indigo-600",
  ukrainian: "from-yellow-500 to-amber-600",
  english: "from-red-500 to-rose-600",
  history: "from-orange-500 to-amber-700",
  chemistry: "from-purple-500 to-violet-600",
  physics: "from-cyan-500 to-blue-600",
};

const FinalTestPage = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t, translateCategory } = useLanguage();
  const { saveFinalTestResult } = useProgress(); // Підключаємо мізки
  
  const category = categories.find(c => c.id === id);
  const test = useMemo(() => (id ? getFinalTest(id, lang) : { questions: [] }), [id, lang]);

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.categoryNotFound}</h1>
          <Link to="/categories" className="text-primary underline">{t.toHome}</Link>
        </div>
      </div>
    );
  }

  const gradient = subjectGradient[category.id] || "from-primary to-secondary";
  const total = test.questions.length;
  const q = test.questions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    const isLastQuestion = current + 1 >= total;
    // Рахуємо фінальний результат, враховуючи поточну відповідь
    const finalScore = score; 

    if (isLastQuestion) {
      // ЗБЕРЕЖЕННЯ: Категорія вважається пройденою
      saveFinalTestResult(category.id, finalScore, total);
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  // Виправлена логіка прогресу: показуємо завершеність поточного етапу
  const progressPercent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className={`pt-24 pb-10 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <Link
            to={`/category/${category.id}`}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {translateCategory(category.id)}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl drop-shadow-lg">{category.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-7 h-7" /> {t.finalTestTitle}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {translateCategory(category.id)} · {total} {t.questions}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 pb-16">
        <div className="container mx-auto px-4 max-w-3xl -mt-6 relative z-10">
          {!started && !done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border shadow-md p-8 text-center"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-2">{t.finalTestStart}</h2>
              <p className="text-muted-foreground mb-6">{t.finalTestSubtitle}</p>
              <button
                onClick={() => setStarted(true)}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5`}
              >
                {t.finalTestStartCta}
              </button>
            </motion.div>
          )}

          {started && !done && q && (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl border border-border shadow-md p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground font-medium">
                  {t.finalTestQuestionLabel} {current + 1} {t.finalTestOf} {total}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t.finalTestProgress}: {progressPercent}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-muted mb-6 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-xs text-muted-foreground mb-2">
                {t.finalTestFromCapsule}{" "}
                <Link to={`/capsule/${q.capsuleId}`} className="text-primary hover:underline">
                  {q.capsuleTitle}
                </Link>
              </p>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-foreground">{q.question}</h3>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.answer;
                  const isSelected = i === selected;
                  let cls = "border-border hover:border-primary hover:bg-primary/5";
                  if (selected !== null) {
                    if (isCorrect) cls = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                    else if (isSelected) cls = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                    else cls = "border-border opacity-60";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between ${cls}`}
                    >
                      <span>{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle className="w-5 h-5 shrink-0" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                    selected === null
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : `bg-gradient-to-r ${gradient} text-white hover:-translate-y-0.5 shadow-md`
                  }`}
                >
                  {current + 1 >= total ? t.finalTestFinish : t.finalTestNext}
                </button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-2xl border border-border shadow-md p-8 text-center"
              >
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">{t.finalTestResultTitle}</h2>
                <div className={`text-5xl font-bold my-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {score} / {total}
                </div>
                <p className="text-muted-foreground mb-6">
                  {percentage >= 85 ? t.finalTestExcellent : percentage >= 60 ? t.finalTestGood : t.finalTestKeepLearning}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted hover:bg-muted/70 text-foreground font-medium transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> {t.finalTestRetake}
                  </button>
                  <Link
                    to={`/category/${category.id}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${gradient} text-white font-medium shadow-md hover:-translate-y-0.5 transition-all`}
                  >
                    {t.finalTestBackToSubject}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FinalTestPage;