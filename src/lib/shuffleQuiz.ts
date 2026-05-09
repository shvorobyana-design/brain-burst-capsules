interface QuizQ {
  question: string;
  options: string[];
  answer: number;
  [k: string]: any;
}

// Fully randomly shuffle each question's options (Fisher–Yates) and remap
// the `answer` index to the new position of the correct option. This makes
// the correct answer land in a truly random row each render.
export function shuffleQuizAnswers<T extends QuizQ>(quiz: T[]): T[] {
  if (!quiz || quiz.length === 0) return quiz;
  return quiz.map((q) => {
    const n = q.options?.length ?? 0;
    if (n <= 1) return q;
    const indices = q.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const newOptions = indices.map((i) => q.options[i]);
    const newAnswer = indices.indexOf(q.answer);
    return { ...q, options: newOptions, answer: newAnswer };
  });
}