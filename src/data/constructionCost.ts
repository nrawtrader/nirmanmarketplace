/**
 * COMPREHENSIVE CONSTRUCTION COST CALCULATOR
 * 
 * Inspired by UltraTech's phase-wise cost breakdown system.
 * Covers all construction phases from design to finishing.
 * Rates based on 2024-25 Indian market averages.
 */

export type QualityGrade = "basic" | "medium" | "premium";

export interface ConstructionInput {
  area: number;        // sq ft
  floors: number;
  state: string;
  city: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  icon: string;
  unit: string;
  quantityPerSqft: number;    // quantity needed per sq ft of construction
  grades: {
    basic: { label: string; ratePerUnit: number };
    medium: { label: string; ratePerUnit: number };
    premium: { label: string; ratePerUnit: number };
  };
}

export interface PhaseItem {
  id: string;
  name: string;
  daysPerSqft: number;       // days per 1000 sqft
  costPerSqft: number;       // base cost per sqft (medium grade)
  gradeMultiplier: { basic: number; medium: number; premium: number };
}

// =============================================
// STATE & CITY DATA (for regional pricing)
// =============================================
export const STATES: Record<string, string[]> = {
  "Uttar Pradesh": ["Lucknow", "Noida", "Varanasi", "Agra", "Kanpur", "Prayagraj", "Gorakhpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
  "Haryana": ["Gurugram", "Faridabad", "Karnal"],
};

// Regional cost multiplier (base = 1.0 for UP)
export const STATE_MULTIPLIER: Record<string, number> = {
  "Uttar Pradesh": 1.0,
  "Maharashtra": 1.25,
  "Delhi": 1.35,
  "Karnataka": 1.15,
  "Tamil Nadu": 1.10,
  "Rajasthan": 0.95,
  "Gujarat": 1.05,
  "Madhya Pradesh": 0.92,
  "West Bengal": 1.0,
  "Bihar": 0.88,
  "Telangana": 1.12,
  "Punjab": 1.08,
  "Haryana": 1.20,
};

// =============================================
// RESOURCES WITH QUALITY GRADES
// =============================================
export const RESOURCES: ResourceItem[] = [
  {
    id: "cement",
    name: "Cement",
    icon: "🏗️",
    unit: "Bag",
    quantityPerSqft: 0.45,
    grades: {
      basic: { label: "Normal PPC/PSC", ratePerUnit: 320 },
      medium: { label: "UltraTech / ACC", ratePerUnit: 382 },
      premium: { label: "UltraTech Super", ratePerUnit: 430 },
    },
  },
  {
    id: "steel",
    name: "Steel",
    icon: "⚙️",
    unit: "KG",
    quantityPerSqft: 3.5,
    grades: {
      basic: { label: "Basic Grade", ratePerUnit: 55 },
      medium: { label: "Tata Tiscon / JSW", ratePerUnit: 65 },
      premium: { label: "SAIL TMT Fe500D", ratePerUnit: 78 },
    },
  },
  {
    id: "sanitary",
    name: "Sanitary Fittings",
    icon: "🚿",
    unit: "Per Sq feet",
    quantityPerSqft: 1.0,
    grades: {
      basic: { label: "Basic Grade", ratePerUnit: 40 },
      medium: { label: "Medium Grade", ratePerUnit: 62 },
      premium: { label: "Premium Grade", ratePerUnit: 100 },
    },
  },
];

// =============================================
// CONSTRUCTION PHASES (for timeline)
// =============================================
export const PHASES: PhaseItem[] = [
  { id: "design", name: "Home Design & Approval", daysPerSqft: 46, costPerSqft: 107.5, gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.3 } },
  { id: "excavation", name: "Excavation", daysPerSqft: 14, costPerSqft: 52.88, gradeMultiplier: { basic: 0.85, medium: 1.0, premium: 1.15 } },
  { id: "foundation", name: "Footing & Foundation", daysPerSqft: 41, costPerSqft: 393, gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.25 } },
  { id: "rcc", name: "RCC Work - Columns & Slabs", daysPerSqft: 17, costPerSqft: 262.5, gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.3 } },
  { id: "roof", name: "Roof Slab", daysPerSqft: 37, costPerSqft: 219, gradeMultiplier: { basic: 0.8, medium: 1.0, premium: 1.25 } },
  { id: "brickwork", name: "Brickwork and Plastering", daysPerSqft: 8, costPerSqft: 42.75, gradeMultiplier: { basic: 0.85, medium: 1.0, premium: 1.2 } },
  { id: "flooring", name: "Flooring & Tiling", daysPerSqft: 25, costPerSqft: 190, gradeMultiplier: { basic: 0.6, medium: 1.0, premium: 1.6 } },
  { id: "electrical", name: "Electric Wiring", daysPerSqft: 14, costPerSqft: 52.88, gradeMultiplier: { basic: 0.7, medium: 1.0, premium: 1.5 } },
  { id: "plumbing", name: "Water Supply & Plumbing", daysPerSqft: 30, costPerSqft: 32.75, gradeMultiplier: { basic: 0.75, medium: 1.0, premium: 1.4 } },
  { id: "doors", name: "Door & Windows", daysPerSqft: 15, costPerSqft: 100, gradeMultiplier: { basic: 0.7, medium: 1.0, premium: 1.5 } },
];

