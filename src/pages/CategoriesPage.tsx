import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const CategoriesPage = () => {
  const { t, translateCategory } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{t.allSubjects} <span className="gradient-text">{t.allSubjectsHighlight}</span></h1>
          <p className="text-muted-foreground mb-8">{t.chooseSubject}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={`/category/${cat.id}`}
                  className={`flex items-center gap-4 py-6 px-5 rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 group ${subjectCardClass[cat.id] || ""}`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{translateCategory(cat.id)}</h2>
                    <p className="text-sm text-muted-foreground">{cat.count} {t.capsules_word} · {cat.sections.length} {t.sections_word}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
