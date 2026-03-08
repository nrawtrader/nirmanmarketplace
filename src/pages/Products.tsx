import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, brands, ProductCategory } from "@/data/products";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "cement", label: "Cement" },
  { value: "steel", label: "Steel" },
  { value: "sanitary", label: "Sanitary" },
];

const Products = () => {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      return true;
    });
  }, [category, search, selectedBrands]);

  const availableBrands = useMemo(() => {
    if (category === "all") return Object.values(brands).flat();
    return brands[category] || [];
  }, [category]);

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

          {/* Tabs + Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <Tabs value={category} onValueChange={(v) => { setCategory(v as any); setSelectedBrands([]); }}>
              <TabsList>
                {categories.map((c) => (
                  <TabsTrigger key={c.value} value={c.value} className="text-sm">
                    {c.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-2 ml-auto w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
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
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6 p-4 rounded-lg border border-border bg-card animate-fade-in">
              <p className="text-sm font-medium text-foreground mb-3">Filter by Brand</p>
              <div className="flex flex-wrap gap-2">
                {availableBrands.map((brand) => (
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

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
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
