import { Link } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-glass-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-purple">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Brain<span className="gradient-text">Capsule</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Головна</Link>
          <Link to="/categories" className="hover:text-foreground transition-colors">Категорії</Link>
          <Link to="/progress" className="hover:text-foreground transition-colors">Прогрес</Link>
        </div>
        <Link
          to="/random"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-sm font-medium hover:from-primary/30 hover:to-secondary/30 transition-all"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline">Випадкова тема</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
