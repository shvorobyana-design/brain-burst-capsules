import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, BarChart3, Lightbulb, BookOpen, CheckCircle, XCircle,
  Sparkles, BookMarked, FlaskConical, PenTool, Zap, List, Brain, ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";
import { capsules, categories } from "@/data/capsules";
import { capsuleTranslationsEn } from "@/data/capsules-en";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/hooks/useProgress";

const topicHeroImages: Record<string, string> = {
  "what-is-biology": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=400&fit=crop",
  "levels-of-life": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=400&fit=crop",
  "cell-structure": "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&h=400&fit=crop",
  "photosynthesis": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
  "mitosis": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=400&fit=crop",
  "dna-structure": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=400&fit=crop",
  "genetics-mendel": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  "evolution-darwin": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
  "natural-selection": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=400&fit=crop",
  "ecosystem": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
  "food-chains": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
  "natural-numbers": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  "fractions-basics": "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=400&fit=crop",
  "quadratic-equations": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop",
  "pythagorean-theorem": "https://images.unsplash.com/photo-1635372722256-16f6b1a6d02c?w=800&h=400&fit=crop",
  "linear-functions": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  "sin-cos-tan": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  "derivatives": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  "integrals": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  "what-is-chemistry": "https://images.unsplash.com/photo-1532187863486-abf4dbce1253?w=800&h=400&fit=crop",
  "atom-structure": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
  "periodic-table": "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&h=400&fit=crop",
  "chemical-bonds": "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=800&h=400&fit=crop",
  "chemical-reactions": "https://images.unsplash.com/photo-1532187863486-abf4dbce1253?w=800&h=400&fit=crop",
  "organic-chemistry-basics": "https://images.unsplash.com/photo-1532187863486-abf4dbce1253?w=800&h=400&fit=crop",
  "newtons-laws": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
  "energy-physics": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
  "gravity": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
  "states-of-matter": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
  "electric-current": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
  "magnetism-basics": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
  "light-basics": "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&h=400&fit=crop",
  "nuclear-physics": "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
  "ancient-egypt": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=400&fit=crop",
  "ancient-greece": "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=400&fit=crop",
  "kyivan-rus": "https://images.unsplash.com/photo-1561542320-9a18cd340e98?w=800&h=400&fit=crop",
  "world-war-1": "https://images.unsplash.com/photo-1461360370896-922624d12ebb?w=800&h=400&fit=crop",
  "world-war-2": "https://images.unsplash.com/photo-1461360370896-922624d12ebb?w=800&h=400&fit=crop",
  "ua-sounds": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop",
  "ua-parts-of-speech": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop",
  "en-articles": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-to-be": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-present-simple": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-present-continuous": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-past-simple": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-future-simple": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-present-perfect": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-false-friends": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  "en-pronunciation-basics": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
};

const subjectFallbackImages: Record<string, string> = {
  biology: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=400&fit=crop",
  math: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  ukrainian: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop",
  english: "https://images.unsplash.com/photo-1543109740-4bdb38fda756?w=800&h=400&fit=crop",
  history: "https://images.unsplash.com/photo-1461360370896-922624d12ebb?w=800&h=400&fit=crop",
  chemistry: "https://images.unsplash.com/photo-1532187863486-abf4dbce1253?w=800&h=400&fit=crop",
  physics: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop",
};

