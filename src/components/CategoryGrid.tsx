import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";

const subjectCardClass: Record<string, string> = {
  biology: "subject-card-biology",
  math: "subject-card-math",
  ukrainian: "subject-card-ukrainian",
  english: "subject-card-english",
  history: "subject-card-history",
  chemistry: "subject-card-chemistry",
  physics: "subject-card-physics",
};

const CategoryGrid = () => {
  const { t, translateCategory } = useLanguage();

  return (
    <section className="py-16 bg-gradient-section">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-3">
          {t.categoriesOfKnowledge} <span className="gradient-text">{t.categoriesOfKnowledgeHighlight}</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10">{t.chooseSubject}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                to={`/category/${cat.id}`}
                className={`block rounded-xl border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer ${subjectCardClass[cat.id] || ""}`}
              >
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <span className="font-semibold text-sm text-foreground block">{translateCategory(cat.id)}</span>
                <span className="text-xs text-muted-foreground mt-1 block">{cat.count} {t.capsules_word}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
