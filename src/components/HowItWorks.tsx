import { motion } from "framer-motion";
import { Search, BookOpen, CheckCircle } from "lucide-react";

const steps = [
  { icon: Search, title: "Обери тему", desc: "Знайди цікаву тему або натисни «Випадкова тема»", color: "text-primary" },
  { icon: BookOpen, title: "Читай капсулу", desc: "Зрозумій тему за 1-5 хвилин із простими поясненнями", color: "text-secondary" },
  { icon: CheckCircle, title: "Перевір знання", desc: "Пройди міні-тест і закріпи вивчене", color: "text-accent" },
];

const HowItWorks = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="section-heading text-center mb-12">
        Як це <span className="gradient-text">працює</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass p-6 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
              <s.icon className={`w-7 h-7 ${s.color}`} />
            </div>
            <div className="text-xs font-mono text-muted-foreground mb-2">0{i + 1}</div>
            <h3 className="font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
