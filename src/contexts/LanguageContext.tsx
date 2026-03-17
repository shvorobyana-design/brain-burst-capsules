import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ua" | "en";

interface Translations {
  // Navbar
  home: string;
  categories: string;
  progress: string;
  search: string;
  randomTopic: string;
  // CapsulePage
  back: string;
  intro: string;
  theory: string;
  simple: string;
  terms: string;
  formulas: string;
  examples: string;
  illustrations: string;
  facts: string;
  quiz: string;
  in60sec: string;
  mainTheory: string;
  simpleExplanation: string;
  showNormal: string;
  explainSimpler: string;
  moreDetails: string;
  keyTerms: string;
  formulasAndRules: string;
  examplesAndProblems: string;
  examplesLabel: string;
  problemSolving: string;
  interestingFacts: string;
  miniTest: string;
  questionsForCheck: string;
  checkIfLearned: string;
  startTest: string;
  excellent: string;
  goodResult: string;
  tryAgain: string;
  retake: string;
  result: string;
  next: string;
  maybeInteresting: string;
  notFound: string;
  toHome: string;
  min: string;
  questions: string;
  // Search
  searchPlaceholder: string;
  nothingFound: string;
  startTyping: string;
  // AI Chat
  aiAssistant: string;
  askAnything: string;
  askQuestion: string;
  aiDemoMessage: string;
  explainSimpler2: string;
  moreExamples: string;
  realLifeUse: string;
  // Hero
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  // HowItWorks
  howItWorks: string;
  // Footer
  allRightsReserved: string;
  // Categories
  popularCapsules: string;
  popularDesc: string;
  newCapsules: string;
  newDesc: string;
  // Difficulty
  basic: string;
  medium: string;
  advanced: string;
  olympic: string;
}

const ua: Translations = {
  home: "Головна",
  categories: "Категорії",
  progress: "Прогрес",
  search: "Пошук",
  randomTopic: "Випадкова тема",
  back: "Назад",
  intro: "Вступ",
  theory: "Теорія",
  simple: "Просто",
  terms: "Терміни",
  formulas: "Формули",
  examples: "Приклади",
  illustrations: "Ілюстрації",
  facts: "Факти",
  quiz: "Тест",
  in60sec: "⚡ За 60 секунд",
  mainTheory: "Основна теорія",
  simpleExplanation: "Пояснення простими словами",
  showNormal: "Показати звичайне пояснення",
  explainSimpler: "🧒 Поясни ще простіше",
  moreDetails: "Детальніше",
  keyTerms: "Ключові терміни",
  formulasAndRules: "Формули та правила",
  examplesAndProblems: "Приклади та задачі",
  examplesLabel: "📝 Приклади:",
  problemSolving: "🧮 Розв'язування задач:",
  interestingFacts: "Цікаві факти",
  miniTest: "Міні-тест",
  questionsForCheck: "запитань для перевірки знань",
  checkIfLearned: "Перевір, чи засвоїв матеріал",
  startTest: "Почати тест",
  excellent: "Чудово! Ти все знаєш! 🎉",
  goodResult: "Гарний результат! 👍",
  tryAgain: "Спробуй перечитати капсулу та пройти тест ще раз.",
  retake: "Пройти ще раз",
  result: "Результат",
  next: "Далі",
  maybeInteresting: "Можливо вам буде цікаво",
  notFound: "Капсулу не знайдено",
  toHome: "На головну",
  min: "хв",
  questions: "запитань",
  searchPlaceholder: "Шукай тему...",
  nothingFound: "Нічого не знайдено 😕",
  startTyping: "Почніть вводити назву теми...",
  aiAssistant: "AI Помічник",
  askAnything: "Запитай будь-що про тему",
  askQuestion: "Задай питання...",
  aiDemoMessage: "Зачекайте, шукаю відповідь...",
  explainSimpler2: "Поясни простіше",
  moreExamples: "Наведи ще приклади",
  realLifeUse: "Як це використовується в житті?",
  heroTitle1: "Вивчай",
  heroTitle2: "легко",
  heroSubtitle: "Мікро-уроки з усіх шкільних предметів",
  howItWorks: "Як це працює",
  allRightsReserved: "Усі права захищено",
  popularCapsules: "Популярні капсули",
  popularDesc: "Найпопулярніші теми серед учнів",
  newCapsules: "Нові капсули",
  newDesc: "Щойно додані теми",
  basic: "базовий",
  medium: "середній",
  advanced: "поглиблений",
  olympic: "олімпіадний",
};

const en: Translations = {
  home: "Home",
  categories: "Categories",
  progress: "Progress",
  search: "Search",
  randomTopic: "Random Topic",
  back: "Back",
  intro: "Intro",
  theory: "Theory",
  simple: "Simple",
  terms: "Terms",
  formulas: "Formulas",
  examples: "Examples",
  illustrations: "Illustrations",
  facts: "Facts",
  quiz: "Quiz",
  in60sec: "⚡ In 60 seconds",
  mainTheory: "Main Theory",
  simpleExplanation: "Simple Explanation",
  showNormal: "Show normal explanation",
  explainSimpler: "🧒 Explain even simpler",
  moreDetails: "More details",
  keyTerms: "Key Terms",
  formulasAndRules: "Formulas & Rules",
  examplesAndProblems: "Examples & Problems",
  examplesLabel: "📝 Examples:",
  problemSolving: "🧮 Problem Solving:",
  interestingFacts: "Fun Facts",
  miniTest: "Mini Quiz",
  questionsForCheck: "questions to test your knowledge",
  checkIfLearned: "Check if you've learned the material",
  startTest: "Start Quiz",
  excellent: "Excellent! You know everything! 🎉",
  goodResult: "Good result! 👍",
  tryAgain: "Try re-reading the capsule and take the quiz again.",
  retake: "Retake",
  result: "Result",
  next: "Next",
  maybeInteresting: "You might also like",
  notFound: "Capsule not found",
  toHome: "Go home",
  min: "min",
  questions: "questions",
  searchPlaceholder: "Search a topic...",
  nothingFound: "Nothing found 😕",
  startTyping: "Start typing a topic name...",
  aiAssistant: "AI Assistant",
  askAnything: "Ask anything about the topic",
  askQuestion: "Ask a question...",
  aiDemoMessage: "Searching for an answer...",
  explainSimpler2: "Explain simpler",
  moreExamples: "Give more examples",
  realLifeUse: "How is this used in real life?",
  heroTitle1: "Learn",
  heroTitle2: "easily",
  heroSubtitle: "Micro-lessons on all school subjects",
  howItWorks: "How It Works",
  allRightsReserved: "All rights reserved",
  popularCapsules: "Popular capsules",
  popularDesc: "Most popular topics among students",
  newCapsules: "New capsules",
  newDesc: "Recently added topics",
  basic: "basic",
  medium: "medium",
  advanced: "advanced",
  olympic: "olympic",
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ua",
  setLang: () => {},
  t: ua,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("braincapsule-lang");
    return (saved === "en" ? "en" : "ua") as Lang;
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("braincapsule-lang", l);
  };

  const t = lang === "en" ? en : ua;

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
