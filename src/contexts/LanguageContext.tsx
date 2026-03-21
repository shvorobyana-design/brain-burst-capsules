import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ua" | "en";

interface Translations {
  // Navbar
  home: string;
  categories: string;
  progress: string;
  search: string;
  randomTopic: string;
  // Hero
  heroTagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroSearchPlaceholder: string;
  statCapsules: string;
  statMinutes: string;
  statFree: string;
  // HowItWorks
  howItWorks: string;
  howItWorksHighlight: string;
  howItWorksSubtitle: string;
  step: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  // Footer
  allRightsReserved: string;
  // Index
  popularCapsules: string;
  popularDesc: string;
  newCapsules: string;
  newDesc: string;
  // Categories page
  allSubjects: string;
  allSubjectsHighlight: string;
  chooseSubject: string;
  capsules_word: string;
  sections_word: string;
  // Category page
  categoryNotFound: string;
  allCategoriesLink: string;
  capsuleKnowledge: string;
  difficultyLabel: string;
  allLevels: string;
  // CategoryGrid
  categoriesOfKnowledge: string;
  categoriesOfKnowledgeHighlight: string;
  // CapsuleCard
  newBadge: string;
  minShort: string;
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
  noDataAbout: string;
  noFormulasButTheory: string;
  keyTermsLabel: string;
  funFactsLabel: string;
  foundForQuery: string;
  aboutTopic: string;
  tryAskingHint: string;
  // Progress
  readCapsulesLabel: string;
  testsPassed: string;
  knowledgeLevel: string;
  beginner: string;
  startReadingProgress: string;
  yourProgress: string;
  yourProgressHighlight: string;
  // NotFound
  pageNotFound: string;
  returnHome: string;
  // Difficulty
  basic: string;
  medium: string;
  advanced: string;
  olympic: string;
  // Category/section name translations
  cat_biology: string;
  cat_math: string;
  cat_ukrainian: string;
  cat_english: string;
  cat_history: string;
  cat_chemistry: string;
  cat_physics: string;
}

const ua: Translations = {
  home: "Головна",
  categories: "Категорії",
  progress: "Прогрес",
  search: "Пошук",
  randomTopic: "Випадкова тема",
  heroTagline: "Ультрашвидке навчання нового покоління",
  heroTitle: "Вивчай будь-яку тему",
  heroHighlight: "за 5 хвилин",
  heroDescription: "Капсули знань — короткі структуровані уроки, які пояснюють складні теми просто, зрозуміло та візуально.",
  heroSearchPlaceholder: "Шукай тему: фотосинтез, ДНК, чорні діри...",
  statCapsules: "капсул",
  statMinutes: "1-5 хвилин",
  statFree: "Безкоштовно",
  howItWorks: "Як це",
  howItWorksHighlight: "працює",
  howItWorksSubtitle: "Три простих кроки до знань",
  step: "КРОК",
  step1Title: "Обери тему",
  step1Desc: "Знайди цікаву тему або натисни «Випадкова тема»",
  step2Title: "Читай капсулу",
  step2Desc: "Зрозумій тему за 1-5 хвилин із простими поясненнями",
  step3Title: "Перевір знання",
  step3Desc: "Пройди міні-тест і закріпи вивчене",
  allRightsReserved: "Усі права захищено",
  popularCapsules: "Популярні",
  popularDesc: "Найпопулярніші теми серед учнів",
  newCapsules: "Нові",
  newDesc: "Щойно додані теми",
  allSubjects: "Усі",
  allSubjectsHighlight: "предмети",
  chooseSubject: "Обери предмет і почни навчання",
  capsules_word: "капсул",
  sections_word: "розділів",
  categoryNotFound: "Категорію не знайдено",
  allCategoriesLink: "Усі категорії",
  capsuleKnowledge: "капсул знань",
  difficultyLabel: "Складність:",
  allLevels: "Усі рівні",
  categoriesOfKnowledge: "Категорії",
  categoriesOfKnowledgeHighlight: "знань",
  newBadge: "Нове",
  minShort: "хв",
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
  noDataAbout: "На жаль, я не маю достатньо даних про",
  noFormulasButTheory: "У цій темі формул немає, але ось ключова теорія:",
  keyTermsLabel: "Ключові терміни:",
  funFactsLabel: "Цікаві факти:",
  foundForQuery: "Ось що я знайшов по вашому запиту:",
  aboutTopic: "Про тему",
  tryAskingHint: "Спробуйте запитати про терміни, формули, приклади або факти цієї теми! 🧠",
  readCapsulesLabel: "Прочитано капсул",
  testsPassed: "Тестів пройдено",
  knowledgeLevel: "Рівень знань",
  beginner: "Новачок",
  startReadingProgress: "Почни читати капсули, щоб відстежувати прогрес! 🚀",
  yourProgress: "Твій",
  yourProgressHighlight: "прогрес",
  pageNotFound: "Сторінку не знайдено",
  returnHome: "На головну",
  basic: "базовий",
  medium: "середній",
  advanced: "поглиблений",
  olympic: "олімпіадний",
  cat_biology: "Біологія",
  cat_math: "Математика",
  cat_ukrainian: "Українська мова",
  cat_english: "Англійська мова",
  cat_history: "Історія",
  cat_chemistry: "Хімія",
  cat_physics: "Фізика",
};

