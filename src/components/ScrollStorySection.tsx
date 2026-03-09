import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface StoryStage {
  id: string;
  step: string;
  title: string;
  description: string;
  highlights: string[];
  scene: React.ReactNode;
  accent: string;
}

const FoundationScene = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    {/* Ground */}
    <rect x="0" y="220" width="400" height="80" fill="hsl(var(--muted))" rx="2" />
    
    {/* Excavation */}
    <motion.rect
      initial={{ width: 0 }}
      whileInView={{ width: 280 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      x="60" y="180" height="50" fill="hsl(var(--foreground))" opacity="0.15" rx="4"
    />
    
    {/* Steel reinforcement bars */}
    {[0, 1, 2, 3, 4, 5, 6].map(i => (
      <motion.line
        key={`h-${i}`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
        viewport={{ once: true }}
        x1="80" y1={190 + i * 6} x2="320" y2={190 + i * 6}
        stroke="hsl(var(--cement-gray))" strokeWidth="2"
      />
    ))}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
      <motion.line
        key={`v-${i}`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 1.2 + i * 0.08 }}
        viewport={{ once: true }}
        x1={90 + i * 28} y1="185" x2={90 + i * 28} y2="228"
        stroke="hsl(var(--cement-gray))" strokeWidth="2"
      />
    ))}
    
    {/* Cement pour animation */}
    <motion.rect
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 45, opacity: 0.4 }}
      transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
      viewport={{ once: true }}
      x="62" y="182" width="276" fill="hsl(var(--cement-gray))" rx="3"
    />
    
    {/* Labels */}
    <motion.text
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      transition={{ delay: 2.5 }}
      viewport={{ once: true }}
      x="200" y="270" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="Space Grotesk"
    >
      REINFORCED FOUNDATION
    </motion.text>
  </svg>
);

const StructureScene = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    {/* Foundation base */}
    <rect x="60" y="240" width="280" height="20" fill="hsl(var(--cement-gray))" opacity="0.4" rx="2" />
    
    {/* Columns rising */}
    {[0, 1, 2, 3].map(i => (
      <motion.rect
        key={`col-${i}`}
        initial={{ height: 0 }}
        whileInView={{ height: 160 }}
        transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        x={80 + i * 75} y="80" width="16" fill="hsl(var(--foreground))" opacity="0.25" rx="2"
        style={{ transformOrigin: "bottom" }}
      />
    ))}
    
    {/* Beams connecting columns */}
    {[0, 1, 2].map(i => (
      <motion.rect
        key={`beam-${i}`}
        initial={{ width: 0 }}
        whileInView={{ width: 75 }}
        transition={{ duration: 0.8, delay: 1.5 + i * 0.15 }}
        viewport={{ once: true }}
        x={88 + i * 75} y="80" height="10" fill="hsl(var(--foreground))" opacity="0.2" rx="1"
      />
    ))}
    
    {/* Mid beam */}
    {[0, 1, 2].map(i => (
      <motion.rect
        key={`midbeam-${i}`}
        initial={{ width: 0 }}
        whileInView={{ width: 75 }}
        transition={{ duration: 0.8, delay: 2.0 + i * 0.15 }}
        viewport={{ once: true }}
        x={88 + i * 75} y="160" height="10" fill="hsl(var(--foreground))" opacity="0.15" rx="1"
      />
    ))}
    
    {/* Steel rod indicators */}
    {[0, 1, 2, 3].map(i => (
      <motion.circle
        key={`dot-${i}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 2.2 + i * 0.1 }}
        viewport={{ once: true }}
        cx={88 + i * 75} cy="240" r="4" fill="hsl(var(--accent))" opacity="0.6"
      />
    ))}
    
    <motion.text
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      transition={{ delay: 2.5 }}
      viewport={{ once: true }}
      x="200" y="275" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="Space Grotesk"
    >
      COLUMN & BEAM FRAMEWORK
    </motion.text>
  </svg>
);

const WallsScene = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    {/* Foundation */}
    <rect x="60" y="250" width="280" height="12" fill="hsl(var(--cement-gray))" opacity="0.3" rx="2" />
    
    {/* Columns */}
    {[0, 1, 2, 3].map(i => (
      <rect key={`wc-${i}`} x={80 + i * 75} y="80" width="14" height="170" fill="hsl(var(--foreground))" opacity="0.2" rx="2" />
    ))}
    
    {/* Walls growing up between columns */}
    {[0, 1, 2].map(i => (
      <motion.rect
        key={`wall-${i}`}
        initial={{ height: 0 }}
        whileInView={{ height: 155 }}
        transition={{ duration: 1.5, delay: 0.3 + i * 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        x={94 + i * 75} y="95" width="61" fill="hsl(var(--muted))" opacity="0.6" rx="1"
        style={{ transformOrigin: "bottom" }}
      />
    ))}
    
    {/* Pipe lines appearing */}
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 1.8 }}
      viewport={{ once: true }}
      d="M 120 100 L 120 240 L 200 240 L 200 100"
      stroke="hsl(var(--accent))" strokeWidth="3" fill="none" opacity="0.5"
      strokeLinecap="round"
    />
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 2.2 }}
      viewport={{ once: true }}
      d="M 280 120 L 280 240 L 320 240"
      stroke="hsl(var(--steel-blue))" strokeWidth="2.5" fill="none" opacity="0.4"
      strokeLinecap="round"
    />
    
    <motion.text
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      transition={{ delay: 3 }}
      viewport={{ once: true }}
      x="200" y="280" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="Space Grotesk"
    >
      WALLS & PLUMBING
    </motion.text>
  </svg>
);

const FinishScene = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    {/* Complete house outline */}
    <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
      {/* Walls */}
      <rect x="80" y="120" width="240" height="140" fill="hsl(var(--muted))" opacity="0.5" rx="3" />
      
      {/* Columns visible */}
      {[0, 1, 2, 3].map(i => (
        <rect key={`fc-${i}`} x={80 + i * 75} y="120" width="14" height="140" fill="hsl(var(--foreground))" opacity="0.15" rx="2" />
      ))}
    </motion.g>
    
    {/* Roof */}
    <motion.polygon
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      points="200,50 50,125 350,125"
      fill="hsl(var(--foreground))"
      style={{ transformOrigin: "center" }}
    />
    
    {/* Windows */}
    {[0, 1].map(row => (
      [0, 1, 2].map(col => (
        <motion.rect
          key={`win-${row}-${col}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2 + row * 0.2 + col * 0.15 }}
          viewport={{ once: true }}
          x={105 + col * 70}
          y={140 + row * 50}
          width="30" height="25"
          fill="hsl(var(--accent))"
          opacity="0.4"
          rx="2"
          style={{ transformOrigin: "center" }}
        />
      ))
    ))}
    
    {/* Door */}
    <motion.rect
      initial={{ height: 0 }}
      whileInView={{ height: 55 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      viewport={{ once: true }}
      x="185" y="205" width="30" fill="hsl(var(--foreground))" opacity="0.25" rx="2"
      style={{ transformOrigin: "bottom" }}
    />
    
    {/* Ground */}
    <rect x="0" y="260" width="400" height="40" fill="hsl(var(--muted))" opacity="0.3" rx="2" />
    
    {/* Completion sparkles */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.circle
        key={`sparkle-${i}`}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 1, delay: 2.5 + i * 0.2, repeat: 1 }}
        viewport={{ once: true }}
        cx={100 + i * 55}
        cy={100 + (i % 2) * 30}
        r="3"
        fill="hsl(var(--accent))"
      />
    ))}
    
    <motion.text
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.5 }}
      transition={{ delay: 2.8 }}
      viewport={{ once: true }}
      x="200" y="290" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11" fontFamily="Space Grotesk"
    >
      YOUR DREAM HOME — COMPLETE
    </motion.text>
  </svg>
);

