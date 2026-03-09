import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Filter, Clock, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CapsuleCard from "@/components/CapsuleCard";
import { categories, getCapsulesBySection } from "@/data/capsules";

const difficulties = ["усі", "базовий", "середній", "поглиблений", "олімпіадний"] as const;

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const [difficulty, setDifficulty] = useState<string>("усі");

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Категорію не знайдено</h1>
          <Link to="/" className="text-primary underline">На головну</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Усі категорії
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="text-sm text-muted-foreground">{category.count} капсул знань</p>
            </div>
          </div>

          {/* Filters */}
          <div className="glass p-4 mb-8 flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Складність:</span>
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  difficulty === d
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {d === "усі" ? "Усі рівні" : d}
              </button>
            ))}
          </div>

          {/* Sections */}
          {category.sections.map((section, si) => {
            let items = getCapsulesBySection(category.id, section.id);
            if (difficulty !== "усі") {
              items = items.filter(c => c.difficulty === difficulty);
            }
            if (items.length === 0) return null;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.05 }}
                className="mb-10"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-primary to-secondary" />
                  {section.name}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((c, i) => (
                    <CapsuleCard key={c.id} capsule={c} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
