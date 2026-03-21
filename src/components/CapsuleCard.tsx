import { Link } from "react-router-dom";
import { Clock, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import type { Capsule } from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";

const difficultyColor: Record<string, string> = {
  "базовий": "text-accent",
  "середній": "text-secondary",
  "поглиблений": "text-primary",
  "олімпіадний": "text-destructive",
};

const difficultyBg: Record<string, string> = {
  "базовий": "bg-accent/10",
  "середній": "bg-secondary/10",
  "поглиблений": "bg-primary/10",
  "олімпіадний": "bg-destructive/10",
};

const CapsuleCard = ({ capsule, index = 0 }: { capsule: Capsule; index?: number }) => {
  const { t, translateDifficulty } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
    >
      <Link to={`/capsule/${capsule.id}`} className="block bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">
            {capsule.icon}
          </div>
          {capsule.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
              {t.newBadge}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {capsule.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {capsule.shortDescription}
        </p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{capsule.readTime} {t.minShort}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${difficultyBg[capsule.difficulty]} ${difficultyColor[capsule.difficulty]} font-medium`}>
            <BarChart3 className="w-3 h-3" />
            <span>{translateDifficulty(capsule.difficulty)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CapsuleCard;
