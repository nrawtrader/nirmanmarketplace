import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import EstimateForm from "./EstimateForm";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300">
      {/* Image placeholder */}
      <div className="relative h-48 bg-secondary flex items-center justify-center overflow-hidden">
        <Package className="w-16 h-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium bg-primary text-primary-foreground px-2.5 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="text-xs text-muted-foreground ml-1">/ {product.unit}</span>
          </div>
          <EstimateForm trigger={
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Estimate
            </Button>
          } />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
