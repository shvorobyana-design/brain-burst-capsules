import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BarChart3, Lightbulb, BookOpen, CheckCircle, XCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { capsules } from "@/data/capsules";

const CapsulePage = () => {
  const { id } = useParams();
  const capsule = capsules.find(c => c.id === id);
  const [showSimple, setShowSimple] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  if (!capsule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Капсулу не знайдено</h1>
          <Link to="/" className="text-primary underline">На головну</Link>
        </div>
      </div>
    );
  }

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === capsule.quiz[currentQ].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= capsule.quiz.length) {
      setQuizDone(true);
    } else {
      setCurrentQ(c => c + 1);
      setAnswered(null);
    }
  };

  const diffColor: Record<string, string> = {
    "базовий": "text-accent",
    "середній": "text-secondary",
    "поглиблений": "text-primary",
    "олімпіадний": "text-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Назад
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Header */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl">
                  {capsule.icon}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{capsule.title}</h1>
                  <p className="text-muted-foreground">{capsule.shortDescription}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {capsule.readTime} хв
                </div>
                <div className={`flex items-center gap-1.5 ${diffColor[capsule.difficulty]}`}>
                  <BarChart3 className="w-4 h-4" /> {capsule.difficulty}
                </div>
              </div>
            </div>

            {/* Simple toggle */}
            <button
              onClick={() => setShowSimple(!showSimple)}
              className="bg-card rounded-xl border border-border flex items-center gap-2 px-5 py-3.5 mb-6 text-sm font-medium hover:border-primary/40 hover:shadow-sm transition-all w-full"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              {showSimple ? "Показати звичайне пояснення" : "🧒 Поясни ще простіше"}
            </button>

            {/* Explanation */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{showSimple ? "Максимально просте пояснення" : "Пояснення для початківців"}</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">
                {showSimple ? capsule.simpleExplanation : capsule.beginnerExplanation}
              </p>
              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Детальніше</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{capsule.detailedExplanation}</p>
              </div>
            </div>

            {/* Facts */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Цікаві факти</h2>
              </div>
              <ul className="space-y-3">
                {capsule.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Міні-тест</h2>
              </div>
              {!quizStarted ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-5">{capsule.quiz.length} запитань для перевірки знань</p>
                  <button onClick={() => setQuizStarted(true)} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Почати тест
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-6">
                  <div className="text-5xl font-bold gradient-text mb-3">{score}/{capsule.quiz.length}</div>
                  <p className="text-muted-foreground text-sm">
                    {score === capsule.quiz.length ? "Чудово! Ти все знаєш! 🎉" : "Непогано! Спробуй перечитати капсулу."}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${((currentQ + 1) / capsule.quiz.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{currentQ + 1}/{capsule.quiz.length}</span>
                  </div>
                  <p className="font-medium mb-4 text-foreground">{capsule.quiz[currentQ].question}</p>
                  <div className="space-y-2 mb-4">
                    {capsule.quiz[currentQ].options.map((opt, i) => {
                      let cls = "bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-left w-full transition-all";
                      if (answered !== null) {
                        if (i === capsule.quiz[currentQ].answer) cls = "bg-accent/10 border border-accent/40 rounded-xl px-4 py-3 text-sm text-left w-full";
                        else if (i === answered) cls = "bg-destructive/10 border border-destructive/40 rounded-xl px-4 py-3 text-sm text-left w-full";
                      } else {
                        cls += " hover:border-primary/40 hover:bg-primary/5 cursor-pointer";
                      }
                      return (
                        <button key={i} onClick={() => handleAnswer(i)} className={cls}>
                          <span className="flex items-center gap-2">
                            {answered !== null && i === capsule.quiz[currentQ].answer && <CheckCircle className="w-4 h-4 text-accent" />}
                            {answered !== null && i === answered && i !== capsule.quiz[currentQ].answer && <XCircle className="w-4 h-4 text-destructive" />}
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {answered !== null && (
                    <button onClick={nextQuestion} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all">
                      {currentQ + 1 >= capsule.quiz.length ? "Результат" : "Далі"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CapsulePage;
