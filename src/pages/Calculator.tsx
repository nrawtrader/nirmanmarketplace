import { useState } from "react";
import Navbar from "@/components/Navbar";
import EstimateForm from "@/components/EstimateForm";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CalculatorInput,
  HouseType,
  StructureType,
  WallThickness,
  MaterialEstimate,
  CostEstimate,
  EstimationBreakdown,
  estimateMaterials,
  estimateCost,
  calculateBreakdown,
  formatCurrency,
} from "@/data/calculator";
import { Calculator as CalcIcon, Package, Hammer, Mountain, Boxes, Square, ArrowRight, RotateCcw, Info, ShieldCheck } from "lucide-react";

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
  const [breakdown, setBreakdown] = useState<EstimationBreakdown | null>(null);

  const calculate = () => {
    const mat = estimateMaterials(input);
    setMaterials(mat);
    setCosts(estimateCost(mat));
    setBreakdown(calculateBreakdown(input));
  };

  const reset = () => {
    setMaterials(null);
    setCosts(null);
    setBreakdown(null);
    setInput({ plotArea: 1000, floors: 1, houseType: "standard", structureType: "rcc", wallThickness: "9" });
  };

  const resultItems = materials && costs ? [
    { icon: Package, label: "Cement (50kg bags)", value: `${materials.cement} bags`, cost: formatCurrency(costs.cement), color: "bg-muted" },
    { icon: Hammer, label: "Steel (TMT Bars)", value: `${materials.steel} tons`, cost: formatCurrency(costs.steel), color: "bg-primary/10" },
    { icon: Mountain, label: "Sand (Fine Aggregate)", value: `${materials.sand} m³`, cost: formatCurrency(costs.sand), color: "bg-accent/10" },
    { icon: Boxes, label: "Coarse Aggregate", value: `${materials.aggregate} m³`, cost: formatCurrency(costs.aggregate), color: "bg-muted" },
    { icon: Square, label: "Bricks (Modular)", value: `${materials.bricks.toLocaleString("en-IN")} nos`, cost: formatCurrency(costs.bricks), color: "bg-destructive/10" },
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-accent/20">
              <CalcIcon className="w-4 h-4 text-accent" /> Engineering-Grade Calculator
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              House Material Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Component-wise estimation based on IS 456:2000 standards. Calculates foundation, columns, beams, slab, brickwork, and plastering separately for maximum accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">House Details</CardTitle>
                  <CardDescription>Enter your built-up area and construction preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plot Area */}
                  <div className="space-y-2">
                    <Label>Built-up Area (sq ft)</Label>
                    <Input
                      type="number"
                      min={200}
                      max={10000}
                      value={input.plotArea}
                      onChange={(e) => setInput({ ...input, plotArea: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">Total plinth area including walls (not carpet area)</p>
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
                          {f === 1 ? "G" : f === 2 ? "G+1" : f === 3 ? "G+2" : "G+3"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* House Type */}
                  <div className="space-y-2">
                    <Label>Construction Quality</Label>
                    <RadioGroup
                      value={input.houseType}
                      onValueChange={(v) => setInput({ ...input, houseType: v as HouseType })}
                      className="grid grid-cols-3 gap-3"
                    >
                      {([
                        { value: "simple", label: "Simple", desc: "230mm cols, 120mm slab", detail: "Basic structural sizing" },
                        { value: "standard", label: "Standard", desc: "300mm cols, 150mm slab", detail: "IS code recommended" },
                        { value: "premium", label: "Premium", desc: "350mm cols, 150mm slab", detail: "Heavy-duty structure" },
                      ] as const).map((type) => (
                        <label
                          key={type.value}
                          className={`flex flex-col items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                            input.houseType === type.value
                              ? "border-accent bg-accent/10"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          <RadioGroupItem value={type.value} className="sr-only" />
                          <span className="text-sm font-medium text-foreground">{type.label}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 text-center">{type.desc}</span>
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
                        { value: "rcc", label: "RCC Frame", desc: "Beams + Columns + Slab" },
                        { value: "load-bearing", label: "Load Bearing", desc: "Walls carry load" },
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
                    <Label>Wall Thickness</Label>
                    <div className="flex gap-2">
                      {([
                        { value: "4.5", label: '4.5" (Half brick)' },
                        { value: "9", label: '9" (Full brick)' },
                        { value: "13.5", label: '13.5" (1.5 brick)' },
                      ] as const).map((w) => (
                        <button
                          key={w.value}
                          onClick={() => setInput({ ...input, wallThickness: w.value as WallThickness })}
                          className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
                            input.wallThickness === w.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:bg-secondary"
                          }`}
                        >
                          {w.label}
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

              {/* Methodology note */}
              <Card className="border-border/50">
                <CardContent className="pt-5">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground text-sm">How we calculate</p>
                      <p>Component-wise estimation: Foundation (PCC + RCC footings) → Plinth beam → Columns → Floor beams → RCC slab → Brickwork → Plastering → Flooring PCC.</p>
                      <p>Material quantities use IS standard mix ratios — M20 (1:1.5:3) for RCC, M10 (1:4:8) for PCC, CM 1:6 for brickwork mortar, CM 1:4 for plaster.</p>
                      <p>Wastage factors: Cement 1%, Steel 2%, Sand/Aggregate 4%, Bricks 5% (per CPWD norms).</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {materials && costs && breakdown ? (
                <>
                  <Card className="border-accent/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Estimated Materials</CardTitle>
                      <CardDescription>
                        {input.plotArea.toLocaleString()} sq ft × {input.floors} floor(s) — {input.houseType} {input.structureType === "rcc" ? "RCC frame" : "Load bearing"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resultItems.map((item) => (
                        <div key={item.label} className={`flex items-center gap-4 p-4 rounded-lg ${item.color}`}>
                          <item.icon className="w-8 h-8 text-foreground/60 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.value}</p>
                          </div>
                          <span className="font-semibold text-foreground text-sm">{item.cost}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-primary-foreground/70 mb-1">Estimated Total Material Cost</p>
                      <p className="text-3xl font-bold">{formatCurrency(costs.total)}</p>
                       <p className="text-xs text-primary-foreground/50 mt-2 mb-4">
                         *Material cost only. Labour, finishing, fittings not included. Prices may vary by region.
                       </p>
                       <EstimateForm trigger={
                         <Button variant="secondary" className="h-11 px-6">
                           Get Estimate with Brands
                         </Button>
                       } />
                    </CardContent>
                  </Card>

                  {/* Detailed Breakdown */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Info className="w-4 h-4 text-accent" /> Detailed Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="concrete">
                          <AccordionTrigger className="text-sm">
                            Concrete Volumes (M20 RCC)
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Foundation (Footings)</span>
                                <span className="font-medium">{breakdown.foundation.concrete.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Plinth Beam</span>
                                <span className="font-medium">{breakdown.plinthBeam.concrete.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Columns ({input.floors} floor{input.floors > 1 ? "s" : ""})</span>
                                <span className="font-medium">{breakdown.columns.concrete.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Floor Beams</span>
                                <span className="font-medium">{breakdown.beams.concrete.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">RCC Slab</span>
                                <span className="font-medium">{breakdown.slab.concrete.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                                <span>Total RCC Concrete</span>
                                <span>{breakdown.totalConcrete.toFixed(2)} m³</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="pcc">
                          <AccordionTrigger className="text-sm">
                            PCC Volumes (M10)
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Foundation PCC (under footings)</span>
                                <span className="font-medium">{breakdown.foundation.pcc.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Flooring PCC (100mm)</span>
                                <span className="font-medium">{breakdown.flooringPcc.volume.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                                <span>Total PCC</span>
                                <span>{breakdown.totalPcc.toFixed(2)} m³</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="brickwork">
                          <AccordionTrigger className="text-sm">
                            Brickwork & Plastering
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Wall area (after deductions)</span>
                                <span className="font-medium">{breakdown.brickwork.area.toFixed(1)} m²</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Brickwork volume ({input.wallThickness}" thick)</span>
                                <span className="font-medium">{breakdown.brickwork.volume.toFixed(2)} m³</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Plaster area (both sides + ceiling)</span>
                                <span className="font-medium">{breakdown.plaster.area.toFixed(1)} m²</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Plaster mortar (12mm thick)</span>
                                <span className="font-medium">{breakdown.plaster.mortar.toFixed(2)} m³</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="assumptions">
                          <AccordionTrigger className="text-sm">
                            Key Assumptions
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              <li>• Isolated rectangular footings with 1.2–1.5m depth</li>
                              <li>• M20 grade concrete (1:1.5:3) for all RCC work</li>
                              <li>• M10 grade PCC (1:4:8) for leveling and flooring</li>
                              <li>• Steel: {input.structureType === "rcc" ? "1.0–1.5%" : "~0.5%"} of concrete volume (by density)</li>
                              <li>• Standard modular bricks: 190×90×90mm with 10mm mortar joints</li>
                              <li>• 500 bricks per m³ of brickwork</li>
                              <li>• 12mm plaster on all surfaces (CM 1:4)</li>
                              <li>• Brickwork mortar: CM 1:6 ratio</li>
                              <li>• Deductions for doors/windows: ~{input.houseType === "simple" ? 12 : input.houseType === "standard" ? 15 : 18} m² per floor</li>
                              <li>• Dry volume factor: 1.54× for voids & bulking</li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-muted-foreground">
                    <CalcIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Enter your house details</p>
                    <p className="text-sm">and click Calculate to see estimated materials</p>
                    <p className="text-xs mt-4 max-w-xs mx-auto">
                      Uses IS 456:2000 standards with component-wise calculation for foundation, structure, walls, and finishing
                    </p>
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
