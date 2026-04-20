import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingCart, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const STEEL_SIZES = ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm", "32mm"];

// Approximate weight (kg) per 12m bar — used only to show indicative weight info
const BAR_WEIGHT_KG: Record<string, number> = {
  "8mm": 4.74,
  "10mm": 7.4,
  "12mm": 10.66,
  "16mm": 18.96,
  "20mm": 29.6,
  "25mm": 46.2,
  "32mm": 75.72,
};

const SteelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === id && p.category === "steel");

  // Sigma Griplock is sold by weight (tons), others by bars
  const isWeightBased = product?.id === "stl-sigma";

  // Bar quantities for per-bar products
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(STEEL_SIZES.map((s) => [s, 0]))
  );

  // Tonnage per size for weight-based products (in tons, supports decimals)
  const [tonnages, setTonnages] = useState<Record<string, number>>(
    () => Object.fromEntries(STEEL_SIZES.map((s) => [s, 0]))
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20 px-4 text-center">
          <p className="text-muted-foreground mb-4">Steel product not found.</p>
          <Button onClick={() => navigate("/products")}>Back to products</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const updateQty = (size: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max(0, (prev[size] || 0) + delta),
    }));
  };

  const setQty = (size: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [size]: Math.max(0, value) }));
  };

  const updateTons = (size: string, delta: number) => {
    setTonnages((prev) => ({
      ...prev,
      [size]: Math.max(0, +((prev[size] || 0) + delta).toFixed(2)),
    }));
  };

  const setTons = (size: string, value: number) => {
    setTonnages((prev) => ({
      ...prev,
      [size]: Math.max(0, isNaN(value) ? 0 : +value.toFixed(2)),
    }));
  };

  // Price per bar ≈ price per ton × bar weight kg / 1000
  const pricePerBar = (size: string) =>
    Math.round((product.price * BAR_WEIGHT_KG[size]) / 1000);

  // Totals — bars mode
  const totalBars = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPriceBars = STEEL_SIZES.reduce(
    (sum, size) => sum + pricePerBar(size) * (quantities[size] || 0),
    0
  );

  // Totals — tons mode
  const totalTons = +Object.values(tonnages).reduce((a, b) => a + b, 0).toFixed(3);
  const totalPriceTons = Math.round(
    STEEL_SIZES.reduce((sum, size) => sum + product.price * (tonnages[size] || 0), 0)
  );

  const handleAddBars = () => {
    if (totalBars === 0) {
      toast({ title: "Select quantity", description: "Increase quantity for at least one size." });
      return;
    }
    STEEL_SIZES.forEach((size) => {
      const qty = quantities[size];
      if (qty > 0) {
        const sizedProduct = {
          ...product,
          id: `${product.id}-${size}`,
          name: `${product.name} — ${size}`,
          price: pricePerBar(size),
          unit: "bar (12m)",
          specs: { ...product.specs, Diameter: size, Length: "12 m" },
        };
        addToCart(sizedProduct, qty);
      }
    });
    toast({ title: "Added to cart!", description: `${totalBars} bars across selected sizes` });
    setQuantities(Object.fromEntries(STEEL_SIZES.map((s) => [s, 0])));
  };

  const handleAddTons = () => {
    if (totalTons === 0) {
      toast({ title: "Enter tonnage", description: "Add quantity in tons for at least one size." });
      return;
    }
    STEEL_SIZES.forEach((size) => {
      const tons = tonnages[size];
      if (tons > 0) {
        // Cart stores integer quantity. Encode tonnage in kg (1 ton = 1000 kg) for precision.
        const kg = Math.round(tons * 1000);
        const sizedProduct = {
          ...product,
          id: `${product.id}-${size}`,
          name: `${product.name} — ${size}`,
          price: Math.round(product.price / 1000), // price per kg
          unit: "kg",
          specs: { ...product.specs, Diameter: size, "Sold By": "Weight (tons)" },
        };
        addToCart(sizedProduct, kg);
      }
    });
    toast({ title: "Added to cart!", description: `${totalTons} tons across selected sizes` });
    setTonnages(Object.fromEntries(STEEL_SIZES.map((s) => [s, 0])));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to products
          </Link>

          {/* Product header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="rounded-2xl glass-panel p-8 flex items-center justify-center bg-secondary/30 min-h-[280px]">
              {product.image && product.image !== "/placeholder.svg" ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-64 w-auto object-contain"
                />
              ) : (
                <Package className="w-20 h-20 text-muted-foreground/30" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-5">{product.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-border bg-card/50 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="text-sm font-semibold text-foreground">{v}</p>
                  </div>
                ))}
              </div>
              {isWeightBased && (
                <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <p className="text-sm font-semibold text-foreground">
                    ₹{product.price.toLocaleString("en-IN")}{" "}
                    <span className="text-xs font-normal text-muted-foreground">/ ton</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Sold by weight — enter tonnage per size below.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Size selector */}
          <section className="rounded-2xl glass-panel p-6 sm:p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {isWeightBased ? "Choose Size & Tonnage" : "Choose Size & Quantity"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isWeightBased
                  ? "Select bar diameter and enter the weight in tons (supports decimals, e.g. 0.5)."
                  : "Select bar diameter and adjust the number of 12-meter bars you need."}
              </p>
            </div>

            {isWeightBased ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {STEEL_SIZES.map((size) => {
                  const tons = tonnages[size];
                  const active = tons > 0;
                  const lineTotal = Math.round(product.price * tons);
                  return (
                    <div
                      key={size}
                      className={`rounded-xl border p-4 transition-all ${
                        active
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border bg-card/40 hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-lg font-bold text-foreground">{size}</p>
                          <p className="text-[11px] text-muted-foreground">
                            ₹{product.price.toLocaleString("en-IN")} / ton
                          </p>
                        </div>
                        {active && (
                          <p className="text-sm font-semibold text-foreground text-right">
                            ₹{lineTotal.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateTons(size, -0.5)}
                          className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
                          aria-label={`Decrease ${size} tons`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          value={tons}
                          onChange={(e) => setTons(size, parseFloat(e.target.value || "0"))}
                          className="flex-1 w-full text-center text-sm font-semibold text-foreground bg-secondary/40 py-1.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="px-2 text-[11px] text-muted-foreground bg-secondary/40 py-1.5">
                          tons
                        </span>
                        <button
                          onClick={() => updateTons(size, 0.5)}
                          className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
                          aria-label={`Increase ${size} tons`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {STEEL_SIZES.map((size) => {
                  const qty = quantities[size];
                  const active = qty > 0;
                  return (
                    <div
                      key={size}
                      className={`rounded-xl border p-4 transition-all ${
                        active
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border bg-card/40 hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-lg font-bold text-foreground">{size}</p>
                          <p className="text-[11px] text-muted-foreground">
                            ~{BAR_WEIGHT_KG[size]} kg / 12m bar
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          ₹{pricePerBar(size).toLocaleString("en-IN")}
                          <span className="block text-[10px] font-normal text-muted-foreground text-right">
                            per bar
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(size, -1)}
                            className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
                            aria-label={`Decrease ${size}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min={0}
                            value={qty}
                            onChange={(e) => setQty(size, parseInt(e.target.value || "0", 10))}
                            className="w-14 text-center text-sm font-semibold text-foreground bg-secondary/40 py-1.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => updateQty(size, 1)}
                            className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
                            aria-label={`Increase ${size}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {qty > 0 && (
                          <p className="text-sm font-semibold text-foreground">
                            ₹{(pricePerBar(size) * qty).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Summary + add */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky bottom-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {isWeightBased
                  ? `${totalTons} ton${totalTons === 1 ? "" : "s"} selected`
                  : `${totalBars} bar${totalBars === 1 ? "" : "s"} selected`}
              </p>
              <p className="text-2xl font-bold text-foreground">
                ₹{(isWeightBased ? totalPriceTons : totalPriceBars).toLocaleString("en-IN")}
              </p>
            </div>
            <Button
              size="lg"
              onClick={isWeightBased ? handleAddTons : handleAddBars}
              disabled={isWeightBased ? totalTons === 0 : totalBars === 0}
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SteelDetail;
