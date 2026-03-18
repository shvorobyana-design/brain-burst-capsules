import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import CapsuleCard from "@/components/CapsuleCard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getPopularCapsules, getNewCapsules } from "@/data/capsules";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const popular = getPopularCapsules();
  const newest = getNewCapsules();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-heading mb-2">
            🔥 {t.popularCapsules} <span className="gradient-text">{t.statCapsules}</span>
          </h2>
          <p className="text-muted-foreground mb-8">{t.popularDesc}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popular.map((c, i) => (
              <CapsuleCard key={c.id} capsule={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />

      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="section-heading mb-2">
            ✨ {t.newCapsules} <span className="gradient-text">{t.statCapsules}</span>
          </h2>
          <p className="text-muted-foreground mb-8">{t.newDesc}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newest.map((c, i) => (
              <CapsuleCard key={c.id} capsule={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
