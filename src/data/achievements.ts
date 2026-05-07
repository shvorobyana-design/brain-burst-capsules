import type { ProgressData } from "@/hooks/useProgress";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface AchievementContext {
  progress: ProgressData;
  totalCapsules: number;
  // extra runtime stats stored separately
  stats: AchStats;
}

export interface AchStats {
  streakDays: number;
  bestStreak: number;
  fastQuizzes: number; // quizzes finished < 30s
  perfectQuizzes: number; // 100% quizzes
  perfectFinals: number;
  wrongAnswers: number;
  totalAnswers: number;
  nightSessions: number; // sessions started 22:00-05:00
  daySessions: number;
  weekendSessions: number;
  capsulesOpenedToday: number;
  totalSessions: number;
  totalReadTimeMin: number;
  retakes: number;
  randomVisits: number;
  searchesUsed: number;
  aiQuestionsAsked: number;
  languageSwitches: number;
  finalTestsPassed: number;
  capsulesPerSubject: Record<string, number>;
  finalsPerfect: Record<string, boolean>;
  // secret triggers
  konami: boolean;
  clickedLogo: number;
  visitedAt3am: boolean;
}

export interface Achievement {
  id: string;
  rarity: Rarity;
  emoji: string;
  title: { ua: string; en: string };
  desc: { ua: string; en: string };
  xp: number;
  secret?: boolean;
  /** progress current value */
  progress: (c: AchievementContext) => number;
  /** target value */
  target: number;
  /** true if unlocked */
  unlocked?: (c: AchievementContext) => boolean;
}

const u = (cur: number, tgt: number) => cur >= tgt;

export const RARITY_META: Record<Rarity, { ua: string; en: string; gradient: string; ring: string; glow: string; xpMul: number }> = {
  common:    { ua: "Звичайна",   en: "Common",    gradient: "from-slate-400 to-slate-600",       ring: "ring-slate-400/40",   glow: "shadow-slate-500/30",   xpMul: 1 },
  rare:      { ua: "Рідкісна",   en: "Rare",      gradient: "from-sky-400 to-blue-600",          ring: "ring-sky-400/50",     glow: "shadow-sky-500/40",     xpMul: 2 },
  epic:      { ua: "Епічна",     en: "Epic",      gradient: "from-fuchsia-500 to-purple-700",    ring: "ring-fuchsia-400/60", glow: "shadow-fuchsia-500/50", xpMul: 4 },
  legendary: { ua: "Легендарна", en: "Legendary", gradient: "from-amber-400 via-pink-500 to-violet-600", ring: "ring-amber-400/70", glow: "shadow-amber-400/60", xpMul: 8 },
};

