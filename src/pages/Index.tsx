import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import CapsuleCard from "@/components/CapsuleCard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getPopularCapsules, getNewCapsules } from "@/data/capsules";

const Index = () => {
  const popular = getPopularCapsules();
  const newest = getNewCapsules();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Popular */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-heading mb-8">
            🔥 Популярні <span className="gradient-text">капсули</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popular.map((c, i) => (
              <CapsuleCard key={c.id} capsule={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />

      {/* New */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-heading mb-8">
            ✨ Нові <span className="gradient-text">капсули</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newest.map((c, i) => (
              <CapsuleCard key={c.id} capsule={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
