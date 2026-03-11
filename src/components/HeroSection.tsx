import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import cementTruckImg from "@/assets/cement-mixer-truck.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const truckX = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);
  const truckScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 1.1]);
  const drumRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);
  const badgeScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const statsOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);
  const truckImageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0, 1, 1]);
  const contentRevealY = useTransform(scrollYProgress, [0.35, 0.6], [60, 0]);
  const contentRevealOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.03));

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-foreground/90" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
          {/* Radial glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px]"
          />
        </div>

        {/* Road/ground line */}
        <div className="absolute bottom-[18%] left-0 right-0 h-[2px] bg-primary-foreground/10" />
        <div className="absolute bottom-[12%] left-0 right-0 h-px bg-primary-foreground/5" />

        {/* Cement mixer truck — slides in from left */}
        <motion.div
          style={{ x: truckX, scale: truckScale, opacity: truckImageOpacity }}
          className="absolute bottom-[14%] left-[5%] sm:left-[8%] w-[280px] sm:w-[380px] lg:w-[480px] z-10"
        >
          <div className="relative">
            <img
              src={cementTruckImg}
              alt="Nirman MarketPlace Cement Mixer Truck"
              className="w-full h-auto drop-shadow-2xl"
            />
            {/* Rotating drum overlay (SVG circle to simulate rotation) */}
            <motion.div
              style={{ rotate: drumRotate }}
              className="absolute top-[18%] left-[28%] w-[42%] h-[55%] rounded-full border-2 border-dashed border-accent/30 pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Dust particles behind truck */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 30 + i * 10, 60 + i * 15],
              y: [0, -5 - i * 3, -10],
              opacity: [0, 0.3, 0],
            }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            className="absolute bottom-[18%] left-[3%] w-1.5 h-1.5 rounded-full bg-primary-foreground/20"
            style={{ left: `${2 + i * 2}%` }}
          />
        ))}

        {/* Scroll-fade to next section */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background z-20"
        />

        {/* Hero content — top right area */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 w-full"
        >
          <div className="flex flex-col items-end text-right max-w-2xl ml-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ scale: badgeScale }}
            >
              <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 px-5 py-2.5 rounded-full text-sm font-medium text-primary-foreground/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                16 Years of Trust — 10,000+ Homeowners Served
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-primary-foreground leading-[0.95] mb-5"
            >
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="block">
                  Build Your
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="block">
                  Dream Home
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="block text-accent">
                  With Quality Materials
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-base sm:text-lg text-primary-foreground/60 max-w-lg mb-8 leading-relaxed"
            >
              From the mixer to your doorstep — premium cement, steel, and sanitary materials delivered with 16 years of trust.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="flex flex-col sm:flex-row items-end sm:items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-13 shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105 group"
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
                className="text-base px-8 h-13 bg-primary-foreground/5 backdrop-blur-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300"
              >
                <Link to="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Explore Products
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar — bottom */}
        <motion.div
          style={{ opacity: statsOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="grid grid-cols-4 gap-3"
          >
            {[
              { value: "16+", label: "Years Legacy" },
              { value: "500+", label: "Products" },
              { value: "50+", label: "Brands" },
              { value: "24hr", label: "Delivery" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.8 + i * 0.08 }}
                className="bg-primary-foreground/5 backdrop-blur-xl border border-primary-foreground/10 rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="text-xl sm:text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-primary-foreground/50 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mid-scroll content reveal — trust messaging */}
        <motion.div
          style={{ y: contentRevealY, opacity: contentRevealOpacity }}
          className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-3xl px-6">
            <p className="text-sm font-semibold text-accent uppercase tracking-[0.25em] mb-3">Why Trust Nirman MarketPlace</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Quality You Can
              <span className="text-accent"> Build Upon</span>
            </h2>
            <p className="text-primary-foreground/50 text-base sm:text-lg max-w-xl mx-auto">
              In a market flooded with substandard materials, we've spent 16 years building relationships with verified manufacturers to deliver only the best to your construction site.
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-primary-foreground/40 uppercase tracking-[0.2em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-primary-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
