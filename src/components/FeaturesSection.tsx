import { Calculator, Layout, BookOpen, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Calculator,
    title: "Material Calculator",
    description: "Get accurate estimates for cement, steel, sand, and more based on your house dimensions.",
  },
  {
    icon: Layout,
    title: "AI Floor Plan Generator",
    description: "Generate basic floor plans by entering your plot size and room requirements.",
  },
  {
    icon: BookOpen,
    title: "Construction Guidance",
    description: "Learn construction basics, material usage tips, and avoid common building mistakes.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Materials",
    description: "Shop verified brands with transparent pricing and reliable local delivery.",
  },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.25em] mb-4">Why Nirman MarketPlace</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Everything You Need
            <br />
            <span className="text-gradient">to Build Smart</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-7 rounded-2xl glass-panel hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 cursor-pointer"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
