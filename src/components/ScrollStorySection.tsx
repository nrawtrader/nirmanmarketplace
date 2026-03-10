import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface StoryStage {
  id: string;
  step: string;
  title: string;
  description: string;
  highlights: string[];
  color: string;
}

const stages: StoryStage[] = [
  {
    id: "foundation",
    step: "01",
    title: "Strong Foundations Start With Quality Materials",
    description: "Every great structure begins below the surface. Premium cement and TMT steel bars form the backbone of your home.",
    highlights: ["Cement (OPC 53 / PPC)", "TMT Steel Bars (Fe500D)", "Sand & Aggregates"],
    color: "accent",
  },
  {
    id: "structure",
    step: "02",
    title: "Precision Reinforcement for Structural Strength",
    description: "Columns and beams rise with engineered precision. The right steel grade ensures your structure stands for generations.",
    highlights: ["High-grade TMT Bars", "Structural Steel", "Binding Wire"],
    color: "primary",
  },
  {
    id: "walls",
    step: "03",
    title: "Walls That Protect, Pipes That Flow",
    description: "Quality bricks, plumbing, and sanitary fittings bring comfort and function to every room.",
    highlights: ["Sanitary Pipes", "Plumbing Fittings", "Bathroom Fixtures"],
    color: "accent",
  },
  {
    id: "finish",
    step: "04",
    title: "From Foundation to Finish — Everything You Need",
    description: "Roof, windows, doors, and finishing touches transform a structure into your dream home.",
    highlights: ["Roofing Materials", "Windows & Doors", "Finishing Supplies"],
    color: "primary",
  },
];

/* ---------- Scene Components ---------- */

const FoundationScene = ({ progress }: { progress: number }) => (
  <svg viewBox="0 0 500 350" className="w-full h-full">
    <rect x="0" y="270" width="500" height="80" fill="hsl(var(--muted))" rx="2" />
    <rect
      x="60" y="220" width={Math.min(progress * 4, 1) * 380} height="55"
      fill="hsl(var(--foreground))" opacity="0.12" rx="4"
    />
    {[...Array(8)].map((_, i) => (
      <line
        key={`h-${i}`}
        x1="80" y1={228 + i * 6} x2={80 + Math.max(0, Math.min((progress - 0.3) * 3, 1)) * 340} y2={228 + i * 6}
        stroke="hsl(var(--cement-gray))" strokeWidth="2" opacity={Math.max(0, Math.min((progress - 0.25) * 4, 0.6))}
      />
    ))}
    {[...Array(10)].map((_, i) => (
      <line
        key={`v-${i}`}
        x1={90 + i * 34} y1="224" x2={90 + i * 34} y2={224 + Math.max(0, Math.min((progress - 0.4) * 3, 1)) * 48}
        stroke="hsl(var(--cement-gray))" strokeWidth="2" opacity={Math.max(0, Math.min((progress - 0.35) * 4, 0.5))}
      />
    ))}
    <rect
      x="62" y="222" width="376" height={Math.max(0, Math.min((progress - 0.6) * 3, 1)) * 50}
      fill="hsl(var(--cement-gray))" opacity={Math.max(0, Math.min((progress - 0.55) * 3, 0.35))} rx="3"
    />
    <text
      x="250" y="330" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11"
      fontFamily="Space Grotesk" opacity={Math.max(0, Math.min((progress - 0.8) * 5, 0.5))}
    >
      REINFORCED FOUNDATION
    </text>
  </svg>
);

