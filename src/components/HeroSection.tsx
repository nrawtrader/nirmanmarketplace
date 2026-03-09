import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EstimateForm from "./EstimateForm";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Window frame overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Parallax construction scene */}
        <motion.div style={{ y: sceneY }} className="absolute inset-0">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(213,56%,24%)] via-[hsl(210,20%,85%)] to-[hsl(30,10%,92%)] opacity-20" />

          {/* Sun/glow */}
          <div className="absolute top-[15%] right-[20%] w-40 h-40 rounded-full bg-accent/20 blur-3xl" />

          {/* Animated Crane 1 */}
          <svg className="absolute top-[5%] left-[12%] w-24 h-52 opacity-[0.12]" viewBox="0 0 100 220">
            <line x1="50" y1="10" x2="50" y2="200" stroke="hsl(var(--foreground))" strokeWidth="5" />
            <line x1="50" y1="15" x2="95" y2="15" stroke="hsl(var(--foreground))" strokeWidth="4" />
            <line x1="50" y1="15" x2="15" y2="15" stroke="hsl(var(--foreground))" strokeWidth="4" />
            {/* Counter weight */}
            <rect x="5" y="12" width="15" height="10" fill="hsl(var(--foreground))" rx="1" />
            {/* Hanging cable + load */}
            <line x1="85" y1="15" x2="85" y2="70" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,2">
              <animate attributeName="y2" values="70;80;70" dur="3s" repeatCount="indefinite" />
            </line>
            <rect x="78" y="68" width="14" height="10" fill="hsl(var(--accent))" rx="1">
              <animate attributeName="y" values="68;78;68" dur="3s" repeatCount="indefinite" />
            </rect>
            {/* Base */}
            <rect x="35" y="195" width="30" height="8" fill="hsl(var(--foreground))" rx="2" />
          </svg>

          {/* Animated Crane 2 */}
          <svg className="absolute top-[2%] right-[8%] w-20 h-48 opacity-[0.08]" viewBox="0 0 100 220">
            <line x1="50" y1="10" x2="50" y2="200" stroke="hsl(var(--foreground))" strokeWidth="5" />
            <line x1="50" y1="20" x2="90" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" />
            <line x1="80" y1="20" x2="80" y2="90" stroke="hsl(var(--foreground))" strokeWidth="1.5">
              <animate attributeName="y2" values="90;100;90" dur="4s" repeatCount="indefinite" />
            </line>
            <rect x="73" y="88" width="14" height="10" fill="hsl(var(--accent))" rx="1">
              <animate attributeName="y" values="88;98;88" dur="4s" repeatCount="indefinite" />
            </rect>
            <rect x="35" y="195" width="30" height="8" fill="hsl(var(--foreground))" rx="2" />
          </svg>

          {/* Building silhouette in background */}
          <svg className="absolute bottom-0 left-[5%] w-32 h-64 opacity-[0.06]" viewBox="0 0 120 260">
            <rect x="10" y="40" width="100" height="220" fill="hsl(var(--foreground))" rx="4" />
            {/* Windows */}
            {[0, 1, 2, 3, 4, 5, 6].map(row => (
              [0, 1, 2].map(col => (
                <rect
                  key={`${row}-${col}`}
                  x={22 + col * 30}
                  y={55 + row * 28}
                  width="18"
                  height="14"
                  fill="hsl(var(--accent))"
                  opacity="0.3"
                  rx="1"
                />
              ))
            ))}
          </svg>

          {/* Building silhouette 2 */}
          <svg className="absolute bottom-0 right-[8%] w-28 h-48 opacity-[0.05]" viewBox="0 0 100 200">
            <rect x="15" y="20" width="70" height="180" fill="hsl(var(--foreground))" rx="3" />
            {[0, 1, 2, 3, 4, 5].map(row => (
              [0, 1].map(col => (
                <rect
                  key={`b2-${row}-${col}`}
                  x={25 + col * 30}
                  y={35 + row * 26}
                  width="20"
                  height="12"
                  fill="hsl(var(--accent))"
                  opacity="0.25"
                  rx="1"
                />
              ))
            ))}
          </svg>

          {/* Moving truck 1 */}
          <div className="absolute bottom-[10%] animate-truck">
            <svg width="90" height="45" viewBox="0 0 90 45" className="opacity-[0.12]">
              <rect x="0" y="5" width="55" height="28" rx="3" fill="hsl(var(--foreground))" />
              <rect x="55" y="14" width="28" height="19" rx="2" fill="hsl(var(--foreground))" />
              <rect x="57" y="16" width="12" height="10" rx="1" fill="hsl(var(--accent))" opacity="0.4" />
              <circle cx="15" cy="37" r="6" fill="hsl(var(--accent))" opacity="0.6" />
              <circle cx="42" cy="37" r="6" fill="hsl(var(--accent))" opacity="0.6" />
              <circle cx="70" cy="37" r="6" fill="hsl(var(--accent))" opacity="0.6" />
            </svg>
          </div>

          {/* Moving truck 2 (opposite direction, slower) */}
          <div className="absolute bottom-[18%] animate-truck" style={{ animationDuration: "18s", animationDirection: "reverse" }}>
            <svg width="70" height="35" viewBox="0 0 70 35" className="opacity-[0.07]">
              <rect x="0" y="4" width="42" height="22" rx="2" fill="hsl(var(--foreground))" />
              <rect x="42" y="10" width="22" height="16" rx="2" fill="hsl(var(--foreground))" />
              <circle cx="12" cy="29" r="5" fill="hsl(var(--accent))" opacity="0.5" />
              <circle cx="35" cy="29" r="5" fill="hsl(var(--accent))" opacity="0.5" />
              <circle cx="55" cy="29" r="5" fill="hsl(var(--accent))" opacity="0.5" />
            </svg>
          </div>

          {/* Floating material shapes */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] left-[6%] w-14 h-18 rounded-lg bg-muted/40 border border-border/30"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-[55%] right-[6%] w-10 h-14 rounded-lg bg-muted/30 border border-border/20"
          />
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[30%] left-[18%] w-12 h-16 rounded-lg bg-accent/10 border border-accent/10"
          />
        </motion.div>

        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[100px]" />

        {/* Scroll fade overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background"
        />
      </div>

      {/* Window frame border effect */}
      <div className="absolute inset-4 sm:inset-8 lg:inset-16 border-2 border-border/20 rounded-3xl pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-foreground/80">Trusted by 10,000+ homeowners across India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
        >
          Build Your Dream Home
          <br />
          <span className="text-gradient">With the Right Materials</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Smart tools, accurate material estimates, and trusted construction supplies — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-13 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:scale-105">
            <Link to="/calculator">
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Materials
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base px-8 h-13 glass-panel border-border/40 hover:bg-card/80 hover:scale-105 transition-all">
            <Link to="/products">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explore Products
            </Link>
          </Button>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: "500+", label: "Products" },
            { value: "50+", label: "Brands" },
            { value: "24hr", label: "Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
