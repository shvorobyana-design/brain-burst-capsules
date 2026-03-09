import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/capsules";

const CategoriesPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Усі <span className="gradient-text">предмети</span></h1>
        <p className="text-muted-foreground mb-8">Обери предмет і почни навчання</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link
                to={`/category/${cat.id}`}
                className="capsule-card flex items-center gap-4 py-6 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <div>
                  <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">{cat.name}</h2>
                  <p className="text-sm text-muted-foreground">{cat.count} капсул · {cat.sections.length} розділів</p>
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

export default CategoriesPage;
