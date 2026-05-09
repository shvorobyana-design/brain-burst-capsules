import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Filter, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CapsuleCard from "@/components/CapsuleCard";
import { categories, getCapsulesBySection } from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";

const difficulties = ["усі", "базовий", "середній", "поглиблений", "олімпіадний"] as const;

const difficultyOrder: Record<string, number> = {
  "усі рівні": 0,
  "базовий": 1,
  "середній": 2,
  "поглиблений": 3,
  "олімпіадний": 4,
};

const subjectGradient: Record<string, string> = {
  biology: "from-green-500 to-emerald-600",
  math: "from-blue-500 to-indigo-600",
  ukrainian: "from-yellow-500 to-amber-600",
  english: "from-red-500 to-rose-600",
  history: "from-orange-500 to-amber-700",
  chemistry: "from-purple-500 to-violet-600",
  physics: "from-cyan-500 to-blue-600",
};

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const [difficulty, setDifficulty] = useState<string>("усі");
  const { t, translateCategory, translateSection, translateDifficulty } = useLanguage();

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.categoryNotFound}</h1>
          <Link to="/" className="text-primary underline">{t.toHome}</Link>
        </div>
      </div>
    );
  }

  const gradient = subjectGradient[category.id] || "from-primary to-secondary";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className={`pt-24 pb-10 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> {t.allCategoriesLink}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl drop-shadow-lg">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{translateCategory(category.id)}</h1>
              <p className="text-white/80 text-sm mt-1">{category.count} {t.capsuleKnowledge} · {category.sections.length} {t.sections_word}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-24 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-4 -mt-5 relative z-10 mb-8 flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">{t.difficultyLabel}</span>
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {d === "усі" ? t.allLevels : translateDifficulty(d)}
              </button>
            ))}
          </div>

          {category.sections.map((section, si) => {
            let items = getCapsulesBySection(category.id, section.id);
            if (difficulty !== "усі") {
              items = items.filter(c => c.difficulty === difficulty);
            }
            items = [...items].sort(
              (a, b) => (difficultyOrder[a.difficulty] ?? 99) - (difficultyOrder[b.difficulty] ?? 99)
            );
            if (items.length === 0) return null;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: si * 0.05, duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <span className={`w-1.5 h-7 rounded-full bg-gradient-to-b ${gradient}`} />
                  {translateSection(section.id)}
                  <span className="text-xs font-normal text-muted-foreground ml-1">({items.length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((c, i) => (
                    <CapsuleCard key={c.id} capsule={c} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Final test CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <Link
              to={`/category/${category.id}/final-test`}
              className={`block rounded-2xl p-6 md:p-8 bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
            >
              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{t.finalTestCardTitle}</h3>
                    <p className="text-white/85 text-sm mt-1">{t.finalTestCardDesc}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
                  {t.finalTestOpen} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
