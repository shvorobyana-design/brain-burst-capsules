// Local-only capsule assistant: answers strictly from the current capsule data.
export interface AssistantData {
  theory?: string;
  introduction?: string;
  summary?: string;
  simpleExplanation?: string;
  keyTerms?: { term: string; definition: string }[];
  formulas?: string[];
  examples?: string[];
  facts?: string[];
  problemSolving?: { problem: string; solution: string }[];
  quiz?: { question: string; options: string[]; answer: number }[];
}

type Lang = "ua" | "en";

const STOP = new Set(
  ("що це як чому де коли хто який яка яке які яку його її їх для про від при між або але також так тому щоб чи ще вже там тут цей ця ці той та те бути є був була було були можна треба мені мене поясни розкажи скажи будь ласка дай наведи значить означає таке такий така ну а і й в у з із на до по за не так " +
    "what is are was were the a an of to in on for and or but how why where when who which that this these those does do did can could explain tell me please about give with from by it its be as at mean means").split(/\s+/)
);

const norm = (s: string) => s.toLowerCase().replace(/[’'`ʼ]/g, "'").replace(/[^\p{L}\p{N}'\s-]/gu, " ");

// Crude stemmer: compare word prefixes so "річки"/"річка", "rivers"/"river" match.
const stem = (w: string) => (w.length <= 4 ? w : w.slice(0, Math.max(4, Math.ceil(w.length * 0.7))));

export const keywords = (q: string) =>
  norm(q).split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)).map(stem);

interface Chunk { text: string; kind: string; weight: number }

