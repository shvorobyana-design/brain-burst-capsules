import { Link } from "react-router-dom";
import { Clock, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import type { Capsule } from "@/data/capsules";

const difficultyColor: Record<string, string> = {
  "базовий": "text-accent",
  "середній": "text-secondary",
  "поглиблений": "text-primary",
  "олімпіадний": "text-destructive",
};

const CapsuleCard = ({ capsule, index = 0 }: { capsule: Capsule; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/capsule/${capsule.id}`} className="block capsule-card group">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{capsule.icon}</span>
          {capsule.isNew && (
            <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-semibold uppercase tracking-wider">
              Нове
            </span>
          )}
        </div>
        <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {capsule.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {capsule.shortDescription}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{capsule.readTime} хв</span>
          </div>
          <div className={`flex items-center gap-1 ${difficultyColor[capsule.difficulty]}`}>
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{capsule.difficulty}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CapsuleCard;
