import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AIChatButtonProps {
  topicTitle: string;
  topicContext: string;
  capsuleData?: {
    theory?: string;
    simpleExplanation?: string;
    keyTerms?: { term: string; definition: string }[];
    formulas?: string[];
    examples?: string[];
    facts?: string[];
  };
}

// Покращений двигун "картонного ШІ"
function findAnswer(query: string, data: AIChatButtonProps["capsuleData"], title: string, t: any): string {
  if (!data) return `❌ ${t.noDataAbout || "Немає даних про"} "${title}".`;

  const q = query.toLowerCase().trim();
  const { theory, simpleExplanation, keyTerms, formulas, examples, facts } = data;

  // 1. Обробка "Small Talk" (Привітання та подяка)
  if (/привіт|хай|вітаю|добрий/i.test(q)) {
    return `👋 Привіт! Я твій асистент з теми **"${title}"**. Можу пояснити теорію простіше, навести приклади або показати цікаві факти. Що тебе цікавить?`;
  }
  if (/дякую|спасибі|клас|супер|дяк/i.test(q)) {
    return `😊 Завжди радий допомогти! Якщо застрягнеш на чомусь іншому в темі **"${title}"** — пиши.`;
  }

  // 2. Специфічні запити через Регулярні Вирази
  if (/прост|ясно|зрозуміл|explain|simple/i.test(q)) {
    if (simpleExplanation) return `🧒 **${t.simpleExplanation || "Просте пояснення"}:**\n\n${simpleExplanation}`;
  }

  if (/формул|правил|закон|formula|rule/i.test(q)) {
    if (formulas && formulas.length > 0) return `📐 **${t.formulas || "Формули та правила"}:**\n\n${formulas.join("\n\n")}`;
    if (theory) return `🧐 Прямих формул немає, але ось головна суть:\n\n${theory.slice(0, 300)}...`;
  }

  if (/приклад|example|кейс|case/i.test(q)) {
    if (examples && examples.length > 0) return `📝 **${t.examples || "Приклади"}:**\n\n${examples.map((e, i) => `${i + 1}. ${e}`).join("\n")}`;
  }

  if (/факт|цікав|fact|interesting/i.test(q)) {
    if (facts && facts.length > 0) return `💡 **${t.funFactsLabel || "Цікаві факти"}:**\n\n${facts.map((f, i) => `${i + 1}. ${f}`).join("\n")}`;
  }

  if (/термін|визнач|що таке|definition|term/i.test(q)) {
    // Пошук конкретного терміну в запиті
    const matched = keyTerms?.find(kt => q.includes(kt.term.toLowerCase()));
    if (matched) return `📖 **${matched.term}** — ${matched.definition}`;
    if (keyTerms && keyTerms.length > 0) return `📖 **${t.keyTermsLabel || "Ключові терміни"}:**\n\n${keyTerms.map(kt => `• **${kt.term}** — ${kt.definition}`).join("\n")}`;
  }

  // 3. Евристичний пошук по тексту теорії (пошук релевантних речень)
  if (theory) {
    const sentences = theory.split(/[.!?]\s+/);
    const words = q.split(/\s+/).filter(w => w.length > 3);
    const relevant = sentences.filter(s => 
      words.some(word => s.toLowerCase().includes(word.substring(0, word.length - 1)))
    );

    if (relevant.length > 0) {
      return `🔍 Ось що я знайшов за твоїм запитом:\n\n${relevant.slice(0, 3).join(". ")}.`;
    }
  }

  // 4. Варіативні відкати (щоб не повторювався)
  const fallbacks = [
    `🤔 Не впевнений, що зрозумів. Спробуй запитати про **приклади**, **просте пояснення** або **факти** по темі "${title}".`,
    `📚 Тема "${title}" досить обширна. Можливо, тобі варто поглянути на ключові терміни? Просто напиши "терміни".`,
    `🧐 Я орієнтуюся лише в межах цієї капсули. Запитай щось конкретне про "${title}", і я спробую знайти це в теорії.`
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

const AIChatButton = ({ topicTitle, topicContext, capsuleData }: AIChatButtonProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { role: "user" as const, text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Імітація "думки" бота
    setTimeout(() => {
      const answer = findAnswer(text, capsuleData, topicTitle, t);
      setMessages(prev => [...prev, { role: "ai", text: answer }]);
      setLoading(false);
    }, 600 + Math.random() * 600);
  };

  const suggestedQuestions = [
    `${t.explainSimpler2 || "Поясни простіше"} "${topicTitle}"`,
    `${t.moreExamples || "Дай приклади для"} "${topicTitle}"`,
    t.realLifeUse || "Де це застосовується?",
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:shadow-xl transition-all"
      >
        <Bot className="w-7 h-7" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground leading-none mb-1">{t.aiAssistant || "AI Асистент"}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{topicTitle}</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] scrollbar-thin scrollbar-thumb-border">
              {messages.length === 0 && (
                <div className="py-4 px-2">
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {t.askAnything || "Запитай мене що завгодно про"} «{topicTitle}» 🧠
                  </p>
                  <div className="grid gap-2">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-xs px-4 py-3 rounded-xl bg-muted/40 text-foreground hover:bg-muted hover:border-primary/30 transition-all border border-transparent shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted/60 text-foreground border border-border/50 rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted/40 px-4 py-3 rounded-2xl rounded-tl-none border border-border/50">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
              <form 
                onSubmit={e => { e.preventDefault(); sendMessage(input); }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={t.askQuestion || "Твоє питання..."}
                  className="flex-1 bg-muted/50 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-primary/30 focus:bg-background transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 shadow-md shadow-primary/20 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatButton;