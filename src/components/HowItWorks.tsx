import { motion } from "framer-motion";
import { Search, BookOpen, CheckCircle } from "lucide-react";

const steps = [
  { icon: Search, title: "Обери тему", desc: "Знайди цікаву тему або натисни «Випадкова тема»", gradient: "from-primary to-primary/60" },
  { icon: BookOpen, title: "Читай капсулу", desc: "Зрозумій тему за 1-5 хвилин із простими поясненнями", gradient: "from-secondary to-secondary/60" },
  { icon: CheckCircle, title: "Перевір знання", desc: "Пройди міні-тест і закріпи вивчене", gradient: "from-accent to-accent/60" },
];

const HowItWorks = () => (
  <section className="py-20 bg-gradient-section-alt">
    <div className="container mx-auto px-4">
      <h2 className="section-heading text-center mb-4">
        Як це <span className="gradient-text">працює</span>
      </h2>
      <p className="text-center text-muted-foreground mb-12">Три простих кроки до знань</p>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-5 shadow-md`}>
              <s.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-xs font-mono text-muted-foreground mb-2 tracking-wider">КРОК 0{i + 1}</div>
            <h3 className="font-bold text-lg mb-2 text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
