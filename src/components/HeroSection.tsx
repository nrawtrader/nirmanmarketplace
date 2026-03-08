import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, ShoppingBag, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating cement bag shapes */}
        <div className="absolute top-[20%] left-[8%] w-16 h-20 bg-muted rounded-md animate-float opacity-30" style={{ animationDelay: "0s" }} />
        <div className="absolute top-[60%] right-[10%] w-12 h-16 bg-muted rounded-md animate-float opacity-20" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-[25%] left-[15%] w-14 h-18 bg-muted rounded-md animate-float opacity-25" style={{ animationDelay: "3s" }} />

        {/* Crane SVG */}
        <svg className="absolute top-0 right-[15%] w-32 h-64 opacity-10 animate-crane" viewBox="0 0 100 200">
          <line x1="50" y1="0" x2="50" y2="180" stroke="hsl(var(--foreground))" strokeWidth="4" />
          <line x1="10" y1="20" x2="90" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" />
          <line x1="80" y1="20" x2="80" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <rect x="72" y="70" width="16" height="12" fill="hsl(var(--accent))" opacity="0.6" />
        </svg>

        {/* Moving truck */}
        <div className="absolute bottom-[12%] animate-truck">
          <svg width="80" height="40" viewBox="0 0 80 40" className="opacity-15">
            <rect x="0" y="5" width="50" height="25" rx="3" fill="hsl(var(--foreground))" />
            <rect x="50" y="12" width="25" height="18" rx="2" fill="hsl(var(--foreground))" />
            <circle cx="15" cy="33" r="5" fill="hsl(var(--accent))" />
            <circle cx="40" cy="33" r="5" fill="hsl(var(--accent))" />
            <circle cx="65" cy="33" r="5" fill="hsl(var(--accent))" />
          </svg>
        </div>

        {/* Yellow accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8 border border-accent/20">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Trusted by 10,000+ homeowners across India
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mb-6">
          Build Your Dream Home
          <br />
          <span className="text-gradient">with the Right Materials</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Calculate materials, explore construction tips, and buy trusted products — all in one place. No contractor dependency.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-12 shadow-lg">
            <Link to="/calculator">
              <Calculator className="w-5 h-5 mr-2" />
              Estimate My Materials
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
            <Link to="/products">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Materials
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "500+", label: "Products" },
            { value: "50+", label: "Brands" },
            { value: "24hr", label: "Delivery" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
