import { BookOpen, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-3">Learn</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Construction Knowledge Hub</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            Practical guides and tips to help you make informed decisions about your home construction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group p-6 rounded-2xl glass-panel hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30 transition-all duration-500 cursor-pointer hover:-translate-y-1"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
