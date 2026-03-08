import { ShieldCheck, IndianRupee, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    <section className="section-padding bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Trust</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-14">Why Homeowners Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className={visible ? "animate-scroll-reveal" : "opacity-0"}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
