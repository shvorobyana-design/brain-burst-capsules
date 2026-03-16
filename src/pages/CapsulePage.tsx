import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, BarChart3, Lightbulb, BookOpen, CheckCircle, XCircle,
  Sparkles, BookMarked, FlaskConical, PenTool, Image, Zap, List, Brain, ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";
import { capsules, categories } from "@/data/capsules";

const CapsulePage = () => {
  const { id } = useParams();
  const capsule = capsules.find(c => c.id === id);
  const [showSimple, setShowSimple] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  const category = capsule ? categories.find(c => c.id === capsule.category) : null;

  const relatedCapsules = useMemo(() => {
    if (!capsule) return [];
    const sameCat = capsules.filter(c => c.category === capsule.category && c.id !== capsule.id);
    const sameSection = sameCat.filter(c => c.section === capsule.section);
    if (sameSection.length > 0) return sameSection.slice(0, 3);
    return sameCat.slice(0, 3);
  }, [capsule]);

  const heroImageUrl = useMemo(() => {
    if (!capsule) return "";
    const subjectImages: Record<string, string> = {
      biology: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=400&fit=crop",
      math: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      ukrainian: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop",
      english: "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
      history: "https://images.unsplash.com/photo-1461360370896-922624d12ebb?w=800&h=400&fit=crop",
      chemistry: "https://images.unsplash.com/photo-1532187863486-abf4dbce1253?w=800&h=400&fit=crop",
      physics: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
    };
    return subjectImages[capsule.category] || subjectImages.biology;
  }, [capsule]);

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
    "базовий": "text-accent bg-accent/10",
    "середній": "text-secondary bg-secondary/10",
    "поглиблений": "text-primary bg-primary/10",
    "олімпіадний": "text-destructive bg-destructive/10",
  };

  const sections = [
    { id: "intro", label: "Вступ", icon: BookOpen, show: true },
    { id: "theory", label: "Теорія", icon: Brain, show: !!capsule.theory },
    { id: "simple", label: "Просто", icon: Sparkles, show: true },
    { id: "terms", label: "Терміни", icon: BookMarked, show: capsule.keyTerms.length > 0 },
    { id: "formulas", label: "Формули", icon: FlaskConical, show: capsule.formulas.length > 0 },
    { id: "examples", label: "Приклади", icon: PenTool, show: capsule.examples.length > 0 || capsule.problemSolving.length > 0 },
    { id: "images", label: "Ілюстрації", icon: Image, show: capsule.images.length > 0 },
    { id: "facts", label: "Факти", icon: Lightbulb, show: true },
    { id: "quiz", label: "Тест", icon: CheckCircle, show: true },
  ].filter(s => s.show);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to={category ? `/category/${category.id}` : "/"}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {category ? category.name : "Назад"}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-6 border border-border shadow-sm">
              <img
                src={heroImageUrl}
                alt={capsule.title}
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>

            {/* Header */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl shrink-0">
                  {capsule.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{capsule.title}</h1>
                  <p className="text-muted-foreground">{capsule.shortDescription}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" /> {capsule.readTime} хв
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${diffColor[capsule.difficulty]}`}>
                  <BarChart3 className="w-3.5 h-3.5" /> {capsule.difficulty}
                </div>
                {capsule.quiz.length > 0 && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle className="w-4 h-4" /> {capsule.quiz.length} запитань
                  </div>
                )}
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-5 md:p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">⚡ За 60 секунд</h2>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">{capsule.quickSummary}</p>
            </div>

            {/* Section Navigation */}
            <div className="bg-card rounded-xl border border-border p-2 mb-6 flex flex-wrap gap-1 sticky top-20 z-10 shadow-sm">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === s.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <s.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Introduction */}
            <section id="section-intro" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={BookOpen} title="Вступ" color="primary" />
              <p className="text-foreground/80 leading-relaxed text-[15px]">{capsule.introduction}</p>
            </section>

            {/* Theory */}
            {capsule.theory && (
              <section id="section-theory" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={Brain} title="Основна теорія" color="secondary" />
                <div className="prose-custom text-foreground/80 text-[15px] leading-relaxed whitespace-pre-line">
                  {capsule.theory}
                </div>
              </section>
            )}

            {/* Simple Explanation */}
            <section id="section-simple" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={Sparkles} title="Пояснення простими словами" color="accent" />
              <button
                onClick={() => setShowSimple(!showSimple)}
                className="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-xl bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {showSimple ? "Показати звичайне пояснення" : "🧒 Поясни ще простіше"}
              </button>
              <p className="text-foreground/80 leading-relaxed text-[15px]">
                {showSimple ? capsule.simpleExplanation : capsule.beginnerExplanation}
              </p>
              {!showSimple && (
                <div className="border-t border-border mt-6 pt-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-secondary" /> Детальніше
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{capsule.detailedExplanation}</p>
                </div>
              )}
            </section>

            {/* Key Terms */}
            {capsule.keyTerms.length > 0 && (
              <section id="section-terms" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={BookMarked} title="Ключові терміни" color="primary" />
                <div className="space-y-3">
                  {capsule.keyTerms.map((kt, i) => (
                    <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
                      <dt className="font-semibold text-foreground text-sm mb-1">{kt.term}</dt>
                      <dd className="text-muted-foreground text-sm">{kt.definition}</dd>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Formulas */}
            {capsule.formulas.length > 0 && (
              <section id="section-formulas" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={FlaskConical} title="Формули та правила" color="secondary" />
                <div className="space-y-2">
                  {capsule.formulas.map((f, i) => (
                    <div key={i} className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl px-4 py-3 border border-primary/10 font-mono text-sm text-foreground">
                      {f}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Examples & Problem Solving */}
            {(capsule.examples.length > 0 || capsule.problemSolving.length > 0) && (
              <section id="section-examples" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={PenTool} title="Приклади та задачі" color="accent" />
                {capsule.examples.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground text-sm mb-3">📝 Приклади:</h3>
                    <ul className="space-y-2">
                      {capsule.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-foreground/80">{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {capsule.problemSolving.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-3">🧮 Розв'язування задач:</h3>
                    <div className="space-y-4">
                      {capsule.problemSolving.map((ps, i) => (
                        <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
                          <p className="font-medium text-foreground text-sm mb-2">❓ {ps.problem}</p>
                          <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
                            <p className="text-sm text-foreground/80 whitespace-pre-line">✅ {ps.solution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Images */}
            {capsule.images.length > 0 && (
              <section id="section-images" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={Image} title="Ілюстрації" color="primary" />
                <div className="grid gap-4">
                  {capsule.images.map((img, i) => (
                    <figure key={i} className="rounded-xl overflow-hidden border border-border">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-48 md:h-64 object-cover"
                        loading="lazy"
                      />
                      <figcaption className="px-4 py-2.5 bg-muted/30 text-xs text-muted-foreground">{img.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* Facts */}
            <section id="section-facts" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={Lightbulb} title="Цікаві факти" color="accent" />
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
            </section>

            {/* Quiz */}
            <section id="section-quiz" className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <SectionHeader icon={CheckCircle} title="Міні-тест" color="primary" />
              {!quizStarted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <List className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{capsule.quiz.length} запитань для перевірки знань</p>
                  <p className="text-xs text-muted-foreground mb-6">Перевір, чи засвоїв матеріал</p>
                  <button onClick={() => setQuizStarted(true)} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Почати тест
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-8">
                  <div className="text-5xl font-bold gradient-text mb-3">{score}/{capsule.quiz.length}</div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {score === capsule.quiz.length ? "Чудово! Ти все знаєш! 🎉" :
                     score >= capsule.quiz.length * 0.7 ? "Гарний результат! 👍" :
                     "Спробуй перечитати капсулу та пройти тест ще раз."}
                  </p>
                  <button
                    onClick={() => { setQuizDone(false); setQuizStarted(false); setCurrentQ(0); setScore(0); setAnswered(null); }}
                    className="px-6 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-all"
                  >
                    Пройти ще раз
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${((currentQ + 1) / capsule.quiz.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{currentQ + 1}/{capsule.quiz.length}</span>
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
            </section>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function SectionHeader({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
  };
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className={`w-8 h-8 rounded-lg ${colorMap[color] || colorMap.primary} flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
  );
}

export default CapsulePage;