const diffColor: Record<string, string> = {
  "базовий": "text-accent bg-accent/10",
  "середній": "text-secondary bg-secondary/10",
  "поглиблений": "text-primary bg-primary/10",
  "олімпіадний": "text-destructive bg-destructive/10",
};

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
  const { lang, t, translateCategory, translateDifficulty } = useLanguage();
  const { markRead, saveQuizResult } = useProgress();

  // Mark as read when visiting
  useEffect(() => {
    if (capsule) markRead(capsule.id);
  }, [capsule, markRead]);

  // Get translated content
  const tr = useMemo(() => {
    if (!capsule) return null;
    if (lang === "en" && capsuleTranslationsEn[capsule.id]) {
      return capsuleTranslationsEn[capsule.id];
    }
    return null;
  }, [capsule, lang]);

  const title = tr?.title || capsule?.title || "";
  const shortDesc = tr?.shortDescription || capsule?.shortDescription || "";
  const introduction = tr?.introduction || capsule?.introduction || "";
  const theory = tr?.theory || capsule?.theory || "";
  const beginnerExp = tr?.beginnerExplanation || capsule?.beginnerExplanation || "";
  const detailedExp = tr?.detailedExplanation || capsule?.detailedExplanation || "";
  const simpleExp = tr?.simpleExplanation || capsule?.simpleExplanation || "";
  const quickSum = tr?.quickSummary || capsule?.quickSummary || "";
  const keyTerms = tr?.keyTerms || capsule?.keyTerms || [];
  const formulas = tr?.formulas || capsule?.formulas || [];
  const examples = tr?.examples || capsule?.examples || [];
  const problemSolving = tr?.problemSolving || capsule?.problemSolving || [];
  const facts = tr?.facts || capsule?.facts || [];
  const quiz = tr?.quiz || capsule?.quiz || [];

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
  
  // 1. Спершу перевіряємо, чи є картинка в даних капсули (те, що ти вставляв)
  if (capsule.images && capsule.images.length > 0 && capsule.images[0].url) {
    return capsule.images[0].url;
  }
  
  // 2. Якщо там порожньо — беремо з хардкодженого списку або фолбек
  return topicHeroImages[capsule.id] || subjectFallbackImages[capsule.category] || subjectFallbackImages.biology;
}, [capsule]);

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === quiz[currentQ].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quiz.length) {
      setQuizDone(true);
      saveQuizResult(capsule.id, score + (answered === quiz[currentQ].answer ? 0 : 0), quiz.length);
    } else {
      setCurrentQ(c => c + 1);
      setAnswered(null);
    }
  };

  // Save final score when quiz done
  const handleQuizDone = () => {
    setQuizDone(true);
    saveQuizResult(capsule.id, score, quiz.length);
  };

  const sections = [
    { id: "intro", label: t.intro, icon: BookOpen, show: true },
    { id: "theory", label: t.theory, icon: Brain, show: !!theory },
    { id: "simple", label: t.simple, icon: Sparkles, show: true },
    { id: "terms", label: t.terms, icon: BookMarked, show: keyTerms.length > 0 },
    { id: "formulas", label: t.formulas, icon: FlaskConical, show: formulas.length > 0 },
    { id: "examples", label: t.examples, icon: PenTool, show: examples.length > 0 || problemSolving.length > 0 },
    { id: "facts", label: t.facts, icon: Lightbulb, show: true },
    { id: "quiz", label: t.quiz, icon: CheckCircle, show: true },
  ].filter(s => s.show);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getRelatedTitle = (rc: typeof capsules[0]) => {
    if (lang === "en" && capsuleTranslationsEn[rc.id]) return capsuleTranslationsEn[rc.id].title;
    return rc.title;
  };
  const getRelatedDesc = (rc: typeof capsules[0]) => {
    if (lang === "en" && capsuleTranslationsEn[rc.id]) return capsuleTranslationsEn[rc.id].shortDescription;
    return rc.shortDescription;
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
            <ArrowLeft className="w-4 h-4" /> {category ? translateCategory(category.id) : t.back}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Hero Image */}
<div className="w-full rounded-2xl overflow-hidden mb-8 border border-border shadow-md bg-muted/10">
  <img 
    src={heroImageUrl} 
    alt={title} 
    className="w-full h-auto block object-contain shadow-inner" 
  />
