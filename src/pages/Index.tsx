import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollStorySection from "@/components/ScrollStorySection";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import KnowledgeSection from "@/components/KnowledgeSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ScrollStorySection />
        <FeaturesSection />
        <FeaturedProducts />
        <KnowledgeSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