const en: Translations = {
  home: "Home",
  categories: "Categories",
  progress: "Progress",
  search: "Search",
  randomTopic: "Random Topic",
  heroTagline: "Ultra-fast learning for the new generation",
  heroTitle: "Learn any topic",
  heroHighlight: "in 5 minutes",
  heroDescription: "Knowledge capsules — short structured lessons that explain complex topics simply, clearly, and visually.",
  heroSearchPlaceholder: "Search a topic: photosynthesis, DNA, black holes...",
  statCapsules: "capsules",
  statMinutes: "1-5 minutes",
  statFree: "Free",
  howItWorks: "How it",
  howItWorksHighlight: "works",
  howItWorksSubtitle: "Three simple steps to knowledge",
  step: "STEP",
  step1Title: "Choose a topic",
  step1Desc: "Find an interesting topic or click \"Random Topic\"",
  step2Title: "Read the capsule",
  step2Desc: "Understand the topic in 1-5 minutes with simple explanations",
  step3Title: "Test your knowledge",
  step3Desc: "Take a mini-quiz and reinforce what you learned",
  allRightsReserved: "All rights reserved",
  popularCapsules: "Popular",
  popularDesc: "Most popular topics among students",
  newCapsules: "New",
  newDesc: "Recently added topics",
  allSubjects: "All",
  allSubjectsHighlight: "subjects",
  chooseSubject: "Choose a subject and start learning",
  capsules_word: "capsules",
  sections_word: "sections",
  categoryNotFound: "Category not found",
  allCategoriesLink: "All categories",
  capsuleKnowledge: "knowledge capsules",
  difficultyLabel: "Difficulty:",
  allLevels: "All levels",
  categoriesOfKnowledge: "Knowledge",
  categoriesOfKnowledgeHighlight: "categories",
  newBadge: "New",
  minShort: "min",
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
  noDataAbout: "Sorry, I don't have enough data about",
  noFormulasButTheory: "There are no formulas for this topic, but here's the key theory:",
  keyTermsLabel: "Key Terms:",
  funFactsLabel: "Fun Facts:",
  foundForQuery: "Here's what I found for your query:",
  aboutTopic: "About the topic",
  tryAskingHint: "Try asking about terms, formulas, examples, or facts of this topic! 🧠",
  readCapsulesLabel: "Capsules read",
  testsPassed: "Tests passed",
  knowledgeLevel: "Knowledge level",
  beginner: "Beginner",
  startReadingProgress: "Start reading capsules to track your progress! 🚀",
  yourProgress: "Your",
  yourProgressHighlight: "progress",
  pageNotFound: "Page not found",
  returnHome: "Return home",
  basic: "basic",
  medium: "medium",
  advanced: "advanced",
  olympic: "olympic",
  cat_biology: "Biology",
  cat_math: "Mathematics",
  cat_ukrainian: "Ukrainian Language",
  cat_english: "English Language",
  cat_history: "History",
  cat_chemistry: "Chemistry",
  cat_physics: "Physics",
};

// Map for translating category names by id
export const categoryNameMap: Record<string, Record<Lang, string>> = {
  biology: { ua: "Біологія", en: "Biology" },
  math: { ua: "Математика", en: "Mathematics" },
  ukrainian: { ua: "Українська мова", en: "Ukrainian Language" },
  english: { ua: "Англійська мова", en: "English Language" },
  history: { ua: "Історія", en: "History" },
  chemistry: { ua: "Хімія", en: "Chemistry" },
  physics: { ua: "Фізика", en: "Physics" },
};

