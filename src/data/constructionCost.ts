/**
 * CONSTRUCTION COST CALCULATOR — LUCKNOW 2026
 *
 * Material quantities: IS 456:2000, CPWD specs, standard RCC framed structure.
 * Prices: verified from real Lucknow market data (June 2026).
 * Brands: only brands stocked by Nirman MarketPlace.
 */

export type QualityGrade = "basic" | "medium" | "premium";

export interface ConstructionInput {
  area: number;   // sq ft
  floors: number;
  state: string;
  city: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  icon: string;
  unit: string;
  quantityPerSqft: number;
  grades: {
    basic:   { label: string; ratePerUnit: number };
    medium:  { label: string; ratePerUnit: number };
    premium: { label: string; ratePerUnit: number };
  };
}

export interface PhaseItem {
  id: string;
  name: string;
  daysPerSqft: number;
  costPerSqft: number;
  gradeMultiplier: { basic: number; medium: number; premium: number };
}

// =============================================
// STATE & CITY DATA
// =============================================
export const STATES: Record<string, string[]> = {
  "Uttar Pradesh": ["Lucknow", "Noida", "Varanasi", "Agra", "Kanpur", "Prayagraj", "Gorakhpur"],
  "Maharashtra":   ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Delhi":         ["New Delhi", "Dwarka", "Rohini"],
  "Karnataka":     ["Bangalore", "Mysore", "Hubli"],
  "Tamil Nadu":    ["Chennai", "Coimbatore", "Madurai"],
  "Rajasthan":     ["Jaipur", "Jodhpur", "Udaipur"],
  "Gujarat":       ["Ahmedabad", "Surat", "Vadodara"],
  "Madhya Pradesh":["Bhopal", "Indore", "Jabalpur"],
  "West Bengal":   ["Kolkata", "Howrah", "Siliguri"],
  "Bihar":         ["Patna", "Gaya", "Muzaffarpur"],
  "Telangana":     ["Hyderabad", "Warangal"],
  "Punjab":        ["Chandigarh", "Ludhiana", "Amritsar"],
  "Haryana":       ["Gurugram", "Faridabad", "Karnal"],
};

export const STATE_MULTIPLIER: Record<string, number> = {
  "Uttar Pradesh":  1.0,
  "Maharashtra":    1.25,
  "Delhi":          1.35,
  "Karnataka":      1.15,
  "Tamil Nadu":     1.10,
  "Rajasthan":      0.95,
  "Gujarat":        1.05,
  "Madhya Pradesh": 0.92,
  "West Bengal":    1.0,
  "Bihar":          0.88,
  "Telangana":      1.12,
  "Punjab":         1.08,
  "Haryana":        1.20,
};

