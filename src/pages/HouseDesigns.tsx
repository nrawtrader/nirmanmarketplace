import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimateForm from "@/components/EstimateForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  HOUSE_DESIGNS,
  HouseDesign,
  Character,
  Shape,
} from "@/data/houseDesigns";
import {
  Home,
  Bed,
  Bath,
  Layers,
  Sparkles,
  Compass,
  Wand2,
  ArrowRight,
  Plus,
  Minus,
  Square,
} from "lucide-react";

const CHARACTERS: Character[] = ["Natural", "Rustic", "Industrial", "Classic", "Earthy", "Bright", "Bold"];
const SHAPES: Shape[] = ["Rectangle", "L-Shape", "Square", "Custom"];
const FEATURES = ["Pool", "Garden", "Pooja Room", "Courtyard", "Garage", "Balcony", "Modular Kitchen", "Family Lounge"];

const HouseDesigns = () => {
  // Builder state
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [stories, setStories] = useState(1);
  const [sqft, setSqft] = useState([1800]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [shape, setShape] = useState<Shape | null>(null);
  const [features, setFeatures] = useState<string[]>([]);

  const toggleFeature = (f: string) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const matches: HouseDesign[] = useMemo(() => {
    // Score each design for relevance
    const scored = HOUSE_DESIGNS.map((d) => {
      let score = 0;
      score -= Math.abs(d.bedrooms - bedrooms) * 4;
      score -= Math.abs(d.bathrooms - bathrooms) * 2;
      score -= Math.abs(d.stories - stories) * 5;
      score -= Math.abs(d.sqft - sqft[0]) / 200;
      if (character && d.character === character) score += 6;
      if (shape && d.shape === shape) score += 5;
      const matched = features.filter((f) => d.features.some((df) => df.toLowerCase().includes(f.toLowerCase())));
      score += matched.length * 3;
      return { d, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.d);
  }, [bedrooms, bathrooms, stories, sqft, character, shape, features]);

  const Stepper = ({
    label,
    value,
    onChange,
    icon: Icon,
    min = 1,
    max = 8,
  }: {
    label: string;
    value: number;
    onChange: (n: number) => void;
    icon: React.ElementType;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between bg-secondary/40 rounded-xl p-3 border border-border">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="w-4 h-4 text-accent" /> {label}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-7 h-7 rounded-md bg-background border border-border flex items-center justify-center hover:bg-accent/10"
          aria-label={`decrease ${label}`}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-bold text-foreground">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-7 h-7 rounded-md bg-background border border-border flex items-center justify-center hover:bg-accent/10"
          aria-label={`increase ${label}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="text-center mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-accent/20"
          >
            <Wand2 className="w-4 h-4 text-accent" /> Start your home design
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 font-display"
          >
            House Designs & Floor Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Pick your room list, area and style — we'll match the right floor plan from our curated library.
          </motion.p>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[340px_1fr] gap-8">
          {/* LEFT: Concept Builder */}
          <aside className="lg:sticky lg:top-28 self-start">
            <Card className="border-2 border-accent/20">
              <CardContent className="pt-6 space-y-5">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Home className="w-4 h-4 text-accent" /> Home Requirements
                </div>

                <Stepper label="Bedrooms" value={bedrooms} onChange={setBedrooms} icon={Bed} min={1} max={6} />
                <Stepper label="Bathrooms" value={bathrooms} onChange={setBathrooms} icon={Bath} min={1} max={6} />
                <Stepper label="Stories" value={stories} onChange={setStories} icon={Layers} min={1} max={3} />

                <div className="space-y-2 bg-secondary/40 rounded-xl p-3 border border-border">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="flex items-center gap-2"><Square className="w-4 h-4 text-accent" /> Total Size</span>
                    <span className="font-bold">{sqft[0].toLocaleString("en-IN")} sqft</span>
                  </div>
                  <Slider value={sqft} onValueChange={setSqft} min={400} max={5000} step={100} />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Smaller</span><span>Larger</span>
                  </div>
                </div>

                {/* Character */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Character
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CHARACTERS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCharacter(character === c ? null : c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          character === c
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background text-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shape */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Shape
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SHAPES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setShape(shape === s ? null : s)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          shape === s
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background text-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                    Features
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FEATURES.map((f) => (
                      <button
                        key={f}
                        onClick={() => toggleFeature(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          features.includes(f)
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background text-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <EstimateForm
                  trigger={
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11">
                      <Wand2 className="w-4 h-4 mr-2" /> Request Custom Design
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </aside>

          {/* RIGHT: Gallery */}
          <section>
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Matching Floor Plans</h2>
                <p className="text-sm text-muted-foreground">
                  Best matches for your requirements, ranked by relevance.
                </p>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {matches.length} designs
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {matches.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border hover:border-accent/40 h-full flex flex-col">
                    <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                      <img
                        src={d.image}
                        alt={d.title}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-background/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        {d.character}
                      </span>
                    </div>
                    <CardContent className="pt-4 flex flex-col flex-1">
                      <h3 className="font-bold text-foreground text-base leading-tight">{d.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{d.designer}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="text-[11px] bg-secondary px-2 py-0.5 rounded-full font-semibold">
                          {d.bedrooms} bd
                        </span>
                        <span className="text-[11px] bg-secondary px-2 py-0.5 rounded-full font-semibold">
                          {d.bathrooms} ba
                        </span>
                        <span className="text-[11px] bg-secondary px-2 py-0.5 rounded-full font-semibold">
                          {d.sqft.toLocaleString("en-IN")} ft²
                        </span>
                        <span className="text-[11px] bg-secondary px-2 py-0.5 rounded-full font-semibold">
                          {d.stories === 1 ? "G" : d.stories === 2 ? "G+1" : "G+2"}
                        </span>
                      </div>
                      <EstimateForm
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-auto w-full hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                          >
                            Get Quote for this Plan <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        }
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HouseDesigns;
