import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CapsuleCard from "@/components/CapsuleCard";
import { categories, getCapsulesByCategory } from "@/data/capsules";

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const items = getCapsulesByCategory(id || "");

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Категорію не знайдено</h1>
          <Link to="/" className="text-primary underline">На головну</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Назад
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold">{category.name}</h1>
          </div>
          {items.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((c, i) => <CapsuleCard key={c.id} capsule={c} index={i} />)}
            </div>
          ) : (
            <div className="glass p-12 text-center">
              <p className="text-muted-foreground">Капсули для цієї категорії скоро з'являться!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