const StructureScene = ({ progress }: { progress: number }) => (
  <svg viewBox="0 0 500 350" className="w-full h-full">
    <rect x="60" y="290" width="380" height="18" fill="hsl(var(--cement-gray))" opacity="0.3" rx="2" />
    {[0, 1, 2, 3, 4].map(i => (
      <rect
        key={`col-${i}`}
        x={80 + i * 80} y={290 - Math.min(progress * 2.5, 1) * 200} width="18"
        height={Math.min(progress * 2.5, 1) * 200}
        fill="hsl(var(--foreground))" opacity="0.22" rx="2"
      />
    ))}
    {[0, 1, 2, 3].map(i => (
      <rect
        key={`beam-${i}`}
        x={98 + i * 80} y="90" height="12"
        width={Math.max(0, Math.min((progress - 0.4) * 3, 1)) * 62}
        fill="hsl(var(--foreground))" opacity="0.18" rx="1"
      />
    ))}
    {[0, 1, 2, 3].map(i => (
      <rect
        key={`mid-${i}`}
        x={98 + i * 80} y="185" height="10"
        width={Math.max(0, Math.min((progress - 0.55) * 3, 1)) * 62}
        fill="hsl(var(--foreground))" opacity="0.14" rx="1"
      />
    ))}
    {[0, 1, 2, 3, 4].map(i => (
      <circle
        key={`d-${i}`}
        cx={89 + i * 80} cy="290" r={Math.max(0, Math.min((progress - 0.7) * 5, 1)) * 5}
        fill="hsl(var(--accent))" opacity="0.6"
      />
    ))}
    <text
      x="250" y="330" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11"
      fontFamily="Space Grotesk" opacity={Math.max(0, Math.min((progress - 0.8) * 5, 0.5))}
    >
      COLUMN & BEAM FRAMEWORK
    </text>
  </svg>
);

const WallsScene = ({ progress }: { progress: number }) => (
  <svg viewBox="0 0 500 350" className="w-full h-full">
    <rect x="60" y="300" width="380" height="12" fill="hsl(var(--cement-gray))" opacity="0.3" rx="2" />
    {[0, 1, 2, 3, 4].map(i => (
      <rect key={`wc-${i}`} x={80 + i * 80} y="100" width="14" height="200" fill="hsl(var(--foreground))" opacity="0.18" rx="2" />
    ))}
    {[0, 1, 2, 3].map(i => (
      <rect
        key={`wall-${i}`}
        x={94 + i * 80}
        y={300 - Math.min(progress * 2, 1) * 190}
        width="66"
        height={Math.min(progress * 2, 1) * 190}
        fill="hsl(var(--muted))" opacity="0.55" rx="1"
      />
    ))}
    <line
      x1="140" y1={300 - Math.max(0, Math.min((progress - 0.5) * 3, 1)) * 190}
      x2="140" y2="300"
      stroke="hsl(var(--accent))" strokeWidth="3"
      opacity={Math.max(0, Math.min((progress - 0.45) * 3, 0.5))} strokeLinecap="round"
    />
    <line
      x1="140" y1="295" x2={140 + Math.max(0, Math.min((progress - 0.6) * 4, 1)) * 80} y2="295"
      stroke="hsl(var(--accent))" strokeWidth="3"
      opacity={Math.max(0, Math.min((progress - 0.55) * 3, 0.5))} strokeLinecap="round"
    />
    <line
      x1="300" y1={300 - Math.max(0, Math.min((progress - 0.65) * 4, 1)) * 180}
      x2="300" y2="300"
      stroke="hsl(var(--steel-blue))" strokeWidth="2.5"
      opacity={Math.max(0, Math.min((progress - 0.6) * 3, 0.4))} strokeLinecap="round"
    />
    <text
      x="250" y="335" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11"
      fontFamily="Space Grotesk" opacity={Math.max(0, Math.min((progress - 0.85) * 5, 0.5))}
    >
      WALLS & PLUMBING
    </text>
  </svg>
);

const FinishScene = ({ progress }: { progress: number }) => (
  <svg viewBox="0 0 500 350" className="w-full h-full">
    <g opacity={Math.min(progress * 3, 1)}>
      <rect x="80" y="130" width="340" height="170" fill="hsl(var(--muted))" opacity="0.5" rx="3" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={`fc-${i}`} x={80 + i * 80} y="130" width="14" height="170" fill="hsl(var(--foreground))" opacity="0.14" rx="2" />
      ))}
    </g>
    <polygon
      points="250,50 40,135 460,135"
      fill="hsl(var(--foreground))"
      opacity={Math.max(0, Math.min((progress - 0.2) * 3, 0.25))}
    />
    {[0, 1].map(row =>
      [0, 1, 2, 3].map(col => (
        <rect
          key={`win-${row}-${col}`}
          x={110 + col * 75} y={155 + row * 55}
          width={Math.max(0, Math.min((progress - 0.4 - row * 0.1 - col * 0.05) * 5, 1)) * 30}
          height={Math.max(0, Math.min((progress - 0.4 - row * 0.1 - col * 0.05) * 5, 1)) * 25}
          fill="hsl(var(--accent))" opacity="0.4" rx="2"
        />
      ))
    )}
    <rect
      x="235" y={300 - Math.max(0, Math.min((progress - 0.6) * 4, 1)) * 60}
      width="30" height={Math.max(0, Math.min((progress - 0.6) * 4, 1)) * 60}
      fill="hsl(var(--foreground))" opacity="0.22" rx="2"
    />
    <rect x="0" y="300" width="500" height="50" fill="hsl(var(--muted))" opacity="0.25" rx="2" />
    {progress > 0.85 && [...Array(5)].map((_, i) => (
      <circle
        key={`sp-${i}`}
        cx={120 + i * 70} cy={100 + (i % 2) * 40} r="3"
        fill="hsl(var(--accent))"
        opacity={Math.sin((progress - 0.85) * 20 + i) * 0.5 + 0.5}
      />
    ))}
    <text
      x="250" y="340" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11"
      fontFamily="Space Grotesk" opacity={Math.max(0, Math.min((progress - 0.9) * 10, 0.5))}
    >
      YOUR DREAM HOME — COMPLETE
    </text>
  </svg>
);