// =============================================
// RESOURCES
// Quantities per sq ft — standard RCC frame, G+0/G+1.
// Prices from Lucknow market, June 2026.
// =============================================
export const RESOURCES: ResourceItem[] = [
  {
    id: "cement",
    name: "Cement",
    icon: "🏗️",
    unit: "Bag (50 kg)",
    // IS 456 RCC + brickwork mortar + plastering = ~0.45 bags/sqft
    quantityPerSqft: 0.45,
    grades: {
      basic:   { label: "Bangur Powermax / ACC PPC",          ratePerUnit: 340 },
      medium:  { label: "UltraTech OPC 53 / ACC Concrete+",   ratePerUnit: 370 },
      premium: { label: "UltraTech Weather Plus / MP Birla Perfect Plus", ratePerUnit: 415 },
    },
  },
  {
    id: "steel",
    name: "Steel TMT Bars",
    icon: "⚙️",
    unit: "kg",
    // RCC frame structure, standard 1.2% steel in concrete = ~3.5 kg/sqft
    quantityPerSqft: 3.5,
    grades: {
      basic:   { label: "RHL Gold Fe500 (standard)",            ratePerUnit: 62 },
      medium:  { label: "RHL Gold Fe500 / Sigma Griplock Fe550D", ratePerUnit: 65 },
      premium: { label: "TATA Tiscon TMT Fe550D",               ratePerUnit: 70 },
    },
  },
  {
    id: "bricks",
    name: "Bricks (Eent)",
    icon: "🧱",
    unit: "piece",
    // Standard 9"×4.5"×3" brick with 10mm mortar joint: ~8.5 bricks/sqft of floor area
    quantityPerSqft: 8.5,
    grades: {
      basic:   { label: "Standard Red Brick",      ratePerUnit: 7  },
      medium:  { label: "Machine Made Brick",       ratePerUnit: 9  },
      premium: { label: "First Class Brick",        ratePerUnit: 12 },
    },
  },
  {
    id: "gitti",
    name: "Stone Chips (Gitti)",
    icon: "🪨",
    unit: "cft",
    // M20 mix: 0.84 cum gitti per cum concrete; ~0.6 cft per sqft total
    quantityPerSqft: 0.6,
    grades: {
      basic:   { label: "Local Crushed Stone",       ratePerUnit: 55 },
      medium:  { label: "20mm Stone Aggregate",      ratePerUnit: 65 },
      premium: { label: "Crushed Granite Chips",     ratePerUnit: 80 },
    },
  },
  {
    id: "maurang",
    name: "Coarse Sand (Maurang)",
    icon: "🏖️",
    unit: "cft",
    // Concrete + brickwork mortar + rough plaster: ~1.0 cft/sqft
    quantityPerSqft: 1.0,
    grades: {
      basic:   { label: "Local River Sand",           ratePerUnit: 50 },
      medium:  { label: "Washed River Sand (Maurang)", ratePerUnit: 65 },
      premium: { label: "Grade A River Sand",          ratePerUnit: 80 },
    },
  },
  {
    id: "balu",
    name: "Fine Sand (Balu)",
    icon: "🪣",
    unit: "cft",
    // Finish plaster + flooring bed: ~0.35 cft/sqft
    quantityPerSqft: 0.35,
    grades: {
      basic:   { label: "Local Fine Sand",         ratePerUnit: 25 },
      medium:  { label: "Washed Fine Sand (Balu)", ratePerUnit: 30 },
      premium: { label: "M-Sand (Manufactured)",   ratePerUnit: 38 },
    },
  },
  {
    id: "taar",
    name: "Binding Wire (Taar)",
    icon: "🔩",
    unit: "kg",
    // ~20–40 kg per 1000 sqft; 0.03 kg/sqft
    quantityPerSqft: 0.03,
    grades: {
      basic:   { label: "Standard Annealed Wire",    ratePerUnit: 85  },
      medium:  { label: "GI Binding Wire",           ratePerUnit: 100 },
      premium: { label: "Galvanized Binding Wire",   ratePerUnit: 115 },
    },
  },
  {
    id: "waterproofing",
    name: "Waterproofing Chemicals",
    icon: "💧",
    unit: "litre",
    // Roof, bathrooms, sunken areas: ~0.05 L/sqft
    quantityPerSqft: 0.05,
    grades: {
      basic:   { label: "Standard Waterproof Compound",  ratePerUnit: 120 },
      medium:  { label: "Dr Fixit LW / URP",             ratePerUnit: 165 },
      premium: { label: "SBR Polymer / Crystalline",     ratePerUnit: 280 },
    },
  },
];

