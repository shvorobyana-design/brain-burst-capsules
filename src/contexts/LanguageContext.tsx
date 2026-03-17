import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "ua" | "en";

interface Translations {
  home: string; categories: string; progress: string; search: string; randomTopic: string;
  back: string; intro: string; theory: string; simple: string; terms: string; formulas: string;
  examples: string; illustrations: string; facts: string; quiz: string; in60sec: string;
  mainTheory: string; simpleExplanation: string; showNormal: string; explainSimpler: string;
  moreDetails: string; keyTerms: string; formulasAndRules: string; examplesAndProblems: string;
  examplesLabel: string; problemSolving: string; interestingFacts: string; miniTest: string;
  questionsForCheck: string; checkIfLearned: string; startTest: string; excellent: string;
  goodResult: string; tryAgain: string; retake: string; result: string; next: string;
  maybeInteresting: string; notFound: string; toHome: string; min: string; questions: string;
  searchPlaceholder: string; nothingFound: string; startTyping: string;
  aiAssistant: string; askAnything: string; askQuestion: string; aiDemoMessage: string;
  explainSimpler2: string; moreExamples: string; realLifeUse: string;
  heroTitle1: string; heroTitle2: string; heroSubtitle: string; heroBadge: string; heroSearchPlaceholder: string;
  howItWorks: string; howItWorksSubtitle: string;
  step1Title: string; step1Desc: string; step2Title: string; step2Desc: string; step3Title: string; step3Desc: string;
  allRightsReserved: string;
  popularCapsules: string; popularDesc: string; newCapsules: string; newDesc: string;
  categoriesTitle: string; categoriesSubtitle: string; categoriesPageTitle: string; categoriesPageSubtitle: string;
  capsules: string; sections: string; allLevels: string; difficulty: string;
  allCategories: string; categoryNotFound: string;
  progressTitle: string; capsulesRead: string; quizzesPassed: string; knowledgeLevel: string;
  beginner: string; learner: string; expert: string; master: string;
  startReadingPrompt: string; noProgressYet: string;
  newBadge: string; sectionTest: string; sectionTestDesc: string;
  capsuleCount: string; free: string; minutes: string;
  searchIllustration: string; searchIllustrationPlaceholder: string;
  stepLabel: string;
}

const ua: Translations = {
  home: "Головна", categories: "Категорії", progress: "Прогрес", search: "Пошук", randomTopic: "Випадкова тема",
  back: "Назад", intro: "Вступ", theory: "Теорія", simple: "Просто", terms: "Терміни", formulas: "Формули",
  examples: "Приклади", illustrations: "Ілюстрації", facts: "Факти", quiz: "Тест", in60sec: "⚡ За 60 секунд",
  mainTheory: "Основна теорія", simpleExplanation: "Пояснення простими словами",
  showNormal: "Показати звичайне пояснення", explainSimpler: "🧒 Поясни ще простіше",
  moreDetails: "Детальніше", keyTerms: "Ключові терміни", formulasAndRules: "Формули та правила",
  examplesAndProblems: "Приклади та задачі", examplesLabel: "📝 Приклади:", problemSolving: "🧮 Розв'язування задач:",
  interestingFacts: "Цікаві факти", miniTest: "Міні-тест", questionsForCheck: "запитань для перевірки знань",
  checkIfLearned: "Перевір, чи засвоїв матеріал", startTest: "Почати тест",
  excellent: "Чудово! Ти все знаєш! 🎉", goodResult: "Гарний результат! 👍",
  tryAgain: "Спробуй перечитати капсулу та пройти тест ще раз.", retake: "Пройти ще раз",
  result: "Результат", next: "Далі", maybeInteresting: "Можливо вам буде цікаво",
  notFound: "Капсулу не знайдено", toHome: "На головну", min: "хв", questions: "запитань",
  searchPlaceholder: "Шукай тему...", nothingFound: "Нічого не знайдено 😕",
  startTyping: "Почніть вводити назву теми...",
  aiAssistant: "AI Помічник", askAnything: "Запитай будь-що про тему",
  askQuestion: "Задай питання...", aiDemoMessage: "Зачекайте, шукаю відповідь...",
  explainSimpler2: "Поясни простіше", moreExamples: "Наведи ще приклади",
  realLifeUse: "Як це використовується в житті?",
  heroTitle1: "Вивчай будь-яку тему", heroTitle2: "за 5 хвилин",
  heroSubtitle: "Капсули знань — короткі структуровані уроки, які пояснюють складні теми просто, зрозуміло та візуально.",
  heroBadge: "Ультрашвидке навчання нового покоління",
  heroSearchPlaceholder: "Шукай тему: фотосинтез, ДНК, чорні діри...",
  howItWorks: "Як це працює", howItWorksSubtitle: "Три простих кроки до знань",
  step1Title: "Обери тему", step1Desc: "Знайди цікаву тему або натисни «Випадкова тема»",
  step2Title: "Читай капсулу", step2Desc: "Зрозумій тему за 1-5 хвилин із простими поясненнями",
  step3Title: "Перевір знання", step3Desc: "Пройди міні-тест і закріпи вивчене",
  allRightsReserved: "Усі права захищено",
  popularCapsules: "🔥 Популярні капсули", popularDesc: "Найпопулярніші теми серед учнів",
  newCapsules: "✨ Нові капсули", newDesc: "Щойно додані теми",
  categoriesTitle: "Категорії знань", categoriesSubtitle: "Обери предмет і почни навчання",
  categoriesPageTitle: "Усі предмети", categoriesPageSubtitle: "Обери предмет і почни навчання",
  capsules: "капсул", sections: "розділів", allLevels: "Усі рівні", difficulty: "Складність:",
  allCategories: "Усі категорії", categoryNotFound: "Категорію не знайдено",
  progressTitle: "Твій прогрес", capsulesRead: "Прочитано капсул", quizzesPassed: "Тестів пройдено",
  knowledgeLevel: "Рівень знань", beginner: "Новачок", learner: "Учень", expert: "Знавець", master: "Майстер",
  startReadingPrompt: "Почни читати капсули, щоб відстежувати прогрес! 🚀",
  noProgressYet: "Поки що прогресу немає",
  newBadge: "Нове", sectionTest: "Тест по розділу", sectionTestDesc: "Перевір знання з усього розділу",
  capsuleCount: "капсул", free: "Безкоштовно", minutes: "1-5 хвилин",
  searchIllustration: "Пошук ілюстрації", searchIllustrationPlaceholder: "Шукати ілюстрацію до теми...",
  stepLabel: "КРОК",
};