const stages: StoryStage[] = [
  {
    id: "foundation",
    step: "01",
    title: "Strong Foundations Start With Quality Materials",
    description: "Every great structure begins below the surface. Premium cement and TMT steel bars form the backbone of your home.",
    highlights: ["Cement (OPC 53 / PPC)", "TMT Steel Bars (Fe500D)", "Sand & Aggregates"],
    scene: <FoundationScene />,
    accent: "from-accent/10 to-transparent",
  },
  {
    id: "structure",
    step: "02",
    title: "Precision Reinforcement for Structural Strength",
    description: "Columns and beams rise with engineered precision. The right steel grade ensures your structure stands for generations.",
    highlights: ["High-grade TMT Bars", "Structural Steel", "Binding Wire"],
    scene: <StructureScene />,
    accent: "from-primary/10 to-transparent",
  },
  {
    id: "walls",
    step: "03",
    title: "Walls That Protect, Pipes That Flow",
    description: "Quality bricks, plumbing, and sanitary fittings bring comfort and function to every room.",
    highlights: ["Sanitary Pipes", "Plumbing Fittings", "Bathroom Fixtures"],
    scene: <WallsScene />,
    accent: "from-steel-blue/10 to-transparent",
  },
  {
    id: "finish",
    step: "04",
    title: "From Foundation to Finish — Everything You Need",
    description: "Roof, windows, doors, and finishing touches transform a structure into your dream home.",
    highlights: ["Roofing Materials", "Windows & Doors", "Finishing Supplies"],
    scene: <FinishScene />,
    accent: "from-accent/10 to-transparent",
  },
];

const StoryCard = ({ stage, index }: { stage: StoryStage; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${stage.accent} rounded-3xl -z-10`} />
      
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 py-12 lg:py-20`}>
        {/* Scene */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full max-w-md lg:max-w-lg"
        >
          <div className="glass-panel rounded-2xl p-6 lg:p-8 aspect-[4/3] flex items-center justify-center">
            {stage.scene}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center gap-3">
            <span className="text-4xl font-bold text-accent/40" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stage.step}
            </span>
            <div className="w-12 h-px bg-accent/30" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {stage.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
            {stage.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {stage.highlights.map(item => (
              <span
                key={item}
                className="glass-panel px-4 py-2 rounded-full text-sm font-medium text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ScrollStorySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" ref={ref}>
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-3">
            Build Your House Journey
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From Ground to Glory
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Follow the construction journey and discover the right materials at every stage.
          </p>
        </motion.div>
      </div>

      {/* Timeline line */}
      <div className="hidden lg:block absolute left-1/2 top-[200px] bottom-[200px] w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Story stages */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-0">
        {stages.map((stage, i) => (
          <StoryCard key={stage.id} stage={stage} index={i} />
        ))}
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16 lg:mt-24"
      >
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-10 h-13 shadow-lg shadow-accent/20 hover:scale-105 transition-all">
          <Link to="/products">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Materials
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default ScrollStorySection;
