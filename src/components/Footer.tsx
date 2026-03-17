import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-12 mt-10 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">BrainCapsule</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/categories" className="hover:text-primary transition-colors">{t.categories}</Link>
            <Link to="/progress" className="hover:text-primary transition-colors">{t.progress}</Link>
            <Link to="/random" className="hover:text-primary transition-colors">{t.randomTopic}</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 BrainCapsule. {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
