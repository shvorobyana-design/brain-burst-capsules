import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/capsules";

const CategoryGrid = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-10">
          Категорії <span className="gradient-text">знань</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/category/${cat.id}`}
                className="capsule-card flex flex-col items-center text-center gap-2 py-6"
              >
                <span className="text-3xl mb-1">{cat.icon}</span>
                <span className="font-semibold text-sm">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count} капсул</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
