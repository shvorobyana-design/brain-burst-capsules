import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Search } from "lucide-react";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Brain<span className="gradient-text">Capsule</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <Link to="/categories" className="hover:text-primary transition-colors">Категорії</Link>
          <Link to="/progress" className="hover:text-primary transition-colors">Прогрес</Link>
        </div>
        <Link
          to="/random"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Випадкова тема</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
