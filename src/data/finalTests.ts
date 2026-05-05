import { capsules } from "./capsules";
import { capsuleTranslationsEn } from "./capsules-en";

export interface FinalTestQuestion {
  question: string;
  options: string[];
  answer: number;
  capsuleId: string;
  capsuleTitle: string;
}

export interface FinalTestData {
  questions: FinalTestQuestion[];
}

const TARGET = 30;

/**
 * Build a final test for a given subject category in the requested language.
 * Picks questions round-robin across all capsules of that subject so coverage
 * is balanced. Falls back to UA content if EN translation is missing.
 */
export function getFinalTest(categoryId: string, lang: "ua" | "en"): FinalTestData {
  const subjectCaps = capsules.filter(c => c.category === categoryId);

  type Pick = { capsuleId: string; capsuleTitle: string; q: { question: string; options: string[]; answer: number } };
  const picks: Pick[] = [];

  let round = 0;
  let added = true;
  while (picks.length < TARGET && added) {
    added = false;
    for (const c of subjectCaps) {
      const enTr = capsuleTranslationsEn[c.id];
      const uaQuiz = c.quiz || [];
      const enQuiz = enTr?.quiz || [];

      let quizArr: { question: string; options: string[]; answer: number }[];
      let title: string;
      if (lang === "en") {
        // Use EN where available; only pick rounds that exist in EN translation
        if (round >= enQuiz.length) continue;
        quizArr = enQuiz;
        title = enTr?.title || c.title;
      } else {
        if (round >= uaQuiz.length) continue;
        quizArr = uaQuiz;
        title = c.title;
      }

      picks.push({
        capsuleId: c.id,
        capsuleTitle: title,
        q: quizArr[round],
      });
      added = true;
      if (picks.length >= TARGET) break;
    }
    round++;
  }

  return {
    questions: picks.map(p => ({
      question: p.q.question,
      options: p.q.options,
      answer: p.q.answer,
      capsuleId: p.capsuleId,
      capsuleTitle: p.capsuleTitle,
    })),
  };
}