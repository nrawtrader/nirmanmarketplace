import { BookOpen, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const articles = [
  {
    title: "How Much Cement for a 1000 sq ft House?",
    excerpt: "Learn the thumb rules to estimate cement bags needed for foundations, walls, slabs, and plastering.",
    category: "Cement Guide",
    readTime: "5 min read",
  },
  {
    title: "Steel Required for RCC Roof Slab",
    excerpt: "Understand steel reinforcement requirements for different slab thicknesses and spans.",
    category: "Steel Guide",
    readTime: "7 min read",
  },
  {
    title: "Cost of Building a House in 2024",
    excerpt: "A complete breakdown of construction costs per sq ft for simple, standard, and premium homes.",
    category: "Cost Estimation",
    readTime: "8 min read",
  },
];

const KnowledgeSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Learn</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Construction Knowledge Hub</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Practical guides and tips to help you make informed decisions about your home construction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <div
              key={article.title}
              className={`group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-accent/30 transition-all duration-300 cursor-pointer ${
                visible ? "animate-scroll-reveal" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-accent">{article.category}</span>
                <span className="text-xs text-muted-foreground ml-auto">{article.readTime}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
              <span className="text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