function mk(
  id: string,
  rarity: Rarity,
  emoji: string,
  ua: string, en: string,
  uaDesc: string, enDesc: string,
  target: number,
  prog: (c: AchievementContext) => number,
  xp = 10,
  secret = false,
): Achievement {
  return {
    id, rarity, emoji,
    title: { ua, en },
    desc: { ua: uaDesc, en: enDesc },
    xp: xp * RARITY_META[rarity].xpMul,
    progress: prog,
    target,
    secret,
    unlocked: (c) => prog(c) >= target,
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  // === Capsule reading — Common/Rare/Epic/Legendary ===
  mk("first-capsule","common","🧠","Brain Awakening","Brain Awakening","Прочитай свою першу капсулу","Read your very first capsule",1,(c)=>c.progress.readCapsules.length),
  mk("five-capsules","common","📚","Bookworm Jr.","Bookworm Jr.","Прочитай 5 капсул","Read 5 capsules",5,(c)=>c.progress.readCapsules.length),
  mk("ten-capsules","common","🎓","Junior Scholar","Junior Scholar","Прочитай 10 капсул","Read 10 capsules",10,(c)=>c.progress.readCapsules.length),
  mk("twenty-five","rare","🤓","Certified Nerd","Certified Nerd","Прочитай 25 капсул","Read 25 capsules",25,(c)=>c.progress.readCapsules.length),
  mk("fifty","rare","📖","Knowledge Hunter","Knowledge Hunter","Прочитай 50 капсул","Read 50 capsules",50,(c)=>c.progress.readCapsules.length),
  mk("hundred","epic","🧙","Capsule Wizard","Capsule Wizard","Прочитай 100 капсул","Read 100 capsules",100,(c)=>c.progress.readCapsules.length,15),
  mk("all-capsules","legendary","👑","Final Boss Of Homework","Final Boss Of Homework","Прочитай всі капсули","Read every capsule on the site",1,(c)=>c.progress.readCapsules.length>=c.totalCapsules?1:0,25),

  // === Per-subject mastery ===
  mk("bio-master","rare","🧬","Bio Mastermind","Bio Mastermind","Прочитай 10 капсул з біології","Read 10 biology capsules",10,(c)=>c.stats.capsulesPerSubject.biology||0),
  mk("math-master","rare","➗","Math Magician","Math Magician","Прочитай 10 капсул з математики","Read 10 math capsules",10,(c)=>c.stats.capsulesPerSubject.math||0),
  mk("phys-master","rare","⚛️","Physics Phenom","Physics Phenom","Прочитай 10 капсул з фізики","Read 10 physics capsules",10,(c)=>c.stats.capsulesPerSubject.physics||0),
  mk("chem-master","rare","🧪","Chem Cook","Chem Cook","Прочитай 10 капсул з хімії","Read 10 chemistry capsules",10,(c)=>c.stats.capsulesPerSubject.chemistry||0),
  mk("hist-master","rare","🏺","Time Traveler","Time Traveler","Прочитай 10 капсул з історії","Read 10 history capsules",10,(c)=>c.stats.capsulesPerSubject.history||0),
  mk("ua-master","rare","✍️","Word Smith","Word Smith","Прочитай 10 капсул з української","Read 10 Ukrainian capsules",10,(c)=>c.stats.capsulesPerSubject.ukrainian||0),
  mk("en-master","rare","🇬🇧","English Pro","English Pro","Прочитай 10 капсул з англійської","Read 10 English capsules",10,(c)=>c.stats.capsulesPerSubject.english||0),

  // === Quizzes / Tests ===
  mk("first-quiz","common","✅","First Try","First Try","Пройди свій перший міні-тест","Complete your first mini-quiz",1,(c)=>Object.keys(c.progress.quizResults).length),
  mk("ten-quizzes","common","📝","Quiz Cadet","Quiz Cadet","Пройди 10 міні-тестів","Complete 10 mini-quizzes",10,(c)=>Object.keys(c.progress.quizResults).length),
  mk("perfect-1","rare","💯","Flawless","Flawless","Отримай 100% у тесті","Score 100% on a quiz",1,(c)=>c.stats.perfectQuizzes),
  mk("perfect-10","epic","🎯","Sniper Brain","Sniper Brain","10 ідеальних тестів","Score 100% on 10 quizzes",10,(c)=>c.stats.perfectQuizzes),
  mk("perfect-25","legendary","🏅","Galaxy Brain","Galaxy Brain","25 ідеальних тестів","Score 100% on 25 quizzes",25,(c)=>c.stats.perfectQuizzes,20),
  mk("first-final","rare","🎓","Subject Slayer","Subject Slayer","Пройди перший підсумковий тест","Complete your first final test",1,(c)=>c.stats.finalTestsPassed),
  mk("all-finals","legendary","🏆","Septuple Threat","Septuple Threat","Пройди фінальні тести з усіх 7 предметів","Pass final tests in all 7 subjects",7,(c)=>c.stats.finalTestsPassed,30),
  mk("perfect-final","epic","🌟","Final Form","Final Form","100% у підсумковому тесті","Score 100% on a final test",1,(c)=>c.stats.perfectFinals),

  // === Speed ===
  mk("speed-1","rare","⚡","Speedrunner","Speedrunner","Пройди тест менше ніж за 30с","Finish a quiz in under 30s",1,(c)=>c.stats.fastQuizzes),
  mk("speed-10","epic","🏎️","Sonic Brain","Sonic Brain","10 швидких тестів","Finish 10 quizzes under 30s",10,(c)=>c.stats.fastQuizzes),
  mk("too-smart","legendary","🧠","Too Smart To Sleep","Too Smart To Sleep","20 швидких ідеальних тестів","20 fast perfect quizzes",20,(c)=>Math.min(c.stats.fastQuizzes,c.stats.perfectQuizzes),20),

  // === Mistakes ===
  mk("first-mistake","common","🙃","Oops!","Oops!","Дай свою першу неправильну відповідь","Make your first wrong answer",1,(c)=>c.stats.wrongAnswers),
  mk("learn-from-fail","rare","🔁","Try Again Champ","Try Again Champ","Спробуй той самий тест ще раз","Retake the same quiz",1,(c)=>c.stats.retakes),
  mk("brainrot-mode","epic","🤡","One Braincell Left","One Braincell Left","50 неправильних відповідей","Get 50 wrong answers",50,(c)=>c.stats.wrongAnswers),
  mk("hundred-wrongs","legendary","💀","Confidently Wrong","Confidently Wrong","100 неправильних відповідей","100 wrong answers",100,(c)=>c.stats.wrongAnswers,15),

  // === Streaks ===
  mk("streak-3","common","🔥","On Fire","On Fire","3 дні поспіль","3-day streak",3,(c)=>c.stats.bestStreak),
  mk("streak-7","rare","📅","Week Warrior","Week Warrior","7 днів поспіль","7-day streak",7,(c)=>c.stats.bestStreak),
  mk("streak-30","epic","🌋","Unstoppable","Unstoppable","30 днів поспіль","30-day streak",30,(c)=>c.stats.bestStreak),
  mk("streak-100","legendary","🐉","Capsule Addict","Capsule Addict","100 днів поспіль","100-day streak",100,(c)=>c.stats.bestStreak,30),

  // === Time of day ===
  mk("night-owl","rare","🦉","Night Owl","Night Owl","Вчись після опівночі","Study after midnight",1,(c)=>c.stats.nightSessions),
  mk("night-grinder","epic","🌙","Lunar Grinder","Lunar Grinder","10 нічних сесій","10 night sessions",10,(c)=>c.stats.nightSessions),
  mk("early-bird","rare","🐦","Early Bird","Early Bird","Вчись о 5-7 ранку","Study at 5-7 AM",1,(c)=>c.stats.daySessions),
  mk("weekend-warrior","rare","🏖️","Weekend Warrior","Weekend Warrior","Вчись на вихідних","Study on the weekend",1,(c)=>c.stats.weekendSessions),
  mk("touch-grass","epic","🌱","Touch Grass","Touch Grass","20 сесій за тиждень — ВИЙДИ НА ВУЛИЦЮ","20 sessions in a week — go outside!",20,(c)=>c.stats.totalSessions),

  // === Engagement / random ===
  mk("random-1","common","🎲","Lucky Roll","Lucky Roll","Натисни «Випадкова тема»","Try Random Topic",1,(c)=>c.stats.randomVisits),
  mk("random-25","rare","🎰","Roulette Brain","Roulette Brain","25 випадкових тем","25 random topics",25,(c)=>c.stats.randomVisits),
  mk("searcher","common","🔎","Curious Cat","Curious Cat","Скористайся пошуком","Use the search",1,(c)=>c.stats.searchesUsed),
  mk("ai-asker","common","🤖","Ask The Bot","Ask The Bot","Постав питання AI помічнику","Ask the AI assistant",1,(c)=>c.stats.aiQuestionsAsked),
  mk("ai-spammer","rare","💬","AI BFF","AI BFF","Постав 25 питань AI","Ask the AI 25 times",25,(c)=>c.stats.aiQuestionsAsked),
  mk("polyglot","rare","🌐","Polyglot Brain","Polyglot Brain","Перемкни мову 5 разів","Switch language 5 times",5,(c)=>c.stats.languageSwitches),

  // === XP / Levels ===
  mk("xp-100","common","🪙","XP Collector","XP Collector","Набери 100 XP","Earn 100 XP",100,(c)=>computeXP(c)),
  mk("xp-500","rare","💰","XP Hoarder","XP Hoarder","Набери 500 XP","Earn 500 XP",500,(c)=>computeXP(c)),
  mk("xp-2000","epic","🪩","Sigma Student","Sigma Student","Набери 2000 XP","Earn 2000 XP",2000,(c)=>computeXP(c)),
  mk("xp-5000","legendary","🌌","Big Brain Energy","Big Brain Energy","Набери 5000 XP","Earn 5000 XP",5000,(c)=>computeXP(c),25),

  // === Funny / Brainrot ===
  mk("rizz","rare","😎","W Rizz Student","W Rizz Student","Пройди 5 тестів підряд без помилок","5 quizzes in a row no mistakes",5,(c)=>c.stats.perfectQuizzes),
  mk("ohio","epic","🌽","Only In Ohio","Only In Ohio","Прочитай капсулу о 03:00","Read a capsule at 3 AM",1,(c)=>c.stats.visitedAt3am?1:0),
  mk("skibidi","epic","🚽","Skibidi Scholar","Skibidi Scholar","50 капсул і 20 тестів","50 capsules + 20 quizzes",1,(c)=>(c.progress.readCapsules.length>=50 && Object.keys(c.progress.quizResults).length>=20)?1:0),
  mk("gyatt","rare","🍑","Gyatt Damn Smart","Gyatt Damn Smart","Ідеальний фінальний тест","Perfect final test",1,(c)=>c.stats.perfectFinals),
  mk("npc","common","🧍","NPC Mode","NPC Mode","Відкрий 5 капсул за день","Open 5 capsules in one day",5,(c)=>c.stats.capsulesOpenedToday),
  mk("goofy","common","🤪","Goofy Goober","Goofy Goober","10 неправильних відповідей","10 wrong answers",10,(c)=>c.stats.wrongAnswers),
  mk("based","rare","🗿","Based Department","Based Department","Пройди тест без жодної помилки після 3 фейлів","Perfect quiz after 3 fails",1,(c)=>(c.stats.perfectQuizzes>0 && c.stats.wrongAnswers>=3)?1:0),

  // === Motivational ===
  mk("comeback","rare","💪","Comeback Kid","Comeback Kid","Поверни streak після перерви","Restart a streak",1,(c)=>c.stats.bestStreak>=2?1:0),
  mk("dedicated","epic","🛡️","Dedicated Mind","Dedicated Mind","60 хвилин навчання","60 minutes of learning",60,(c)=>c.stats.totalReadTimeMin),
  mk("marathon","legendary","🏃","Marathon Mind","Marathon Mind","300 хвилин навчання","300 minutes of learning",300,(c)=>c.stats.totalReadTimeMin,20),
  mk("never-give-up","rare","🚀","Never Give Up","Never Give Up","Пройди той самий тест 3 рази","Retake same quiz 3x",3,(c)=>c.stats.retakes),

  // === Secret ===
  mk("konami","legendary","🕹️","The Code Knower","The Code Knower","???","Enter the Konami code",1,(c)=>c.stats.konami?1:0,25,true),
  mk("logo-clicker","epic","🥚","Easter Egger","Easter Egger","???","Click the logo 10 times",10,(c)=>c.stats.clickedLogo,10,true),
  mk("hidden-scholar","epic","🔮","Hidden Scholar","Hidden Scholar","???","Read 7 capsules in one day",7,(c)=>c.stats.capsulesOpenedToday,15,true),
  mk("ghost","legendary","👻","Ghost In The Shell","Ghost In The Shell","???","Visit at 3 AM and finish a quiz",1,(c)=>(c.stats.visitedAt3am && c.stats.perfectQuizzes>0)?1:0,25,true),

  // === Misc ===
  mk("explorer","common","🧭","Explorer","Explorer","Відвідай усі 7 предметів","Visit all 7 subjects",7,(c)=>Object.keys(c.stats.capsulesPerSubject).filter(k=>(c.stats.capsulesPerSubject[k]||0)>0).length),
  mk("collector","epic","🗂️","Collector","Collector","Прочитай по 5 капсул з кожного предмета","Read 5 capsules in every subject",7,(c)=>Object.keys(c.stats.capsulesPerSubject).filter(k=>(c.stats.capsulesPerSubject[k]||0)>=5).length),
  mk("perfectionist","legendary","💎","Perfectionist","Perfectionist","Усі фінальні тести на 100%","Perfect score on every final test",7,(c)=>Object.values(c.stats.finalsPerfect||{}).filter(Boolean).length,30),
];

export function computeXP(c: AchievementContext): number {
  let xp = 0;
  xp += c.progress.readCapsules.length * 5;
  xp += Object.values(c.progress.quizResults).reduce((s,r)=>s + Math.round((r.score/r.total)*15),0);
  xp += Object.values(c.progress.finalTests).reduce((s,r)=>s + Math.round((r.score/r.total)*50),0);
  xp += c.stats.perfectQuizzes * 10;
  xp += c.stats.perfectFinals * 50;
  xp += c.stats.bestStreak * 5;
  return xp;
}

export function levelFromXP(xp: number) {
  // level n requires 100*n XP cumulatively
  const level = Math.floor((-1 + Math.sqrt(1 + 8 * (xp / 100))) / 2) + 1;
  const prevTotal = ((level - 1) * level / 2) * 100;
  const nextTotal = (level * (level + 1) / 2) * 100;
  return {
    level,
    intoLevel: xp - prevTotal,
    levelSpan: nextTotal - prevTotal,
    progress: Math.max(0, Math.min(1, (xp - prevTotal) / (nextTotal - prevTotal))),
    nextAt: nextTotal,
  };
}

export function evaluateAchievements(c: AchievementContext): Set<string> {
  const out = new Set<string>();
  for (const a of ACHIEVEMENTS) {
    if (a.unlocked!(c)) out.add(a.id);
  }
  return out;
}