// =============================================
// CALCULATION FUNCTIONS
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
  "hsl(48, 96%, 53%)",   // yellow
  "hsl(142, 71%, 35%)",  // green
  "hsl(0, 0%, 15%)",     // black
  "hsl(225, 73%, 50%)",  // blue
  "hsl(0, 84%, 55%)",    // red
  "hsl(330, 50%, 35%)",  // maroon
  "hsl(0, 0%, 60%)",     // gray
  "hsl(30, 90%, 55%)",   // orange
  "hsl(280, 60%, 40%)",  // purple
  "hsl(340, 80%, 65%)",  // pink
];

export function calculateFullEstimate(
  input: ConstructionInput,
  resourceGrades: Record<string, QualityGrade>,
  overallGrade: QualityGrade = "medium"
): FullEstimate {
  const totalArea = input.area * input.floors;
  const regionMultiplier = STATE_MULTIPLIER[input.state] || 1.0;

  // Calculate resources
  const resources: ResourceResult[] = RESOURCES.map((r) => {
    const grade = resourceGrades[r.id] || "medium";
    const gradeData = r.grades[grade];
    const quantity = Math.ceil(r.quantityPerSqft * totalArea);
    const amount = Math.round(quantity * gradeData.ratePerUnit * regionMultiplier);
    return {
      id: r.id,
      name: r.name,
      icon: r.icon,
      quantity,
      unit: r.unit,
      grade,
      gradeLabel: gradeData.label,
      amount,
    };
  });

  // Calculate phases
  const phases: PhaseResult[] = PHASES.map((p, i) => {
    const mult = p.gradeMultiplier[overallGrade];
    const cost = Math.round(p.costPerSqft * totalArea * mult * regionMultiplier);
    const days = Math.ceil(p.daysPerSqft * (totalArea / 1000));
    return {
      id: p.id,
      name: p.name,
      days,
      cost,
      color: PHASE_COLORS[i % PHASE_COLORS.length],
    };
  });

  const totalResourceCost = resources.reduce((s, r) => s + r.amount, 0);
  const totalPhaseCost = phases.reduce((s, p) => s + p.cost, 0);
  const totalCost = Math.round((totalResourceCost + totalPhaseCost) / 2); // averaged
  const totalDays = phases.reduce((s, p) => s + p.days, 0);

  return {
    resources,
    phases,
    totalCost,
    costPerSqft: Math.round(totalCost / totalArea),
    totalDays,
    area: input.area,
    floors: input.floors,
  };
}

export function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
