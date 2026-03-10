import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const windowScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.15]);
  const windowRadius = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const badgeScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.05));

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated window frame that opens on scroll */}
        <motion.div
          style={{ scale: windowScale, borderRadius: windowRadius }}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Construction scene inside window */}
          <motion.div
            style={{ y: sceneY, scale: sceneScale }}
            className="absolute inset-0"
          >
            {/* Deep gradient sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/60 to-muted" />

            {/* Cinematic grain overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }} />

            {/* Sun glow */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-accent/30 blur-[80px]"
            />

            {/* Animated crane 1 */}
            <div className="absolute top-[5%] left-[8%] opacity-30">
              <motion.svg
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                width="160" height="320" viewBox="0 0 100 220" style={{ transformOrigin: "50px 200px" }}
              >
                <line x1="50" y1="10" x2="50" y2="200" stroke="hsl(var(--primary-foreground))" strokeWidth="4" />
                <line x1="50" y1="12" x2="95" y2="12" stroke="hsl(var(--primary-foreground))" strokeWidth="3" />
                <line x1="50" y1="12" x2="15" y2="12" stroke="hsl(var(--primary-foreground))" strokeWidth="3" />
                <rect x="5" y="8" width="14" height="10" fill="hsl(var(--primary-foreground))" rx="1" />
                <motion.line
                  animate={{ y2: [65, 85, 65] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  x1="88" y1="12" x2="88" y2={65}
                  stroke="hsl(var(--primary-foreground))" strokeWidth="1"
                />
                <motion.rect
                  animate={{ y: [63, 83, 63] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  x="80" y={63} width="16" height="12" fill="hsl(var(--accent))" rx="2"
                />
                <rect x="35" y="195" width="30" height="8" fill="hsl(var(--primary-foreground))" rx="2" />
              </motion.svg>
            </div>

            {/* Animated crane 2 - right */}
            <div className="absolute top-[2%] right-[12%] opacity-20">
              <motion.svg
                animate={{ rotate: [1, -1.5, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                width="120" height="280" viewBox="0 0 100 220" style={{ transformOrigin: "50px 200px" }}
              >
                <line x1="50" y1="10" x2="50" y2="200" stroke="hsl(var(--primary-foreground))" strokeWidth="4" />
                <line x1="50" y1="18" x2="90" y2="18" stroke="hsl(var(--primary-foreground))" strokeWidth="3" />
                <motion.line
                  animate={{ y2: [80, 100, 80] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  x1="82" y1="18" x2="82" y2={80}
                  stroke="hsl(var(--primary-foreground))" strokeWidth="1"
                />
                <motion.rect
                  animate={{ y: [78, 98, 78] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  x="74" y={78} width="16" height="12" fill="hsl(var(--accent))" rx="2"
                />
                <rect x="35" y="195" width="30" height="8" fill="hsl(var(--primary-foreground))" rx="2" />
              </motion.svg>
            </div>

            {/* Buildings skyline */}
            <svg className="absolute bottom-0 left-0 right-0 w-full h-[70%] opacity-20" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice">
              {/* Building 1 */}
              <rect x="50" y="100" width="120" height="400" fill="hsl(var(--primary-foreground))" rx="4" />
              {[...Array(12)].map((_, i) => (
                <rect key={`w1-${i}`} x={65 + (i % 3) * 30} y={120 + Math.floor(i / 3) * 40} width="18" height="14" fill="hsl(var(--accent))" opacity="0.3" rx="1" />
              ))}
              {/* Building 2 */}
              <rect x="200" y="180" width="100" height="320" fill="hsl(var(--primary-foreground))" rx="4" />
              {[...Array(8)].map((_, i) => (
                <rect key={`w2-${i}`} x={215 + (i % 2) * 40} y={200 + Math.floor(i / 2) * 45} width="22" height="16" fill="hsl(var(--accent))" opacity="0.25" rx="1" />
              ))}
              {/* Building 3 - tall */}
              <rect x="350" y="50" width="90" height="450" fill="hsl(var(--primary-foreground))" rx="3" />
              {[...Array(14)].map((_, i) => (
                <rect key={`w3-${i}`} x={365 + (i % 2) * 30} y={70 + Math.floor(i / 2) * 35} width="16" height="12" fill="hsl(var(--accent))" opacity="0.2" rx="1" />
              ))}
              {/* Building 4 */}
              <rect x="480" y="200" width="140" height="300" fill="hsl(var(--primary-foreground))" rx="4" />
              {/* Building 5 */}
              <rect x="660" y="140" width="110" height="360" fill="hsl(var(--primary-foreground))" rx="4" />
              {/* Building 6 */}
              <rect x="800" y="80" width="100" height="420" fill="hsl(var(--primary-foreground))" rx="3" />
              {/* Building 7 */}
              <rect x="940" y="160" width="130" height="340" fill="hsl(var(--primary-foreground))" rx="4" />
              {/* Building 8 */}
              <rect x="1100" y="120" width="80" height="380" fill="hsl(var(--primary-foreground))" rx="3" />
            </svg>

            {/* Truck animation */}
            <div className="absolute bottom-[8%] w-full">
              <motion.div
                animate={{ x: ["-10%", "110%"] }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <svg width="100" height="50" viewBox="0 0 90 45" className="opacity-30">
                  <rect x="0" y="5" width="55" height="28" rx="3" fill="hsl(var(--primary-foreground))" />
                  <rect x="55" y="14" width="28" height="19" rx="2" fill="hsl(var(--primary-foreground))" />
                  <rect x="57" y="16" width="12" height="10" rx="1" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="15" cy="37" r="6" fill="hsl(var(--accent))" opacity="0.6" />
                  <circle cx="42" cy="37" r="6" fill="hsl(var(--accent))" opacity="0.6" />
                  <circle cx="70" cy="37" r="6" fill="hsl(var(--accent))" opacity="0.6" />
                </svg>
              </motion.div>
            </div>

            {/* Second truck - reverse */}
            <div className="absolute bottom-[14%] w-full">
              <motion.div
                animate={{ x: ["110%", "-10%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <svg width="80" height="40" viewBox="0 0 70 35" className="opacity-20">
                  <rect x="0" y="4" width="42" height="22" rx="2" fill="hsl(var(--primary-foreground))" />
                  <rect x="42" y="10" width="22" height="16" rx="2" fill="hsl(var(--primary-foreground))" />
                  <circle cx="12" cy="29" r="5" fill="hsl(var(--accent))" opacity="0.5" />
                  <circle cx="35" cy="29" r="5" fill="hsl(var(--accent))" opacity="0.5" />
                </svg>
              </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20 - i * 5, 0],
                  x: [0, (i % 2 === 0 ? 10 : -10), 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                className="absolute w-2 h-2 rounded-full bg-accent/30"
                style={{
                  top: `${20 + i * 12}%`,
                  left: `${10 + i * 15}%`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Window frame border */}
        <motion.div
          style={{
            borderRadius: windowRadius,
            opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]),
          }}
          className="absolute inset-6 sm:inset-10 lg:inset-20 border-2 border-primary-foreground/20 pointer-events-none z-10"
        />

        {/* Scroll-fade overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background z-20"
        />

        {/* Content overlay */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ scale: badgeScale }}
          >
            <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 px-5 py-2.5 rounded-full text-sm font-medium text-primary-foreground/90">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Trusted by 10,000+ homeowners across India
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-primary-foreground leading-[0.95] mb-6"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block"
              >
                Build Your
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block"
              >
                Dream Home
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block text-accent"
              >
                With the Right Materials
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Smart tools, accurate material estimates, and trusted construction supplies — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-14 shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105 group"
            >
              <Link to="/calculator">
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Materials
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8 h-14 bg-primary-foreground/5 backdrop-blur-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300"
            >
              <Link to="/products">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Explore Products
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "500+", label: "Products" },
              { value: "50+", label: "Brands" },
              { value: "24hr", label: "Delivery" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
                className="bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10 rounded-2xl p-4 sm:p-5"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-primary-foreground/40 uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-primary-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
