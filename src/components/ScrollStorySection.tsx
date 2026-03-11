import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Shield, Award, Truck, Clock } from "lucide-react";
import cementSteelImg from "@/assets/cement-steel-materials.png";

/* ---------- Materials Showcase Section ---------- */
const MaterialsShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.35], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <div ref={ref} className="min-h-[130vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <motion.div
              style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
              className="relative flex items-center justify-center"
            >
              <div className="relative">
                <img
                  src={cementSteelImg}
                  alt="Premium cement bags and TMT steel bars"
                  className="w-[280px] sm:w-[350px] lg:w-[420px] h-auto drop-shadow-xl"
                />
                {/* Glow */}
                <div className="absolute inset-0 -z-10 bg-accent/8 blur-[80px] rounded-full scale-110" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[5%] glass-panel px-4 py-2 rounded-xl shadow-lg"
              >
                <div className="text-sm font-bold text-foreground">OPC 53 Grade</div>
                <div className="text-xs text-muted-foreground">Premium Cement</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] left-[0%] glass-panel px-4 py-2 rounded-xl shadow-lg"
              >
                <div className="text-sm font-bold text-foreground">Fe500D TMT</div>
                <div className="text-xs text-muted-foreground">High-Strength Steel</div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div style={{ x: textX, opacity: textOpacity }} className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="text-7xl font-bold text-accent/12" style={{ fontFamily: "'Space Grotesk'" }}>01</span>
                <div className="w-12 h-px bg-accent/30" />
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
                Factory-Fresh
                <br />
                <span className="text-accent">Cement & Steel</span>
              </h3>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-md">
                We source directly from authorized manufacturers — every cement bag is full-weight with batch codes, every steel bar meets IS standards. No middlemen, no compromises.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["OPC 53 Grade", "PPC Cement", "TMT Fe500D Steel", "Binding Wire"].map((item) => (
                  <span key={item} className="glass-panel px-4 py-2.5 rounded-full text-sm font-medium text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Quality Promise Section ---------- */
const QualityPromiseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const qualityFacts = [
    {
      icon: Shield,
      stat: "100%",
      title: "Verified Manufacturers",
      description: "Every bag of cement and every steel bar is sourced directly from authorized manufacturers. Zero counterfeits.",
    },
    {
      icon: Award,
      stat: "16+",
      title: "Years of Legacy",
      description: "Since 2009, we've been the trusted supplier for homeowners, contractors, and builders across the region.",
    },
    {
      icon: Truck,
      stat: "24hr",
      title: "Site Delivery",
      description: "From our warehouse to your foundation — fast, careful delivery with real-time tracking.",
    },
    {
      icon: Clock,
      stat: "0%",
      title: "Expired Stock",
      description: "Fresh inventory rotation ensures you never receive materials past their optimal use period.",
    },
  ];

  return (
    <div ref={ref} className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[200px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.25em] mb-4">The Quality Difference</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            In a Market Full of
            <span className="text-accent"> Compromises</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto text-base lg:text-lg">
            Low-quality cement and adulterated materials plague the construction industry.
            We've built our reputation on being the antidote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {qualityFacts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300">
                <fact.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent mb-1">{fact.stat}</div>
              <h3 className="font-semibold text-base mb-2">{fact.title}</h3>
              <p className="text-sm text-primary-foreground/50 leading-relaxed">{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Building Journey Section ---------- */
const BuildingJourneySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { step: "02", title: "Strong Foundations", desc: "Premium cement & TMT steel bars form the backbone of your home.", tags: ["OPC 53 Grade Cement", "PPC Cement", "TMT Steel Fe500D"] },
    { step: "03", title: "Structural Strength", desc: "Columns and beams rise with precision-engineered reinforcement steel.", tags: ["High-Grade TMT Bars", "Binding Wire", "Structural Steel"] },
    { step: "04", title: "Walls & Plumbing", desc: "Quality pipes and sanitary fittings bring comfort to every room.", tags: ["Sanitary Pipes", "Plumbing Fittings", "Bathroom Fixtures"] },
    { step: "05", title: "Finishing Touches", desc: "Roof, windows, and finishing transforms structure into dream home.", tags: ["Roofing Materials", "Windows & Doors", "Finishing Supplies"] },
  ];

  return (
    <div ref={ref} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.25em] mb-4">Build Your House Journey</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            From Ground to
            <span className="text-gradient"> Glory</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative flex flex-col lg:flex-row items-start gap-8 mb-16 last:mb-0 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background z-10" />

              <div className={`ml-16 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                <div className={`inline-flex items-center gap-3 mb-3 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                  <span className="text-5xl font-bold text-accent/15" style={{ fontFamily: "'Space Grotesk'" }}>{step.step}</span>
                  <div className="w-10 h-px bg-accent/30" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
                  {step.tags.map((tag) => (
                    <span key={tag} className="glass-panel px-3 py-2 rounded-full text-xs font-medium text-foreground/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Main Component ---------- */
const ScrollStorySection = () => {
  return (
    <section className="relative">
      <MaterialsShowcase />
      <QualityPromiseSection />
      <BuildingJourneySection />

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-20 lg:py-32 bg-background"
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Ready to Start Building?
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Get premium cement and steel at the best prices, delivered to your site.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-10 h-14 shadow-xl shadow-accent/20 hover:scale-105 transition-all duration-300 group"
        >
          <Link to="/products">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Materials
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default ScrollStorySection;
