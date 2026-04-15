import { useState } from "react";
import { Package, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import EstimateForm from "./EstimateForm";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="group rounded-2xl glass-panel overflow-hidden hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1">
      {/* Image placeholder */}
      <div className="relative h-48 bg-secondary/60 flex items-center justify-center overflow-hidden">
        <Package className="w-16 h-16 text-muted-foreground/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium bg-primary text-primary-foreground px-2.5 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-foreground">Qty:</span>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 py-1.5 text-sm font-semibold text-foreground bg-secondary/40 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2.5 py-1.5 hover:bg-secondary transition-colors text-foreground"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">{product.unit}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">₹{(product.price * quantity).toLocaleString("en-IN")}</span>
            {quantity > 1 && (
              <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString("en-IN")} × {quantity}</p>
            )}
          </div>
          <EstimateForm trigger={
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all">
              Get Estimate
            </Button>
          } />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
