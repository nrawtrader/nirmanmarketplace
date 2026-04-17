import { ShieldCheck, IndianRupee, Truck, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TrustSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-background text-foreground relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.3]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-3">Trust & Quality</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Why Homeowners Choose Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            16 years of delivering quality materials — no shortcuts, no compromises.
          </p>
        </motion.div>

        {/* Comparison: Bad market vs Nirman */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="font-bold text-lg">The Market Problem</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Adulterated cement with low-grade fillers",
                "Under-weight bags sold at full price",
                "Expired stock repackaged as fresh",
                "No traceability to manufacturer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-6 rounded-2xl bg-accent/10 border border-accent/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-lg">The Nirman Promise</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "100% genuine, factory-sealed materials",
                "Full-weight verified bags with batch codes",
                "Fresh stock with transparent manufacturing dates",
                "Direct partnerships with top manufacturers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Trust pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, title: "Quality Assured", description: "Every product sourced directly from authorized dealers and verified manufacturers." },
            { icon: IndianRupee, title: "Transparent Pricing", description: "No hidden charges. Real market prices with clear cost breakdowns." },
            { icon: Truck, title: "Site Delivery", description: "Fast, reliable delivery to your construction site with real-time tracking." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
              className="group text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// X icon component for the "bad" list
const X = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default TrustSection;
