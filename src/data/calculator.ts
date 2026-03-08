export type HouseType = "simple" | "standard" | "premium";
export type StructureType = "rcc" | "load-bearing";
export type WallThickness = "4.5" | "9" | "13.5";

export interface CalculatorInput {
  plotArea: number; // sq ft
  floors: number;
  houseType: HouseType;
  structureType: StructureType;
  wallThickness: WallThickness;
}

export interface MaterialEstimate {
  cement: number;       // bags (50kg)
  steel: number;        // tons
  sand: number;         // cubic meters
  aggregate: number;    // cubic meters
  bricks: number;       // approx count
}

export interface CostEstimate {
  cement: number;
  steel: number;
  sand: number;
  aggregate: number;
  bricks: number;
  total: number;
}

// Rates per unit (approximate Indian market rates)
const RATES = {
  cement: 380,       // per bag
  steel: 65000,      // per ton
  sand: 1800,        // per cubic meter
  aggregate: 1600,   // per cubic meter
  bricks: 8,         // per brick
};

// Multipliers based on house type
const TYPE_MULTIPLIER: Record<HouseType, number> = {
  simple: 0.85,
  standard: 1.0,
  premium: 1.3,
};

// Steel requirement multiplier for structure type
const STRUCTURE_STEEL: Record<StructureType, number> = {
  rcc: 1.0,
  "load-bearing": 0.5,
};

export function estimateMaterials(input: CalculatorInput): MaterialEstimate {
  const { plotArea, floors, houseType, structureType } = input;
  const totalArea = plotArea * floors;
  const typeMul = TYPE_MULTIPLIER[houseType];
  const steelMul = STRUCTURE_STEEL[structureType];

  // Thumb rules (per sq ft of built-up area):
  // Cement: ~0.4 bags/sqft (OPC) for standard RCC frame
  // Steel: ~4 kg/sqft for RCC frame
  // Sand: ~0.016 cum/sqft
  // Aggregate: ~0.013 cum/sqft
  // Bricks: ~8 bricks/sqft

  const cement = Math.ceil(totalArea * 0.4 * typeMul);
  const steel = parseFloat((totalArea * 4 * typeMul * steelMul / 1000).toFixed(2)); // kg to tons
  const sand = parseFloat((totalArea * 0.016 * typeMul).toFixed(1));
  const aggregate = parseFloat((totalArea * 0.013 * typeMul).toFixed(1));
  const bricks = Math.ceil(totalArea * 8 * typeMul);

  return { cement, steel, sand, aggregate, bricks };
}

export function estimateCost(materials: MaterialEstimate): CostEstimate {
  const cement = materials.cement * RATES.cement;
  const steel = materials.steel * RATES.steel;
  const sand = materials.sand * RATES.sand;
  const aggregate = materials.aggregate * RATES.aggregate;
  const bricks = materials.bricks * RATES.bricks;
  const total = cement + steel + sand + aggregate + bricks;

  return { cement, steel, sand, aggregate, bricks, total };
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