</div>

            {/* Header */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl shrink-0">
                  {capsule.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{title}</h1>
                  <p className="text-muted-foreground">{shortDesc}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" /> {capsule.readTime} {t.min}
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${diffColor[capsule.difficulty]}`}>
                  <BarChart3 className="w-3.5 h-3.5" /> {translateDifficulty(capsule.difficulty)}
                </div>
                {quiz.length > 0 && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle className="w-4 h-4" /> {quiz.length} {t.questions}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-5 md:p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">{t.in60sec}</h2>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">{quickSum}</p>
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
              <SectionHeader icon={BookOpen} title={t.intro} color="primary" />
              <p className="text-foreground/80 leading-relaxed text-[15px]">{introduction}</p>
            </section>

            {/* Theory */}
            {theory && (
              <section id="section-theory" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={Brain} title={t.mainTheory} color="secondary" />
                <div className="prose-custom text-foreground/80 text-[15px] leading-relaxed whitespace-pre-line">
                  {theory}
                </div>
              </section>
            )}

            {/* Simple Explanation */}
            <section id="section-simple" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={Sparkles} title={t.simpleExplanation} color="accent" />
              <button
                onClick={() => setShowSimple(!showSimple)}
                className="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-xl bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {showSimple ? t.showNormal : t.explainSimpler}
              </button>
              <p className="text-foreground/80 leading-relaxed text-[15px]">
                {showSimple ? simpleExp : beginnerExp}
              </p>
              {!showSimple && (
                <div className="border-t border-border mt-6 pt-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-secondary" /> {t.moreDetails}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{detailedExp}</p>
                </div>
              )}
            </section>

            {/* Key Terms */}
            {keyTerms.length > 0 && (
              <section id="section-terms" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={BookMarked} title={t.keyTerms} color="primary" />
                <div className="space-y-3">
                  {keyTerms.map((kt, i) => (
                    <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
                      <dt className="font-semibold text-foreground text-sm mb-1">{kt.term}</dt>
                      <dd className="text-muted-foreground text-sm">{kt.definition}</dd>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Formulas */}
            {formulas.length > 0 && (
              <section id="section-formulas" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={FlaskConical} title={t.formulasAndRules} color="secondary" />
                <div className="space-y-2">
                  {formulas.map((f, i) => (
                    <div key={i} className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl px-4 py-3 border border-primary/10 font-mono text-sm text-foreground">
                      {f}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Examples & Problem Solving */}
            {(examples.length > 0 || problemSolving.length > 0) && (
              <section id="section-examples" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
                <SectionHeader icon={PenTool} title={t.examplesAndProblems} color="accent" />
                {examples.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground text-sm mb-3">{t.examplesLabel}</h3>
                    <ul className="space-y-2">
                      {examples.map((ex, i) => (
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
                {problemSolving.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-3">{t.problemSolving}</h3>
                    <div className="space-y-4">
                      {problemSolving.map((ps, i) => (
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

            {/* Facts */}
            <section id="section-facts" className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6 shadow-sm">
              <SectionHeader icon={Lightbulb} title={t.interestingFacts} color="accent" />
              <ul className="space-y-3">
                {facts.map((f, i) => (
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
              <SectionHeader icon={CheckCircle} title={t.miniTest} color="primary" />
              {!quizStarted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <List className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{quiz.length} {t.questionsForCheck}</p>
                  <p className="text-xs text-muted-foreground mb-6">{t.checkIfLearned}</p>
                  <button onClick={() => setQuizStarted(true)} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    {t.startTest}
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-8">
                  <div className="text-5xl font-bold gradient-text mb-3">{score}/{quiz.length}</div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {score === quiz.length ? t.excellent :
                     score >= quiz.length * 0.7 ? t.goodResult : t.tryAgain}
                  </p>
                  <button
                    onClick={() => { setQuizDone(false); setQuizStarted(false); setCurrentQ(0); setScore(0); setAnswered(null); }}
                    className="px-6 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-all"
                  >
                    {t.retake}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{currentQ + 1}/{quiz.length}</span>
                  </div>
                  <p className="font-medium mb-4 text-foreground">{quiz[currentQ].question}</p>
                  <div className="space-y-2 mb-4">
                    {quiz[currentQ].options.map((opt, i) => {
                      let cls = "bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-left w-full transition-all";
                      if (answered !== null) {
                        if (i === quiz[currentQ].answer) cls = "bg-accent/10 border border-accent/40 rounded-xl px-4 py-3 text-sm text-left w-full";
                        else if (i === answered) cls = "bg-destructive/10 border border-destructive/40 rounded-xl px-4 py-3 text-sm text-left w-full";
                      } else {
                        cls += " hover:border-primary/40 hover:bg-primary/5 cursor-pointer";
                      }
                      return (
                        <button key={i} onClick={() => handleAnswer(i)} className={cls}>
                          <span className="flex items-center gap-2">
                            {answered !== null && i === quiz[currentQ].answer && <CheckCircle className="w-4 h-4 text-accent" />}
                            {answered !== null && i === answered && i !== quiz[currentQ].answer && <XCircle className="w-4 h-4 text-destructive" />}
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {answered !== null && (
                    <button onClick={() => {
                      if (currentQ + 1 >= quiz.length) {
                        const finalScore = score + (answered === quiz[currentQ].answer ? 0 : 0);
                        setQuizDone(true);
                        saveQuizResult(capsule.id, score, quiz.length);
                      } else {
                        setCurrentQ(c => c + 1);
                        setAnswered(null);
                      }
                    }} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md transition-all">
                      {currentQ + 1 >= quiz.length ? t.result : t.next}
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* Related Topics */}
            {relatedCapsules.length > 0 && (
              <section className="bg-card rounded-2xl border border-border p-6 md:p-8 mt-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{t.maybeInteresting}</h2>
                </div>
                <div className="grid gap-3">
                  {relatedCapsules.map(rc => (
                    <Link
                      key={rc.id}
                      to={`/capsule/${rc.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-border/50 group"
                    >
                      <span className="text-xl">{rc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{getRelatedTitle(rc)}</div>
                        <div className="text-xs text-muted-foreground truncate">{getRelatedDesc(rc)}</div>
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

      <AIChatButton
        topicTitle={title}
        topicContext={introduction + " " + theory}
        capsuleData={{
          theory: theory,
          simpleExplanation: simpleExp,
          keyTerms: keyTerms,
          formulas: formulas,
          examples: examples,
          facts: facts,
        }}
      />

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
