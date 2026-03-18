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

function findAnswer(query: string, capsuleData: AIChatButtonProps["capsuleData"], topicTitle: string, t: ReturnType<typeof useLanguage>["t"]): string {
  if (!capsuleData) return `${t.noDataAbout} "${topicTitle}".`;

  const q = query.toLowerCase();
  const { theory, simpleExplanation, keyTerms, formulas, examples, facts } = capsuleData;

  if (q.includes("прост") || q.includes("simple") || q.includes("explain")) {
    if (simpleExplanation) return `🧒 **${t.simpleExplanation}:**\n\n${simpleExplanation}`;
  }

  if (q.includes("формул") || q.includes("formula") || q.includes("правил")) {
    if (formulas && formulas.length > 0) return `📐 **${t.formulas}:**\n\n${formulas.join("\n\n")}`;
    return `${t.noFormulasButTheory}\n\n${theory?.slice(0, 300) || ""}...`;
  }

  if (keyTerms && keyTerms.length > 0) {
    const matchedTerm = keyTerms.find(kt => q.includes(kt.term.toLowerCase()));
    if (matchedTerm) return `📖 **${matchedTerm.term}** — ${matchedTerm.definition}`;
  }

  if (q.includes("приклад") || q.includes("example")) {
    if (examples && examples.length > 0) return `📝 **${t.examples}:**\n\n${examples.map((e, i) => `${i + 1}. ${e}`).join("\n")}`;
  }

  if (q.includes("факт") || q.includes("fact") || q.includes("цікав")) {
    if (facts && facts.length > 0) return `💡 **${t.funFactsLabel}**\n\n${facts.map((f, i) => `${i + 1}. ${f}`).join("\n")}`;
  }

  if (q.includes("термін") || q.includes("term") || q.includes("визнач") || q.includes("defin")) {
    if (keyTerms && keyTerms.length > 0) return `📖 **${t.keyTermsLabel}**\n\n${keyTerms.map(kt => `• **${kt.term}** — ${kt.definition}`).join("\n")}`;
  }

  if (theory) {
    const sentences = theory.split(/[.!?]\s+/);
    const relevant = sentences.filter(s => {
      const words = q.split(/\s+/).filter(w => w.length > 2);
      return words.some(w => s.toLowerCase().includes(w));
    });
    if (relevant.length > 0) {
      return `📚 ${t.foundForQuery}\n\n${relevant.slice(0, 4).join(". ")}.`;
    }
  }

  if (theory) return `📚 **${t.aboutTopic} "${topicTitle}":**\n\n${theory.slice(0, 500)}...`;
  return t.tryAskingHint;
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

  const suggestedQuestions = [
    `${t.explainSimpler2} "${topicTitle}"`,
    `${t.moreExamples} "${topicTitle}"`,
    t.realLifeUse,
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const answer = findAnswer(text, capsuleData, topicTitle, t);
      setMessages(prev => [...prev, { role: "ai", text: answer }]);
      setLoading(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:shadow-xl hover:shadow-primary/40 transition-shadow"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.aiAssistant}</div>
                  <div className="text-[10px] text-muted-foreground truncate max-w-[200px]">{topicTitle}</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {t.askAnything} «{topicTitle}» 🧠
                  </p>
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="w-full text-left text-sm px-3 py-2.5 rounded-xl bg-muted/50 text-foreground hover:bg-muted transition-colors border border-border/50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-foreground border border-border/50"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 px-4 py-2 rounded-xl border border-border/50">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-3">
              <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={t.askQuestion}
                  className="flex-1 bg-muted/30 rounded-xl px-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground border border-border/50 focus:border-primary/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors shrink-0"
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