// =============================================
// CONSTRUCTION PHASES
// =============================================
export const PHASES: PhaseItem[] = [
  { id: "design",      name: "Home Design & Approval",      daysPerSqft: 46, costPerSqft: 107.5, gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.3  } },
  { id: "excavation",  name: "Excavation",                  daysPerSqft: 14, costPerSqft: 52.88, gradeMultiplier: { basic: 0.85,medium: 1.0, premium: 1.15 } },
  { id: "foundation",  name: "Footing & Foundation",        daysPerSqft: 41, costPerSqft: 393,   gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.25 } },
  { id: "rcc",         name: "RCC Work — Columns & Slabs",  daysPerSqft: 17, costPerSqft: 262.5, gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.3  } },
  { id: "roof",        name: "Roof Slab",                   daysPerSqft: 37, costPerSqft: 219,   gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.25 } },
  { id: "brickwork",   name: "Brickwork & Plastering",      daysPerSqft: 8,  costPerSqft: 42.75, gradeMultiplier: { basic: 0.85,medium: 1.0, premium: 1.2  } },
  { id: "flooring",    name: "Flooring & Tiling",           daysPerSqft: 25, costPerSqft: 190,   gradeMultiplier: { basic: 0.6, medium: 1.0, premium: 1.6  } },
  { id: "electrical",  name: "Electric Wiring",             daysPerSqft: 14, costPerSqft: 52.88, gradeMultiplier: { basic: 0.7, medium: 1.0, premium: 1.5  } },
  { id: "plumbing",    name: "Water Supply & Plumbing",     daysPerSqft: 30, costPerSqft: 32.75, gradeMultiplier: { basic: 0.75,medium: 1.0, premium: 1.4  } },
  { id: "doors",       name: "Doors & Windows",             daysPerSqft: 15, costPerSqft: 100,   gradeMultiplier: { basic: 0.7, medium: 1.0, premium: 1.5  } },
];

// =============================================
// CALCULATION
// =============================================
export interface ResourceResult {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  unit: string;
  grade: QualityGrade;
  gradeLabel: string;
  amount: number;
}

export interface PhaseResult {
  id: string;
  name: string;
  cost: number;
  color: string;
}

export interface FullEstimate {
  resources: ResourceResult[];
  phases: PhaseResult[];
  totalCost: number;
  costPerSqft: number;
  area: number;
  floors: number;
}

const PHASE_COLORS = [
  "hsl(48, 96%, 53%)",
  "hsl(142, 71%, 35%)",
  "hsl(0, 0%, 15%)",
  "hsl(225, 73%, 50%)",
  "hsl(0, 84%, 55%)",
  "hsl(330, 50%, 35%)",
  "hsl(0, 0%, 60%)",
  "hsl(30, 90%, 55%)",
  "hsl(280, 60%, 40%)",
  "hsl(340, 80%, 65%)",
];

// Palette for resource donut chart (8 slices)
export const RESOURCE_COLORS = [
  "hsl(48,  96%, 53%)",   // cement   — yellow
  "hsl(225, 73%, 50%)",   // steel    — blue
  "hsl(0,   70%, 45%)",   // bricks   — red-brick
  "hsl(30,  60%, 40%)",   // gitti    — brown
  "hsl(200, 70%, 45%)",   // maurang  — teal
  "hsl(45,  80%, 65%)",   // balu     — sand
  "hsl(0,   0%,  40%)",   // taar     — dark grey
  "hsl(200, 90%, 35%)",   // waterproof— dark blue
];

export function calculateFullEstimate(
  input: ConstructionInput,
  resourceGrades: Record<string, QualityGrade>,
  overallGrade: QualityGrade = "medium"
): FullEstimate {
  const totalArea = input.area * input.floors;
  const regionMultiplier = STATE_MULTIPLIER[input.state] || 1.0;

  const resources: ResourceResult[] = RESOURCES.map((r) => {
    const grade = resourceGrades[r.id] || "medium";
    const gradeData = r.grades[grade];
    const quantity = Math.ceil(r.quantityPerSqft * totalArea);
    const amount = Math.round(quantity * gradeData.ratePerUnit * regionMultiplier);
    return { id: r.id, name: r.name, icon: r.icon, quantity, unit: r.unit, grade, gradeLabel: gradeData.label, amount };
  });

  const phases: PhaseResult[] = PHASES.map((p, i) => {
    const mult = p.gradeMultiplier[overallGrade];
    const cost = Math.round(p.costPerSqft * totalArea * mult * regionMultiplier);
    return { id: p.id, name: p.name, cost, color: PHASE_COLORS[i % PHASE_COLORS.length] };
  });

  const totalResourceCost = resources.reduce((s, r) => s + r.amount, 0);
  const totalPhaseCost = phases.reduce((s, p) => s + p.cost, 0);
  const totalCost = Math.round((totalResourceCost + totalPhaseCost) / 2);

  return {
    resources,
    phases,
    totalCost,
    costPerSqft: Math.round(totalCost / totalArea),
    area: input.area,
    floors: input.floors,
  };
}

export function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
