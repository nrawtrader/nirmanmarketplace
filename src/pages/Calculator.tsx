import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimateForm from "@/components/EstimateForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ConstructionInput,
  QualityGrade,
  STATES,
  RESOURCES,
  calculateFullEstimate,
  FullEstimate,
  formatINR,
} from "@/data/constructionCost";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";
import { Calculator as CalcIcon, ArrowRight, RotateCcw, IndianRupee, TrendingUp, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Calculator = () => {
  const [input, setInput] = useState<ConstructionInput>({
    area: 2000,
    floors: 1,
    state: "Uttar Pradesh",
    city: "Lucknow",
  });
  const [resourceGrades, setResourceGrades] = useState<Record<string, QualityGrade>>(
    Object.fromEntries(RESOURCES.map((r) => [r.id, "medium" as QualityGrade]))
  );
  const [result, setResult] = useState<FullEstimate | null>(null);
  const [calculated, setCalculated] = useState(false);

  const cities = useMemo(() => STATES[input.state] || [], [input.state]);

  const calculate = () => {
    const est = calculateFullEstimate(input, resourceGrades);
    setResult(est);
    setCalculated(true);
  };

  const reset = () => {
    setResult(null);
    setCalculated(false);
    setInput({ area: 2000, floors: 1, state: "Uttar Pradesh", city: "Lucknow" });
    setResourceGrades(Object.fromEntries(RESOURCES.map((r) => [r.id, "medium"])));
  };

  const setGrade = (resourceId: string, grade: QualityGrade) => {
    setResourceGrades((prev) => ({ ...prev, [resourceId]: grade }));
    if (calculated) {
      // Recalculate live
      const newGrades = { ...resourceGrades, [resourceId]: grade };
      setResult(calculateFullEstimate(input, newGrades));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-accent/20"
          >
            <CalcIcon className="w-4 h-4 text-accent" /> Home Construction Cost Calculator
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 font-display"
          >
            Cement, Steel & Sanitary Cost Estimator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Get accurate material estimates for your construction project
          </motion.p>
        </div>

        {/* Input Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
          <Card className="border-2 border-accent/20">
            <CardContent className="pt-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Select State</Label>
                  <Select
                    value={input.state}
                    onValueChange={(v) => {
                      setInput({ ...input, state: v, city: STATES[v]?.[0] || "" });
                    }}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(STATES).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Select City</Label>
                  <Select value={input.city} onValueChange={(v) => setInput({ ...input, city: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Area (Sq. Feet)</Label>
                  <Input
                    type="number"
                    min={500}
                    max={20000}
                    value={input.area}
                    onChange={(e) => setInput({ ...input, area: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Floors</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((f) => (
                      <button
                        key={f}
                        onClick={() => setInput({ ...input, floors: f })}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                          input.floors === f
                            ? "bg-accent text-accent-foreground border-accent shadow-md"
                            : "bg-card text-foreground border-border hover:bg-secondary"
                        }`}
                      >
                        {f === 1 ? "G" : f === 2 ? "G+1" : "G+2"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculate} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-10 font-semibold">
                    Calculate <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button variant="outline" onClick={reset} size="icon" className="h-10 w-10 shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Summary Bar */}
              <div className="bg-primary text-primary-foreground py-4 mb-10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-primary-foreground/70">Cost per sqft of Construction</p>
                      <p className="text-xl font-bold">₹{result.costPerSqft.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-primary-foreground/70">Total Estimated Cost</p>
                      <p className="text-xl font-bold">{formatINR(result.totalCost)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-primary-foreground/70">Total Built-up Area</p>
                      <p className="text-xl font-bold">{(result.area * result.floors).toLocaleString("en-IN")} sq ft</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
                {/* Donut Chart */}
                <div className="max-w-xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-center">Cost Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={result.resources}
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={130}
                              dataKey="amount"
                              nameKey="name"
                              paddingAngle={2}
                              label={({ name }) => name}
                              labelLine
                            >
                              {result.resources.map((r, i) => (
                                <Cell key={r.id} fill={["hsl(48, 96%, 53%)", "hsl(225, 73%, 50%)", "hsl(142, 71%, 35%)"][i]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: number) => formatINR(value)}
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                color: "hsl(var(--foreground))",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Resource Allocation Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-center">Cost by Resource Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    {/* Table Header */}
                    <div className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-0 bg-accent/20 rounded-t-lg border border-accent/30 min-w-[700px]">
                      <div className="px-4 py-3 font-bold text-sm">Resource</div>
                      <div className="px-4 py-3 font-bold text-sm text-center">Quantity</div>
                      <div className="px-4 py-3 font-bold text-sm text-center">Quality</div>
                      <div className="px-4 py-3 font-bold text-sm text-right">Amount</div>
                    </div>

                    {/* Table Body */}
                    <div className="border border-t-0 border-border rounded-b-lg divide-y divide-border min-w-[700px]">
                      {result.resources.map((resource) => {
                        const resConfig = RESOURCES.find((r) => r.id === resource.id)!;
                        return (
                          <div
                            key={resource.id}
                            className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-0 items-center hover:bg-muted/30 transition-colors"
                          >
                            {/* Name */}
                            <div className="px-4 py-4 flex items-center gap-3">
                              <span className="text-xl">{resource.icon}</span>
                              <span className="font-semibold text-sm text-foreground">{resource.name}</span>
                            </div>

                            {/* Quantity */}
                            <div className="px-4 py-4 text-center">
                              <span className="font-bold text-foreground">{resource.quantity.toLocaleString("en-IN")}</span>
                              <span className="text-xs text-muted-foreground ml-1">{resource.unit}</span>
                            </div>

                            {/* Quality Radio Buttons */}
                            <div className="px-4 py-4">
                              <RadioGroup
                                value={resourceGrades[resource.id]}
                                onValueChange={(v) => setGrade(resource.id, v as QualityGrade)}
                                className="flex justify-around"
                              >
                                {(["basic", "medium", "premium"] as const).map((grade) => (
                                  <label
                                    key={grade}
                                    className="flex flex-col items-center gap-1 cursor-pointer group"
                                  >
                                    <RadioGroupItem value={grade} className="border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground" />
                                    <span className={`text-xs text-center leading-tight ${
                                      resourceGrades[resource.id] === grade
                                        ? "font-semibold text-foreground"
                                        : "text-muted-foreground"
                                    }`}>
                                      {resConfig.grades[grade].label}
                                    </span>
                                  </label>
                                ))}
                              </RadioGroup>
                            </div>

                            {/* Amount */}
                            <div className="px-4 py-4 text-right">
                              <span className="font-bold text-foreground">{formatINR(resource.amount)}</span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Total Row */}
                      <div className="grid grid-cols-[2fr_1fr_3fr_1fr] gap-0 items-center bg-accent/10">
                        <div className="px-4 py-4 font-bold text-foreground text-sm">Total Amount</div>
                        <div className="px-4 py-4" />
                        <div className="px-4 py-4 text-center font-bold text-muted-foreground">INR</div>
                        <div className="px-4 py-4 text-right font-bold text-lg text-foreground">
                          {formatINR(result.resources.reduce((s, r) => s + r.amount, 0))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4 text-sm">
                    *Estimates based on {input.city}, {input.state} rates. Actual costs may vary by ±10-15%.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <EstimateForm trigger={
                      <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base font-semibold">
                        Get Detailed Quote from Nirman
                      </Button>
                    } />
                    <Button variant="outline" size="lg" className="h-12 px-8" onClick={() => window.print()}>
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto text-center px-4 py-16"
          >
            <CalcIcon className="w-20 h-20 mx-auto mb-6 text-muted-foreground/20" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Enter your house details</h2>
            <p className="text-muted-foreground">
              Select your state, city and area to get a complete phase-wise construction cost breakdown with timeline tracking
            </p>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
