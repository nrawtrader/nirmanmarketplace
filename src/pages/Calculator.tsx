import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalculatorInput,
  HouseType,
  StructureType,
  WallThickness,
  MaterialEstimate,
  CostEstimate,
  estimateMaterials,
  estimateCost,
  formatCurrency,
} from "@/data/calculator";
import { Calculator as CalcIcon, Package, Hammer, Mountain, Boxes, Brick, ArrowRight, RotateCcw } from "lucide-react";

const Calculator = () => {
  const [input, setInput] = useState<CalculatorInput>({
    plotArea: 1000,
    floors: 1,
    houseType: "standard",
    structureType: "rcc",
    wallThickness: "9",
  });
  const [materials, setMaterials] = useState<MaterialEstimate | null>(null);
  const [costs, setCosts] = useState<CostEstimate | null>(null);

  const calculate = () => {
    const mat = estimateMaterials(input);
    setMaterials(mat);
    setCosts(estimateCost(mat));
  };

  const reset = () => {
    setMaterials(null);
    setCosts(null);
    setInput({ plotArea: 1000, floors: 1, houseType: "standard", structureType: "rcc", wallThickness: "9" });
  };

  const resultItems = materials && costs ? [
    { icon: Package, label: "Cement", value: `${materials.cement} bags`, cost: formatCurrency(costs.cement), color: "bg-muted" },
    { icon: Hammer, label: "Steel (TMT)", value: `${materials.steel} tons`, cost: formatCurrency(costs.steel), color: "bg-primary/10" },
    { icon: Mountain, label: "Sand", value: `${materials.sand} m³`, cost: formatCurrency(costs.sand), color: "bg-accent/10" },
    { icon: Boxes, label: "Aggregate", value: `${materials.aggregate} m³`, cost: formatCurrency(costs.aggregate), color: "bg-muted" },
    { icon: Brick, label: "Bricks", value: `${materials.bricks.toLocaleString("en-IN")}`, cost: formatCurrency(costs.bricks), color: "bg-destructive/10" },
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-accent/20">
              <CalcIcon className="w-4 h-4 text-accent" /> Smart Calculator
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              House Material Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enter your house details and get an instant estimate of construction materials with approximate costs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">House Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plot Area */}
                <div className="space-y-2">
                  <Label>Plot Area (sq ft)</Label>
                  <Input
                    type="number"
                    min={100}
                    max={10000}
                    value={input.plotArea}
                    onChange={(e) => setInput({ ...input, plotArea: Number(e.target.value) })}
                  />
                </div>

                {/* Floors */}
                <div className="space-y-2">
                  <Label>Number of Floors</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((f) => (
                      <button
                        key={f}
                        onClick={() => setInput({ ...input, floors: f })}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          input.floors === f
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:bg-secondary"
                        }`}
                      >
                        {f} {f === 1 ? "Floor" : "Floors"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* House Type */}
                <div className="space-y-2">
                  <Label>House Type</Label>
                  <RadioGroup
                    value={input.houseType}
                    onValueChange={(v) => setInput({ ...input, houseType: v as HouseType })}
                    className="grid grid-cols-3 gap-3"
                  >
                    {(["simple", "standard", "premium"] as const).map((type) => (
                      <label
                        key={type}
                        className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                          input.houseType === type
                            ? "border-accent bg-accent/10"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        <RadioGroupItem value={type} className="sr-only" />
                        <span className="text-sm font-medium capitalize text-foreground">{type}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {type === "simple" ? "Basic finish" : type === "standard" ? "Good finish" : "Luxury finish"}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Structure Type */}
                <div className="space-y-2">
                  <Label>Structure Type</Label>
                  <RadioGroup
                    value={input.structureType}
                    onValueChange={(v) => setInput({ ...input, structureType: v as StructureType })}
                    className="grid grid-cols-2 gap-3"
                  >
                    {([
                      { value: "rcc", label: "RCC Frame", desc: "Beams & columns" },
                      { value: "load-bearing", label: "Load Bearing", desc: "Wall supported" },
                    ] as const).map((st) => (
                      <label
                        key={st.value}
                        className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                          input.structureType === st.value
                            ? "border-accent bg-accent/10"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        <RadioGroupItem value={st.value} className="sr-only" />
                        <span className="text-sm font-medium text-foreground">{st.label}</span>
                        <span className="text-xs text-muted-foreground">{st.desc}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Wall Thickness */}
                <div className="space-y-2">
                  <Label>Wall Thickness (inches)</Label>
                  <div className="flex gap-2">
                    {(["4.5", "9", "13.5"] as const).map((w) => (
                      <button
                        key={w}
                        onClick={() => setInput({ ...input, wallThickness: w as WallThickness })}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          input.wallThickness === w
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:bg-secondary"
                        }`}
                      >
                        {w}"
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={calculate} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-11">
                    Calculate <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button variant="outline" onClick={reset} className="h-11">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {materials && costs ? (
                <>
                  <Card className="border-accent/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Estimated Materials</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        For {input.plotArea.toLocaleString()} sq ft × {input.floors} floor(s) — {input.houseType} {input.structureType.toUpperCase()}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resultItems.map((item) => (
                        <div key={item.label} className={`flex items-center gap-4 p-4 rounded-lg ${item.color}`}>
                          <item.icon className="w-8 h-8 text-foreground/60 shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.value}</p>
                          </div>
                          <span className="font-semibold text-foreground">{item.cost}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-primary-foreground/70 mb-1">Estimated Total Material Cost</p>
                      <p className="text-3xl font-bold">{formatCurrency(costs.total)}</p>
                      <p className="text-xs text-primary-foreground/50 mt-2">
                        *Approximate cost. Actual prices may vary by location and market conditions.
                      </p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <CalcIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Enter your house details</p>
                    <p className="text-sm">and click Calculate to see estimated materials</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
