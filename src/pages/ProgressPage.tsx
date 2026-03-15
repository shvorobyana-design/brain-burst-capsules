import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, Trophy } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Прочитано капсул", value: "0", gradient: "from-primary to-primary/60" },
  { icon: CheckCircle, label: "Тестів пройдено", value: "0", gradient: "from-secondary to-secondary/60" },
  { icon: Trophy, label: "Рівень знань", value: "Новачок", gradient: "from-accent to-accent/60" },
];

const ProgressPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Твій <span className="gradient-text">прогрес</span></h1>
        <div className="grid gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-md`}>
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          Почни читати капсули, щоб відстежувати прогрес! 🚀
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default ProgressPage;