// Map for translating section names
export const sectionNameMap: Record<string, Record<Lang, string>> = {
  "intro-bio": { ua: "Вступ до біології", en: "Introduction to Biology" },
  "cell": { ua: "Клітина", en: "Cell" },
  "tissues": { ua: "Тканини та органи", en: "Tissues & Organs" },
  "genetics": { ua: "Генетика", en: "Genetics" },
  "evolution": { ua: "Еволюція", en: "Evolution" },
  "ecology": { ua: "Екологія", en: "Ecology" },
  "numbers": { ua: "Числа і дії", en: "Numbers & Operations" },
  "fractions": { ua: "Дроби та відсотки", en: "Fractions & Percentages" },
  "algebra": { ua: "Алгебра", en: "Algebra" },
  "functions": { ua: "Функції", en: "Functions" },
  "geometry": { ua: "Геометрія", en: "Geometry" },
  "trigonometry": { ua: "Тригонометрія", en: "Trigonometry" },
  "calculus": { ua: "Математичний аналіз", en: "Calculus" },
  "phonetics": { ua: "Фонетика", en: "Phonetics" },
  "lexicology": { ua: "Лексикологія", en: "Lexicology" },
  "word-structure": { ua: "Будова слова", en: "Word Structure" },
  "parts-of-speech-ua": { ua: "Частини мови", en: "Parts of Speech" },
  "syntax-ua": { ua: "Синтаксис", en: "Syntax" },
  "punctuation": { ua: "Пунктуація", en: "Punctuation" },
  "basic-grammar": { ua: "Базова граматика", en: "Basic Grammar" },
  "parts-of-speech-en": { ua: "Частини мови", en: "Parts of Speech" },
  "tenses": { ua: "Часи (Tenses)", en: "Tenses" },
  "sentence-building": { ua: "Побудова речень", en: "Sentence Building" },
  "vocabulary": { ua: "Словниковий запас", en: "Vocabulary" },
  "pronunciation": { ua: "Вимова", en: "Pronunciation" },
  "prehistoric": { ua: "Первісний світ", en: "Prehistoric World" },
  "ancient": { ua: "Стародавній світ", en: "Ancient World" },
  "medieval": { ua: "Середньовіччя", en: "Middle Ages" },
  "modern": { ua: "Новий час", en: "Modern Era" },
  "contemporary": { ua: "Новітня історія", en: "Contemporary History" },
  "chem-basics": { ua: "Основи хімії", en: "Chemistry Basics" },
  "atom-structure": { ua: "Будова атома", en: "Atomic Structure" },
  "periodic-system": { ua: "Періодична система", en: "Periodic System" },
  "chemical-bonds": { ua: "Хімічні зв'язки", en: "Chemical Bonds" },
  "reactions": { ua: "Хімічні реакції", en: "Chemical Reactions" },
  "organic": { ua: "Органічна хімія", en: "Organic Chemistry" },
  "mechanics": { ua: "Механіка", en: "Mechanics" },
  "thermodynamics": { ua: "Термодинаміка", en: "Thermodynamics" },
  "electromagnetism": { ua: "Електромагнетизм", en: "Electromagnetism" },
  "optics": { ua: "Оптика", en: "Optics" },
  "nuclear": { ua: "Ядерна фізика", en: "Nuclear Physics" },
};

// Difficulty translation map
export const difficultyMap: Record<string, Record<Lang, string>> = {
  "базовий": { ua: "базовий", en: "basic" },
  "середній": { ua: "середній", en: "medium" },
  "поглиблений": { ua: "поглиблений", en: "advanced" },
  "олімпіадний": { ua: "олімпіадний", en: "olympic" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  translateCategory: (catId: string) => string;
  translateSection: (sectionId: string) => string;
  translateDifficulty: (diff: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ua",
  setLang: () => {},
  t: ua,
  translateCategory: (id) => id,
  translateSection: (id) => id,
  translateDifficulty: (d) => d,
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

  const translateCategory = (catId: string) =>
    categoryNameMap[catId]?.[lang] || catId;

  const translateSection = (sectionId: string) =>
    sectionNameMap[sectionId]?.[lang] || sectionId;

  const translateDifficulty = (diff: string) =>
    difficultyMap[diff]?.[lang] || diff;

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t, translateCategory, translateSection, translateDifficulty }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
