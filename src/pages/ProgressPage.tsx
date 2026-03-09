import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, Trophy } from "lucide-react";

const ProgressPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Твій <span className="gradient-text">прогрес</span></h1>
        <div className="grid gap-4">
          <div className="glass p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Прочитано капсул</div>
            </div>
          </div>
          <div className="glass p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Тестів пройдено</div>
            </div>
          </div>
          <div className="glass p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold">Новачок</div>
              <div className="text-sm text-muted-foreground">Рівень знань</div>
            </div>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          Почни читати капсули, щоб відстежувати прогрес!
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default ProgressPage;
