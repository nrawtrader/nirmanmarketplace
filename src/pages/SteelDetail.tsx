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

// Approximate weight (kg) per 12m bar
const BAR_WEIGHT_KG: Record<string, number> = {
  "8mm": 4.74,
  "10mm": 7.4,
  "12mm": 10.66,
  "16mm": 18.96,
  "20mm": 29.6,
  "25mm": 46.2,
  "32mm": 75.72,
};

// ─────────────────────────────────────────────────────────────────
// PRICE TABLE — UPDATE THESE WHEN MARKET RATES CHANGE
// RHL Gold — enter the PRICE PER BAR (per 12m piece) for each size
// This is the exact amount the customer will be charged per bar
// ─────────────────────────────────────────────────────────────────
const RHL_PRICE_PER_BAR: Record<string, number> = {
  "8mm":  318,    // ₹ per 12m bar
  "10mm": 479,
  "12mm": 692,
  "16mm": 1232,
  "20mm": 1948,
  "25mm": 3035,
  "32mm": 5106,
};

// ─────────────────────────────────────────────────────────────────
// Sigma Griplock is sold PER KG (enter quantity in quintals)
// Price shown = price per kg entered here
// Just change the number after each size below
// ─────────────────────────────────────────────────────────────────
const SIGMA_PRICE_PER_KG: Record<string, number> = {
  "8mm":  60,   // ₹ per kg
  "10mm": 58,
  "12mm": 58,
  "16mm": 58,
  "20mm": 58,
  "25mm": 58,
  "32mm": 58,
};

const SteelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === id && p.category === "steel");

  // Sigma Griplock is sold by weight (quintals), others by bars
  const isWeightBased = product?.id === "stl-sigma";

  // Bar quantities for per-bar products
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(STEEL_SIZES.map((s) => [s, 0]))
  );

  // Quintals per size for weight-based products (supports decimals)
  const [quintals, setQuintals] = useState<Record<string, number>>(
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

  // Price per kg for Sigma (weight-based)
  const pricePerKg = (size: string) => SIGMA_PRICE_PER_KG[size] ?? 63;

  // Price per quintal (100 kg) for Sigma
  const pricePerQuintal = (size: string) => pricePerKg(size) * 100;

  const updateQty = (size: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max(0, (prev[size] || 0) + delta),
    }));
  };

  const setQty = (size: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [size]: Math.max(0, value) }));
  };

  const updateQuintals = (size: string, delta: number) => {
    setQuintals((prev) => ({
      ...prev,
      [size]: Math.max(0, +((prev[size] || 0) + delta).toFixed(2)),
    }));
  };

  const setQuintalsValue = (size: string, value: number) => {
    setQuintals((prev) => ({
      ...prev,
      [size]: Math.max(0, isNaN(value) ? 0 : +value.toFixed(2)),
    }));
  };

  // Price per bar — direct from table (no calculation needed)
  const pricePerBar = (size: string) => RHL_PRICE_PER_BAR[size] ?? 0;

  // Totals — bars mode
  const totalBars = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPriceBars = STEEL_SIZES.reduce(
    (sum, size) => sum + pricePerBar(size) * (quantities[size] || 0),
    0
  );

  // Totals — quintals mode
  const totalQuintals = +Object.values(quintals).reduce((a, b) => a + b, 0).toFixed(2);
  const totalPriceQuintals = Math.round(
    STEEL_SIZES.reduce((sum, size) => sum + pricePerQuintal(size) * (quintals[size] || 0), 0)
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

  const handleAddQuintals = () => {
    if (totalQuintals === 0) {
      toast({ title: "Enter quantity", description: "Add quantity in quintals for at least one size." });
      return;
    }
    STEEL_SIZES.forEach((size) => {
      const q = quintals[size];
      if (q > 0) {
        // Cart stores integer quantity. Encode as kg (1 quintal = 100 kg) for precision.
        const kg = Math.round(q * 100);
        const sizedProduct = {
          ...product,
          id: `${product.id}-${size}`,
          name: `${product.name} — ${size}`,
          price: pricePerKg(size), // price per kg, size-specific
          unit: "kg",
          specs: { ...product.specs, Diameter: size, "Sold By": "Weight (quintals)" },
        };
        addToCart(sizedProduct, kg);
      }
    });
    toast({ title: "Added to cart!", description: `${totalQuintals} quintals across selected sizes` });
    setQuintals(Object.fromEntries(STEEL_SIZES.map((s) => [s, 0])));
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
                    Price varies by size
                    <span className="text-xs font-normal text-muted-foreground ml-2">
                      ₹{Math.min(...Object.values(SIGMA_PRICE_PER_KG))}–₹{Math.max(...Object.values(SIGMA_PRICE_PER_KG))} / kg
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Sold by weight — enter quantity in quintals (1 quintal = 100 kg).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Size selector */}
          <section className="rounded-2xl glass-panel p-6 sm:p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {isWeightBased ? "Choose Size & Quintals" : "Choose Size & Quantity"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isWeightBased
                  ? "Select bar diameter and enter the quantity in quintals (supports decimals, e.g. 0.5)."
                  : "Select bar diameter and adjust the number of 12-meter bars you need."}
              </p>
            </div>

            {isWeightBased ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {STEEL_SIZES.map((size) => {
                  const q = quintals[size];
                  const active = q > 0;
                  const lineTotal = Math.round(pricePerQuintal * q);
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
                            ₹{pricePerKg(size)} / kg · ₹{pricePerQuintal(size).toLocaleString("en-IN")} / quintal
                          </p>
                        </div>
                        {active && (
                          <p className="text-sm font-semibold text-foreground text-right">
                            ₹{Math.round(pricePerQuintal(size) * q).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuintals(size, -1)}
                          className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
                          aria-label={`Decrease ${size} quintals`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min={0}
                          step={0.5}
                          value={q === 0 ? "" : q}
                          placeholder="0"
                          onChange={(e) =>
                            setQuintalsValue(size, parseFloat(e.target.value || "0"))
                          }
                          className="flex-1 w-full text-center text-sm font-semibold text-foreground bg-secondary/40 py-1.5 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="px-2 text-[11px] text-muted-foreground bg-secondary/40 py-1.5">
                          qtl
                        </span>
                        <button
                          onClick={() => updateQuintals(size, 1)}
                          className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
                          aria-label={`Increase ${size} quintals`}
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
                            value={qty === 0 ? "" : qty}
                            placeholder="0"
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
                  ? `${totalQuintals} quintal${totalQuintals === 1 ? "" : "s"} selected`
                  : `${totalBars} bar${totalBars === 1 ? "" : "s"} selected`}
              </p>
              <p className="text-2xl font-bold text-foreground">
                ₹{(isWeightBased ? totalPriceQuintals : totalPriceBars).toLocaleString("en-IN")}
              </p>
            </div>
            <Button
              size="lg"
              onClick={isWeightBased ? handleAddQuintals : handleAddBars}
              disabled={isWeightBased ? totalQuintals === 0 : totalBars === 0}
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
