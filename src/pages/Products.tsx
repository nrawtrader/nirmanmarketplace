import { useState, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, brands, ProductCategory } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, HardHat, Construction, Bath, Paintbrush, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

const categoryMeta: Record<ProductCategory, { label: string; icon: React.ReactNode; description: string }> = {
  cement: { label: "Cement", icon: <HardHat className="w-6 h-6" />, description: "OPC & PPC grades from trusted brands" },
  steel: { label: "Steel TMT Bars", icon: <Construction className="w-6 h-6" />, description: "TMT bars & reinforcement steel" },
  sanitary: { label: "Sanitary & Plumbing", icon: <Bath className="w-6 h-6" />, description: "Pipes, fittings & bathroom essentials" },
  paint: { label: "Paints & Primers", icon: <Paintbrush className="w-6 h-6" />, description: "Interior & exterior paints from top brands" },
  aggregate: { label: "Sand, Aggregates & Bricks", icon: <Mountain className="w-6 h-6" />, description: "M-Sand, blue metal, fly ash bricks" },
};

const sectionOrder: ProductCategory[] = ["cement", "steel", "sanitary", "paint", "aggregate"];

const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      return true;
    });
  }, [search, selectedBrands, activeCategory]);

  const allBrands = useMemo(() => Object.values(brands).flat(), []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Construction Materials
            </h1>
            <p className="text-muted-foreground">
              Browse trusted brands of cement, steel, and sanitary products for your construction needs.
            </p>
          </div>

          {/* Category Quick Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              All Products
            </button>
            {sectionOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center gap-2 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
              >
                <span className="scale-75">{categoryMeta[cat].icon}</span>
                {categoryMeta[cat].label}
              </button>
            ))}
          </div>

          {/* Search + Filter toggle */}
          <div className="flex gap-2 mb-8 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "border-accent" : ""}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-8 p-4 rounded-lg border border-border bg-card animate-fade-in">
              <p className="text-sm font-medium text-foreground mb-3">Filter by Brand</p>
              <div className="flex flex-wrap gap-2">
                {allBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedBrands.includes(brand)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:bg-secondary"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
                {selectedBrands.length > 0 && (
                  <button
                    onClick={() => setSelectedBrands([])}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-destructive hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Category Sections */}
          {sectionOrder.map((cat) => {
            const catProducts = filtered.filter((p) => p.category === cat);
            if (catProducts.length === 0) return null;
            const meta = categoryMeta[cat];

            return (
              <section key={cat} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                    {meta.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{meta.label}</h2>
                    <p className="text-sm text-muted-foreground">{meta.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
