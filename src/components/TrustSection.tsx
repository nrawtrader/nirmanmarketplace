import { ShieldCheck, IndianRupee, Truck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Every product is sourced directly from authorized dealers and verified manufacturers.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. See real market prices with clear cost breakdowns.",
  },
  {
    icon: Truck,
    title: "Local Delivery",
    description: "Fast, reliable delivery to your construction site with real-time tracking.",
  },
];

const TrustSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden" ref={ref}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-3">Trust</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-14">Why Homeowners Choose Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