function chunks(d: AssistantData): Chunk[] {
  const out: Chunk[] = [];
  const split = (t: string | undefined, kind: string, w: number) =>
    (t || "").split(/\n+|(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 15)
      .forEach((text) => out.push({ text, kind, weight: w }));
  d.keyTerms?.forEach((k) => out.push({ text: `**${k.term}** — ${k.definition}`, kind: "term", weight: 1.6 }));
  split(d.theory, "theory", 1);
  split(d.introduction, "intro", 0.9);
  split(d.summary, "summary", 1.1);
  split(d.simpleExplanation, "simple", 0.9);
  d.formulas?.forEach((t) => out.push({ text: t, kind: "formula", weight: 1.2 }));
  d.examples?.forEach((t) => out.push({ text: t, kind: "example", weight: 1 }));
  d.facts?.forEach((t) => out.push({ text: t, kind: "fact", weight: 1 }));
  d.problemSolving?.forEach((p) => out.push({ text: `${p.problem}\n➡️ ${p.solution}`, kind: "problem", weight: 1.1 }));
  d.quiz?.forEach((q) => q.options[q.answer] && out.push({ text: `${q.question} — **${q.options[q.answer]}**`, kind: "quiz", weight: 0.8 }));
  return out;
}

function score(c: Chunk, kws: string[]): number {
  const words = norm(c.text).split(/\s+/);
  let s = 0;
  for (const k of kws) if (words.some((w) => w.startsWith(k) || (w.length > 3 && k.startsWith(stem(w))))) s += 1;
  return s * c.weight;
}

const T = {
  ua: {
    noData: (t: string) => `❌ Немає достатньо даних про "${t}".`,
    hi: (t: string) => `👋 Привіт! Я твій помічник з теми **"${t}"**. Запитай будь-що: визначення, приклади, формули, факти чи як це працює.`,
    thanks: () => `😊 Завжди радий допомогти! Питай ще.`,
    simple: "Просте пояснення", formulas: "Формули та правила", noFormulas: "У цій темі формул немає, ось головна суть:",
    examples: "Приклади", facts: "Цікаві факти", terms: "Ключові терміни", summary: "Коротко про тему", life: "Де це в житті",
    found: "Ось що я знайшов у капсулі:", problems: "Задачі з розв'язком",
    fb: (t: string) => `🤔 У капсулі "${t}" немає прямої відповіді на це. Ось головне з теми:`,
  },
  en: {
    noData: (t: string) => `❌ Not enough data about "${t}".`,
    hi: (t: string) => `👋 Hi! I'm your helper for **"${t}"**. Ask anything: definitions, examples, formulas, facts or how it works.`,
    thanks: () => `😊 Happy to help! Ask me more.`,
    simple: "Simple explanation", formulas: "Formulas & rules", noFormulas: "This topic has no formulas, here's the key idea:",
    examples: "Examples", facts: "Fun facts", terms: "Key terms", summary: "Topic in short", life: "In real life",
    found: "Here's what I found in the capsule:", problems: "Solved problems",
    fb: (t: string) => `🤔 The capsule "${t}" has no direct answer to that. Here's the key idea of the topic:`,
  },
};

const list = (arr: string[]) => arr.map((e, i) => `${i + 1}. ${e}`).join("\n");

export function findAnswer(query: string, d: AssistantData | undefined, title: string, lang: Lang): string {
  const L = T[lang] || T.ua;
  if (!d) return L.noData(title);
  const q = norm(query).trim();
  if (!q) return L.hi(title);
  const kws = keywords(query).filter((k) => !keywords(title).includes(k) || keywords(query).length <= 2);

  if (/^(привіт|хай|вітаю|добр\S* (день|ранок|вечір)|hi|hello|hey)\b/.test(q)) return L.hi(title);
  if (/^(дякую|спасибі|thanks|thank you|thx)/.test(q)) return L.thanks();

  // Exact key term match beats everything.
  const term = d.keyTerms?.find((k) => {
    const kt = norm(k.term).trim();
    return kt.length > 1 && (q.includes(kt) || keywords(kt).every((w) => kws.includes(w)));
  });
  if (term) return `📖 **${term.term}** — ${term.definition}`;

  const specific = kws.length > 1 || (kws.length === 1 && !/^(прост|приклад|формул|факт|термін|exampl|formul|fact|term|simpl|life|житт)/.test(kws[0]));

  if (!specific || kws.length <= 2) {
    if (/прост|дитин|зрозуміл|simpl|easier|like i'?m|eli5/.test(q) && d.simpleExplanation)
      return `🧒 **${L.simple}:**\n\n${d.simpleExplanation}`;
    if (/формул|правил|закон|рівнян|formula|rule|law|equation/.test(q))
      return d.formulas?.length ? `📐 **${L.formulas}:**\n\n${d.formulas.join("\n\n")}` : `🧐 ${L.noFormulas}\n\n${(d.summary || d.theory || "").slice(0, 400)}`;
    if (/задач|розв'?яз|problem|solve|solution|exercise/.test(q) && d.problemSolving?.length)
      return `🧮 **${L.problems}:**\n\n${d.problemSolving.map((p, i) => `${i + 1}. ${p.problem}\n➡️ ${p.solution}`).join("\n\n")}`;
    if (/приклад|example|sample|instance/.test(q) && d.examples?.length) return `📝 **${L.examples}:**\n\n${list(d.examples)}`;
    if (/житт|побут|застосов|використ|навіщо|real life|everyday|used|use|apply|application/.test(q)) {
      const items = [...(d.examples || []), ...(d.facts || [])].slice(0, 5);
      if (items.length) return `🌍 **${L.life}:**\n\n${list(items)}`;
    }
    if (/факт|цікав|fact|interesting|trivia|fun/.test(q) && d.facts?.length) return `💡 **${L.facts}:**\n\n${list(d.facts)}`;
    if (/термін|поняття|визначен|словник|term|definition|glossary|vocab/.test(q) && d.keyTerms?.length)
      return `📖 **${L.terms}:**\n\n${d.keyTerms.map((k) => `• **${k.term}** — ${k.definition}`).join("\n")}`;
    if (/коротк|підсум|головн|суть|summary|short|main idea|tl;?dr|overview/.test(q))
      return `⚡ **${L.summary}:**\n\n${d.summary || d.introduction || (d.theory || "").slice(0, 400)}`;
  }

  if (kws.length) {
    const ranked = chunks(d).map((c) => ({ c, s: score(c, kws) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
    if (ranked.length) {
      const best = ranked[0].s;
      const seen = new Set<string>();
      const top = ranked.filter((x) => x.s >= best * 0.6 && !seen.has(x.c.text) && seen.add(x.c.text)).slice(0, 3);
      return `🔍 ${L.found}\n\n${top.map((x) => x.c.text).join("\n\n")}`;
    }
  }

  const gist = d.summary || d.simpleExplanation || d.introduction || (d.theory || "").slice(0, 400);
  return gist ? `${L.fb(title)}\n\n${gist}` : L.noData(title);
}
