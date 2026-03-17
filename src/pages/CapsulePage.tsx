import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, BarChart3, Lightbulb, BookOpen, CheckCircle, XCircle,
  Sparkles, Brain, ArrowRight, Zap, Search, Image
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";
import {
  capsules, categories, getLocalizedTitle, getLocalizedDesc, getLocalizedIntro,
  getLocalizedTheory, getLocalizedSimple, getLocalizedFacts, getLocalizedQuiz,
  getLocalizedCategoryName, getLocalizedDifficulty
} from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";

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
  const [imageQuery, setImageQuery] = useState("");
  const { lang, t } = useLanguage();
  const { saveQuizResult, markCompleted } = useProgress();

  const category = capsule ? categories.find(c => c.id === capsule.category) : null;

  const relatedCapsules = useMemo(() => {
    if (!capsule) return [];
    const sameCat = capsules.filter(c => c.category === capsule.category && c.id !== capsule.id);
    const sameSection = sameCat.filter(c => c.section === capsule.section);
    return (sameSection.length > 0 ? sameSection : sameCat).slice(0, 3);
  }, [capsule]);

  if (!capsule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
          <Link to="/" className="text-primary underline">{t.toHome}</Link>
        </div>
      </div>
    );
  }

  const localQuiz = getLocalizedQuiz(capsule, lang);
  const localFacts = getLocalizedFacts(capsule, lang);
  const title = getLocalizedTitle(capsule, lang);
  const desc = getLocalizedDesc(capsule, lang);
  const intro = getLocalizedIntro(capsule, lang);
  const theory = getLocalizedTheory(capsule, lang);
  const simple = getLocalizedSimple(capsule, lang);
  const diffText = getLocalizedDifficulty(capsule.difficulty, lang);

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === localQuiz[currentQ].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= localQuiz.length) {
      setQuizDone(true);
      saveQuizResult(capsule.id, score + (answered === localQuiz[currentQ].answer ? 0 : 0), localQuiz.length);
      markCompleted(capsule.id);
    } else {
      setCurrentQ(c => c + 1);
      setAnswered(null);
    }
  };

  const diffColor: Record<string, string> = {
    "базовий": "text-accent bg-accent/10", "середній": "text-secondary bg-secondary/10",
    "поглиблений": "text-primary bg-primary/10", "олімпіадний": "text-destructive bg-destructive/10",
  };

  const sections = [
    { id: "intro", label: t.intro, icon: BookOpen, show: true },
    { id: "theory", label: t.theory, icon: Brain, show: !!theory },
    { id: "simple", label: t.simple, icon: Sparkles, show: true },
    { id: "facts", label: t.facts, icon: Lightbulb, show: true },
    { id: "quiz", label: t.quiz, icon: CheckCircle, show: true },
  ].filter(s => s.show);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const searchImageUrl = imageQuery
    ? `https://source.unsplash.com/800x400/?${encodeURIComponent(imageQuery)}`
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to={category ? `/category/${category.id}` : "/"} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> {category ? getLocalizedCategoryName(category, lang) : t.back}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Illustration Search */}
            <div className="bg-card rounded-2xl border border-border p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{t.searchIllustration}</span>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); if (!imageQuery) setImageQuery(title); }}
                className="flex items-center gap-2">
                <input type="text" value={imageQuery} onChange={e => setImageQuery(e.target.value)}
                  placeholder={`${t.searchIllustrationPlaceholder} "${title}"`}
                  className="flex-1 bg-muted/30 rounded-xl px-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground border border-border/50 focus:border-primary/40 transition-colors" />
                <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
                  <Search className="w-4 h-4" />
                </button>
              </form>
              {searchImageUrl && (
                <div className="mt-3 rounded-xl overflow-hidden border border-border">
                  <img src={searchImageUrl} alt={imageQuery} className="w-full h-48 md:h-64 object-cover" />
                </div>
              )}
            </div>

            {/* Header */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl shrink-0">{capsule.icon}</div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{title}</h1>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-4 h-4" /> {capsule.readTime} {t.min}</div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${diffColor[capsule.difficulty]}`}>
                  <BarChart3 className="w-3.5 h-3.5" /> {diffText}
                </div>
                {localQuiz.length > 0 && (
                  <div className="flex items-center gap-1.5 text-muted-foreground"><CheckCircle className="w-4 h-4" /> {localQuiz.length} {t.questions}</div>
                )}
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-5 md:p-6 mb-6">
              <div className="flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-primary" /><h2 className="font-semibold text-foreground">{t.in60sec}</h2></div>
              <p className="text-foreground/80 text-sm leading-relaxed">{intro}</p>
            </div>

            {/* Section Navigation */}
            <div className="bg-card rounded-xl border border-border p-2 mb-6 flex flex-wrap gap-1 sticky top-20 z-10 shadow-sm">
              {sections.map(s => (
                <button key={s.id} onClick={() => scrollToSection(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === s.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}>
                  <s.icon className="w-3.5 h-3.5" /><span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Introduction */}
            <section id="section-intro" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={BookOpen} title={t.intro} color="primary" />
              <p className="text-foreground/80 leading-relaxed text-[15px]">{intro}</p>
            </section>

            {/* Theory */}
            {theory && (
              <section id="section-theory" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={Brain} title={t.mainTheory} color="secondary" />
                <div className="text-foreground/80 text-[15px] leading-relaxed whitespace-pre-line">{theory}</div>
              </section>
            )}

            {/* Simple Explanation */}
            <section id="section-simple" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={Sparkles} title={t.simpleExplanation} color="accent" />
              <button onClick={() => setShowSimple(!showSimple)}
                className="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-xl bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-all">
                <Sparkles className="w-4 h-4" />{showSimple ? t.showNormal : t.explainSimpler}
              </button>
              <p className="text-foreground/80 leading-relaxed text-[15px]">{showSimple ? simple : intro}</p>
            </section>

            {/* Facts */}
            <section id="section-facts" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={Lightbulb} title={t.interestingFacts} color="accent" />
              <ul className="space-y-3">
                {localFacts.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quiz */}
            <section id="section-quiz" className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <SectionHeader icon={CheckCircle} title={t.miniTest} color="primary" />
              {!quizStarted ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-2">{localQuiz.length} {t.questionsForCheck}</p>
                  <p className="text-xs text-muted-foreground mb-6">{t.checkIfLearned}</p>
                  <button onClick={() => setQuizStarted(true)} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    {t.startTest}
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-8">
                  <div className="text-5xl font-bold gradient-text mb-3">{score}/{localQuiz.length}</div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {score === localQuiz.length ? t.excellent : score >= localQuiz.length * 0.7 ? t.goodResult : t.tryAgain}
                  </p>
                  <button onClick={() => { setQuizDone(false); setQuizStarted(false); setCurrentQ(0); setScore(0); setAnswered(null); }}
                    className="px-6 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-all">{t.retake}</button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${((currentQ + 1) / localQuiz.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{currentQ + 1}/{localQuiz.length}</span>
                  </div>
                  <p className="font-medium mb-4 text-foreground">{localQuiz[currentQ].question}</p>
                  <div className="space-y-2 mb-4">
                    {localQuiz[currentQ].options.map((opt, i) => {
                      let cls = "bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-left w-full transition-all";
                      if (answered !== null) {
                        if (i === localQuiz[currentQ].answer) cls = "bg-accent/10 border border-accent/40 rounded-xl px-4 py-3 text-sm text-left w-full";
                        else if (i === answered) cls = "bg-destructive/10 border border-destructive/40 rounded-xl px-4 py-3 text-sm text-left w-full";
                      } else cls += " hover:border-primary/40 hover:bg-primary/5 cursor-pointer";
                      return (
                        <button key={i} onClick={() => handleAnswer(i)} className={cls}>
                          <span className="flex items-center gap-2">
                            {answered !== null && i === localQuiz[currentQ].answer && <CheckCircle className="w-4 h-4 text-accent" />}
                            {answered !== null && i === answered && i !== localQuiz[currentQ].answer && <XCircle className="w-4 h-4 text-destructive" />}
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {answered !== null && (
                    <button onClick={nextQuestion} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all">
                      {currentQ + 1 >= localQuiz.length ? t.result : t.next}
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* Related Topics */}
            {relatedCapsules.length > 0 && (
              <section className="bg-card rounded-2xl border border-border p-6 md:p-8 mt-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
                  <h2 className="text-lg font-semibold text-foreground">{t.maybeInteresting}</h2>
                </div>
                <div className="grid gap-3">
                  {relatedCapsules.map(rc => (
                    <Link key={rc.id} to={`/capsule/${rc.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-border/50 group">
                      <span className="text-xl">{rc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{getLocalizedTitle(rc, lang)}</div>
                        <div className="text-xs text-muted-foreground truncate">{getLocalizedDesc(rc, lang)}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </div>

      <AIChatButton topicTitle={title} topicContext={intro + " " + theory}
        capsuleData={{ theory, simpleExplanation: simple, keyTerms: [], formulas: [], examples: [], facts: localFacts }} />
      <Footer />
    </div>
  );
};

function SectionHeader({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  const colorMap: Record<string, string> = { primary: "bg-primary/10 text-primary", secondary: "bg-secondary/10 text-secondary", accent: "bg-accent/10 text-accent" };
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className={`w-8 h-8 rounded-lg ${colorMap[color] || colorMap.primary} flex items-center justify-center`}><Icon className="w-4 h-4" /></div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
  );
}

export default CapsulePage;