const sceneComponents = [FoundationScene, StructureScene, WallsScene, FinishScene];

/* ---------- Sticky Stage ---------- */

const StickyStage = ({ stage, index }: { stage: StoryStage; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const scaleScene = useTransform(scrollYProgress, [0.05, 0.25], [0.9, 1]);
  const textX = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    [index % 2 === 0 ? 60 : -60, 0]
  );

  const SceneComponent = sceneComponents[index];

  return (
    <div ref={ref} className="min-h-[120vh] relative">
      <motion.div
        style={{ opacity }}
        className="sticky top-0 h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
            {/* Scene */}
            <motion.div style={{ scale: scaleScene }} className="flex-1 w-full max-w-xl">
              <div className="glass-panel rounded-3xl p-6 lg:p-10 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${stage.color}/5 to-transparent rounded-3xl`} />
                <ProgressDrivenScene scrollProgress={scrollYProgress} index={index} />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div style={{ x: textX }} className="flex-1 space-y-6 max-w-lg">
              <div className="inline-flex items-center gap-4">
                <span className="text-6xl lg:text-7xl font-bold text-accent/20" style={{ fontFamily: "'Space Grotesk'" }}>
                  {stage.step}
                </span>
                <div className="w-16 h-px bg-accent/30" />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
                {stage.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                {stage.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {stage.highlights.map((item) => (
                  <span
                    key={item}
                    className="glass-panel px-4 py-2.5 rounded-full text-sm font-medium text-foreground/80 hover:border-accent/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* Progress-driven scene wrapper */
const ProgressDrivenScene = ({ scrollProgress, index }: { scrollProgress: any; index: number }) => {
  const progress = useTransform(scrollProgress, [0.15, 0.85], [0, 1]);
  const SceneComponent = sceneComponents[index];

  // We need to use a state to make the SVG re-render
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  const [, useState2] = useState(0);
  
  // Use useMotionValueEvent to track progress
  const { useMotionValueEvent: _unused } = require("framer-motion");

  return <ProgressScene scrollProgress={scrollProgress} index={index} />;
};

// Simpler approach: use useInView-based animation with framer-motion
import { useState as useState2 } from "react";

const ProgressScene = ({ scrollProgress, index }: { scrollProgress: any; index: number }) => {
  const [progress, setProgress] = useState2(0);
  const mapped = useTransform(scrollProgress, [0.15, 0.85], [0, 1]);

  useMotionValueEvent(mapped, "change", (v: number) => setProgress(v));

  const SceneComponent = sceneComponents[index];
  return <SceneComponent progress={progress} />;
};

import { useMotionValueEvent } from "framer-motion";

/* ---------- Main Section ---------- */

const ScrollStorySection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden">
      {/* Section header */}
      <div ref={headerRef} className="section-padding pb-0 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-semibold text-accent uppercase tracking-[0.25em] mb-4">
            Build Your House Journey
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            From Ground to Glory
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Follow the construction journey and discover the right materials at every stage.
          </p>
        </motion.div>
      </div>

      {/* Story stages */}
      {stages.map((stage, i) => (
        <StickyStage key={stage.id} stage={stage} index={i} />
      ))}

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-20 lg:py-32"
      >
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Ready to Start Building?
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Get all the materials you need at the best prices, delivered to your site.
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
