interface QuizQ {
  question: string;
  options: string[];
  answer: number;
  [k: string]: any;
}

// Deterministic-ish shuffle: ensures correct answers are spread across
// different positions across the quiz (round-robin target index based on
// question order), so the right option is not always in the same row.
export function shuffleQuizAnswers<T extends QuizQ>(quiz: T[]): T[] {
  if (!quiz || quiz.length === 0) return quiz;
  return quiz.map((q, idx) => {
    const n = q.options.length;
    if (n <= 1) return q;
    const target = idx % n; // distribute correct answer across rows
    if (q.answer === target) return q;
    const newOptions = [...q.options];
    const tmp = newOptions[target];
    newOptions[target] = newOptions[q.answer];
    newOptions[q.answer] = tmp;
    return { ...q, options: newOptions, answer: target };
  });
}