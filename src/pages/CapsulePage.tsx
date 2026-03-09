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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Назад
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Header */}
            <div className="glass p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{capsule.icon}</span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{capsule.title}</h1>
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
              className="glass flex items-center gap-2 px-4 py-3 mb-6 text-sm font-medium hover:border-primary/50 transition-colors w-full"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              {showSimple ? "Показати звичайне пояснення" : "🧒 Поясни ще простіше"}
            </button>

            {/* Explanation */}
            <div className="glass p-6 md:p-8 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">{showSimple ? "Максимально просте пояснення" : "Пояснення для початківців"}</h2>
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6">
                {showSimple ? capsule.simpleExplanation : capsule.beginnerExplanation}
              </p>
              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold">Детальніше</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{capsule.detailedExplanation}</p>
              </div>
            </div>

            {/* Facts */}
            <div className="glass p-6 md:p-8 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold">Цікаві факти</h2>
              </div>
              <ul className="space-y-3">
                {capsule.facts.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-accent font-bold mt-0.5">#{i + 1}</span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz */}
            <div className="glass p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Міні-тест</h2>
              </div>
              {!quizStarted ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">{capsule.quiz.length} запитань для перевірки знань</p>
                  <button onClick={() => setQuizStarted(true)} className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                    Почати тест
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-4">
                  <div className="text-4xl font-bold gradient-text mb-2">{score}/{capsule.quiz.length}</div>
                  <p className="text-muted-foreground text-sm">
                    {score === capsule.quiz.length ? "Чудово! Ти все знаєш! 🎉" : "Непогано! Спробуй перечитати капсулу."}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-xs text-muted-foreground mb-3">Питання {currentQ + 1}/{capsule.quiz.length}</div>
                  <p className="font-medium mb-4">{capsule.quiz[currentQ].question}</p>
                  <div className="space-y-2 mb-4">
                    {capsule.quiz[currentQ].options.map((opt, i) => {
                      let cls = "glass px-4 py-3 text-sm text-left w-full transition-all";
                      if (answered !== null) {
                        if (i === capsule.quiz[currentQ].answer) cls += " border-accent/70 bg-accent/10";
                        else if (i === answered) cls += " border-destructive/70 bg-destructive/10";
                      } else {
                        cls += " hover:border-primary/50 cursor-pointer";
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
                    <button onClick={nextQuestion} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
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
