import { Calculator, Layout, BookOpen, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Why Nirman MarketPlace</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything You Need to Build Smart
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-accent/40 transition-all duration-300 ${
                visible ? "animate-scroll-reveal" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
