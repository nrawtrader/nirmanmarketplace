import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import cementTruckImg from "@/assets/cement-truck.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const truckX = useTransform(scrollYProgress, [0, 0.25], ["120%", "0%"]);
  const truckOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const drumRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.3, 0.5], [0, 60]);
  const statsOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  // Mid-scroll trust reveal
  const trustY = useTransform(scrollYProgress, [0.45, 0.65], [80, 0]);
  const trustOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const trustFadeOut = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.03));

  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[20%] w-[500px] h-[500px] rounded-full bg-accent/15 blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]"
          />
        </div>

        {/* Ground line */}
        <div className="absolute bottom-[12%] left-0 right-0 h-[1px] bg-primary-foreground/10" />

        {/* Hero content - centered text */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 bg-primary-foreground/8 backdrop-blur-xl border border-primary-foreground/15 px-4 py-2 rounded-full text-sm font-medium text-primary-foreground/80">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Trusted by 10,000+ Homeowners Since 2009
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.05]"
              >
                <span className="block">Premium</span>
                <span className="block text-accent">Cement & Steel</span>
                <span className="block">Delivered to Site</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-base sm:text-lg text-primary-foreground/55 max-w-md leading-relaxed"
              >
                Factory-fresh, quality-verified construction materials — cement bags and TMT steel bars from authorized manufacturers, delivered within 24 hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-13 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-105 group"
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
                  className="text-base px-8 h-13 bg-primary-foreground/5 backdrop-blur-xl border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300"
                >
                  <Link to="/products">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Explore Products
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right: Truck */}
            <motion.div
              style={{ x: truckX, opacity: truckOpacity }}
              className="relative flex items-end justify-center lg:justify-end"
            >
              <div className="relative w-[300px] sm:w-[400px] lg:w-[500px]">
                <img
                  src={cementTruckImg}
                  alt="Cement mixer truck delivering quality materials"
                  className="w-full h-auto drop-shadow-2xl"
                />
                {/* Rotating drum indicator */}
                <motion.div
                  style={{ rotate: drumRotate }}
                  className="absolute top-[22%] left-[20%] w-[45%] aspect-square rounded-full border-2 border-dashed border-accent/20 pointer-events-none"
                />
                {/* Glow behind truck */}
                <div className="absolute inset-0 -z-10 bg-accent/10 blur-[60px] rounded-full scale-75" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          style={{ y: statsY, opacity: statsOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
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
                transition={{ duration: 0.4, delay: 1.5 + i * 0.08 }}
                className="glass-panel-dark rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="text-xl sm:text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-primary-foreground/45 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mid-scroll trust message */}
        <motion.div
          style={{ y: trustY, opacity: trustOpacity }}
          className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none"
        >
          <motion.div style={{ opacity: trustFadeOut }} className="text-center max-w-3xl px-6">
            <p className="text-sm font-semibold text-accent uppercase tracking-[0.25em] mb-3">16 Years of Excellence</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Quality You Can
              <span className="text-accent"> Build Upon</span>
            </h2>
            <p className="text-primary-foreground/50 text-base sm:text-lg max-w-xl mx-auto">
              In a market flooded with adulterated cement and substandard steel, we source only from verified, authorized manufacturers.
            </p>
          </motion.div>
        </motion.div>

        {/* Overlay fade to next section */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background z-30 pointer-events-none"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-primary-foreground/35 uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-primary-foreground/35" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
