import { Brain } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 mt-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-primary" />
        <span className="font-semibold text-foreground">BrainCapsule</span>
      </div>
      <p>© 2026 BrainCapsule — Ультрашвидке навчання</p>
    </div>
  </footer>
);

export default Footer;
