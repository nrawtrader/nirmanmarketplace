import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FeaturedProducts = () => {
  const featured = [products[0], products[4], products[7]]; // One from each category
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Featured</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Top Products</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
            <Link to="/products">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={visible ? "animate-scroll-reveal" : "opacity-0"}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link to="/products">View All Products <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