const en: Translations = {
  home: "Home", categories: "Categories", progress: "Progress", search: "Search", randomTopic: "Random Topic",
  back: "Back", intro: "Intro", theory: "Theory", simple: "Simple", terms: "Terms", formulas: "Formulas",
  examples: "Examples", illustrations: "Illustrations", facts: "Facts", quiz: "Quiz", in60sec: "⚡ In 60 seconds",
  mainTheory: "Main Theory", simpleExplanation: "Simple Explanation",
  showNormal: "Show normal explanation", explainSimpler: "🧒 Explain even simpler",
  moreDetails: "More details", keyTerms: "Key Terms", formulasAndRules: "Formulas & Rules",
  examplesAndProblems: "Examples & Problems", examplesLabel: "📝 Examples:", problemSolving: "🧮 Problem Solving:",
  interestingFacts: "Fun Facts", miniTest: "Mini Quiz", questionsForCheck: "questions to test your knowledge",
  checkIfLearned: "Check if you've learned the material", startTest: "Start Quiz",
  excellent: "Excellent! You know everything! 🎉", goodResult: "Good result! 👍",
  tryAgain: "Try re-reading the capsule and take the quiz again.", retake: "Retake",
  result: "Result", next: "Next", maybeInteresting: "You might also like",
  notFound: "Capsule not found", toHome: "Go home", min: "min", questions: "questions",
  searchPlaceholder: "Search a topic...", nothingFound: "Nothing found 😕",
  startTyping: "Start typing a topic name...",
  aiAssistant: "AI Assistant", askAnything: "Ask anything about the topic",
  askQuestion: "Ask a question...", aiDemoMessage: "Searching for an answer...",
  explainSimpler2: "Explain simpler", moreExamples: "Give more examples",
  realLifeUse: "How is this used in real life?",
  heroTitle1: "Learn any topic", heroTitle2: "in 5 minutes",
  heroSubtitle: "Knowledge capsules — short structured lessons that explain complex topics simply, clearly and visually.",
  heroBadge: "Ultra-fast learning of the new generation",
  heroSearchPlaceholder: "Search a topic: photosynthesis, DNA, black holes...",
  howItWorks: "How It Works", howItWorksSubtitle: "Three simple steps to knowledge",
  step1Title: "Choose a topic", step1Desc: "Find an interesting topic or click 'Random Topic'",
  step2Title: "Read the capsule", step2Desc: "Understand the topic in 1-5 minutes with simple explanations",
  step3Title: "Test your knowledge", step3Desc: "Take a mini quiz and reinforce what you learned",
  allRightsReserved: "All rights reserved",
  popularCapsules: "🔥 Popular capsules", popularDesc: "Most popular topics among students",
  newCapsules: "✨ New capsules", newDesc: "Recently added topics",
  categoriesTitle: "Knowledge Categories", categoriesSubtitle: "Choose a subject and start learning",
  categoriesPageTitle: "All Subjects", categoriesPageSubtitle: "Choose a subject and start learning",
  capsules: "capsules", sections: "sections", allLevels: "All levels", difficulty: "Difficulty:",
  allCategories: "All categories", categoryNotFound: "Category not found",
  progressTitle: "Your Progress", capsulesRead: "Capsules read", quizzesPassed: "Quizzes passed",
  knowledgeLevel: "Knowledge level", beginner: "Beginner", learner: "Learner", expert: "Expert", master: "Master",
  startReadingPrompt: "Start reading capsules to track your progress! 🚀",
  noProgressYet: "No progress yet",
  newBadge: "New", sectionTest: "Section Test", sectionTestDesc: "Test your knowledge of the entire section",
  capsuleCount: "capsules", free: "Free", minutes: "1-5 minutes",
  searchIllustration: "Search illustration", searchIllustrationPlaceholder: "Search illustration for the topic...",
  stepLabel: "STEP",
};

interface LanguageContextType { lang: Lang; setLang: (l: Lang) => void; t: Translations; }

const LanguageContext = createContext<LanguageContextType>({ lang: "ua", setLang: () => {}, t: ua });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("braincapsule-lang");
    return (saved === "en" ? "en" : "ua") as Lang;
  });
  const handleSetLang = (l: Lang) => { setLang(l); localStorage.setItem("braincapsule-lang", l); };
  const t = lang === "en" ? en : ua;
  return <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
