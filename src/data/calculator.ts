/**
 * ACCURATE CONSTRUCTION MATERIAL CALCULATOR
 * 
 * Based on Indian Standard (IS) codes and verified industry thumb rules:
 * - IS 456:2000 (Plain & Reinforced Concrete)
 * - IS 1077:1992 (Bricks)
 * - CPWD specifications
 * - BricknBolt, Civilverse, CBEC India verified data
 * 
 * Estimation approach: Component-wise calculation
 *   1. Foundation (PCC + RCC footings + columns below plinth)
 *   2. Plinth beam
 *   3. Superstructure (Columns + Beams + Slab)
 *   4. Brickwork (walls)
 *   5. Plastering (internal + external)
 *   6. Flooring PCC
 *   
 * Then material quantities derived from concrete volumes using mix ratios.
 */

export type HouseType = "simple" | "standard" | "premium";
export type StructureType = "rcc" | "load-bearing";
export type WallThickness = "4.5" | "9" | "13.5";

export interface CalculatorInput {
  plotArea: number; // sq ft (built-up area)
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

export interface EstimationBreakdown {
  foundation: { concrete: number; pcc: number };
  plinthBeam: { concrete: number };
  columns: { concrete: number };
  beams: { concrete: number };
  slab: { concrete: number };
  brickwork: { volume: number; area: number };
  plaster: { area: number; mortar: number };
  flooringPcc: { volume: number };
  totalConcrete: number;
  totalPcc: number;
  totalMortar: number;
}

// =============================================
// MARKET RATES (2024-25 average Indian rates)
// =============================================
const RATES = {
  cement: 380,       // per 50kg bag
  steel: 65000,      // per metric ton
  sand: 1800,        // per cubic meter
  aggregate: 1600,   // per cubic meter
  bricks: 8,         // per brick (standard modular)
};

// =============================================
// CONVERSION CONSTANTS
// =============================================
const SQFT_TO_SQM = 0.0929;       // 1 sqft = 0.0929 sqm
const INCH_TO_M = 0.0254;

// =============================================
// MATERIAL RATES PER CUM OF CONCRETE/MORTAR
// Based on IS mix design and CPWD specifications
// =============================================

// M20 concrete (1:1.5:3) - for RCC work
// Dry volume = 1.54 × wet volume (due to bulking of sand)
// Cement = 1.54 / (1+1.5+3) × 1 = 0.28 cum = 0.28/0.035 = 8.0 bags per cum
// Sand = 1.54 / 5.5 × 1.5 = 0.42 cum per cum
// Aggregate = 1.54 / 5.5 × 3 = 0.84 cum per cum
const M20_PER_CUM = {
  cement: 8.0,     // bags per cum of M20 concrete
  sand: 0.42,      // cum per cum
  aggregate: 0.84, // cum per cum
};

// M10 PCC (1:4:8) - for plain cement concrete / leveling
// Cement = 1.54 / (1+4+8) × 1 = 0.118 cum = 3.4 bags per cum
// Sand = 1.54 / 13 × 4 = 0.474 cum per cum
// Aggregate = 1.54 / 13 × 8 = 0.948 cum per cum
const M10_PER_CUM = {
  cement: 3.4,
  sand: 0.474,
  aggregate: 0.948,
};

// CM 1:6 mortar for brickwork
// Cement = 1.54 / 7 × 1 = 0.22 cum = 6.3 bags per cum mortar
// Sand = 1.54 / 7 × 6 = 1.32 cum per cum mortar
const CM_1_6_PER_CUM = {
  cement: 6.3,
  sand: 1.32,
};

// CM 1:4 mortar for plastering (12mm thick)
// Cement = 1.54 / 5 × 1 = 0.308 cum = 8.8 bags per cum mortar
// Sand = 1.54 / 5 × 4 = 1.232 cum per cum mortar
const CM_1_4_PER_CUM = {
  cement: 8.8,
  sand: 1.232,
};

// Bricks per cum of brickwork (with mortar)
// Standard brick: 190mm × 90mm × 90mm, mortar joint 10mm
// Bricks per cum = 1 / (0.2 × 0.1 × 0.1) = 500
// Mortar per cum of brickwork ≈ 0.3 cum
const BRICKS_PER_CUM = 500;
const MORTAR_PER_CUM_BRICKWORK = 0.3;

// =============================================
// STRUCTURAL ASSUMPTIONS BY HOUSE TYPE
// =============================================
interface StructuralParams {
  foundationDepth: number;        // m from NGL
  foundationSize: number;         // m (square footing side)
  foundationThickness: number;    // m
  pccThickness: number;           // m
  columnSize: number;             // m (square column side)
  plinthBeamWidth: number;        // m
  plinthBeamDepth: number;        // m
  floorBeamWidth: number;         // m
  floorBeamDepth: number;         // m
  slabThickness: number;          // m
  floorHeight: number;            // m (floor to floor)
  steelPercentRCC: number;        // % of concrete volume (by weight using density ratio)
  steelKgPerCumRCC: number;       // kg steel per cum of RCC
  wallDeduction: number;          // sqm deducted for doors/windows per floor
}

const STRUCTURAL_PARAMS: Record<HouseType, StructuralParams> = {
  simple: {
    foundationDepth: 1.2,
    foundationSize: 1.0,
    foundationThickness: 0.45,
    pccThickness: 0.075,
    columnSize: 0.23,
    plinthBeamWidth: 0.23,
    plinthBeamDepth: 0.45,
    floorBeamWidth: 0.23,
    floorBeamDepth: 0.38,
    slabThickness: 0.12,
    floorHeight: 3.0,
    steelPercentRCC: 1.0,
    steelKgPerCumRCC: 78.5, // 1% of 7850 kg/m³
    wallDeduction: 12,
  },
  standard: {
    foundationDepth: 1.5,
    foundationSize: 1.2,
    foundationThickness: 0.6,
    pccThickness: 0.1,
    columnSize: 0.3,
    plinthBeamWidth: 0.3,
    plinthBeamDepth: 0.6,
    floorBeamWidth: 0.3,
    floorBeamDepth: 0.5,
    slabThickness: 0.15,
    floorHeight: 3.0,
    steelPercentRCC: 1.2,
    steelKgPerCumRCC: 94.2, // 1.2% of 7850
    wallDeduction: 15,
  },
  premium: {
    foundationDepth: 1.8,
    foundationSize: 1.5,
    foundationThickness: 0.75,
    pccThickness: 0.1,
    columnSize: 0.35,
    plinthBeamWidth: 0.35,
    plinthBeamDepth: 0.6,
    floorBeamWidth: 0.35,
    floorBeamDepth: 0.55,
    slabThickness: 0.15,
    floorHeight: 3.3,
    steelPercentRCC: 1.5,
    steelKgPerCumRCC: 117.75, // 1.5% of 7850
    wallDeduction: 18,
  },
};

// Load-bearing structure has different assumptions
const LOAD_BEARING_OVERRIDES: Partial<StructuralParams> = {
  steelKgPerCumRCC: 40, // much less steel, only in lintels & slab
};

// =============================================
// ESTIMATION FUNCTIONS
// =============================================

function estimatePerimeter(areaSqm: number): number {
  // Assume roughly square-ish plot, perimeter = 4 * sqrt(area)
  // Add 20% for internal walls (partition walls, corridor walls)
  const side = Math.sqrt(areaSqm);
  const externalPerimeter = 4 * side;
  const internalWallLength = externalPerimeter * 0.8; // ~80% of perimeter for internal divisions
  return externalPerimeter + internalWallLength;
}

function estimateColumnCount(areaSqm: number, houseType: HouseType): number {
  // Rule: 1 column per ~5-7 sqm for standard RCC frame
  // Simple: 1 per 7 sqm, Standard: 1 per 5.5 sqm, Premium: 1 per 4.5 sqm
  const columnSpacing: Record<HouseType, number> = {
    simple: 7,
    standard: 5.5,
    premium: 4.5,
  };
  return Math.max(4, Math.ceil(areaSqm / columnSpacing[houseType]));
}

export function calculateBreakdown(input: CalculatorInput): EstimationBreakdown {
  const { plotArea, floors, houseType, structureType, wallThickness } = input;
  const areaSqm = plotArea * SQFT_TO_SQM;
  const params = { ...STRUCTURAL_PARAMS[houseType] };

  if (structureType === "load-bearing") {
    Object.assign(params, LOAD_BEARING_OVERRIDES);
  }

  const wallThickM = parseFloat(wallThickness) * INCH_TO_M; // wall thickness in meters
  const totalWallLength = estimatePerimeter(areaSqm);
  const numColumns = structureType === "rcc" ? estimateColumnCount(areaSqm, houseType) : 4; // load-bearing uses minimal columns
  const beamLength = structureType === "rcc" ? totalWallLength : totalWallLength * 0.3; // load-bearing has fewer beams (only lintels etc.)

  // ---- FOUNDATION ----
  // PCC under each footing
  const pccPerFooting = (params.foundationSize + 0.1) * (params.foundationSize + 0.1) * params.pccThickness;
  const totalPccFoundation = pccPerFooting * numColumns;

  // RCC footings
  const footingVol = params.foundationSize * params.foundationSize * params.foundationThickness * numColumns;

  // Columns below plinth (from top of footing to NGL)
  const colHeightSubstructure = params.foundationDepth - params.foundationThickness;
  const colVolSubstructure = params.columnSize * params.columnSize * colHeightSubstructure * numColumns;

  // Plinth beam
  const plinthBeamVol = params.plinthBeamWidth * params.plinthBeamDepth * totalWallLength;

  const foundationConcrete = footingVol + colVolSubstructure;

  // ---- SUPERSTRUCTURE (per floor) ----
  // Column height per floor = floor height - slab thickness
  const colHeightPerFloor = params.floorHeight - params.slabThickness;
  const colVolPerFloor = params.columnSize * params.columnSize * colHeightPerFloor * numColumns;

  // Beams
  const beamVolPerFloor = params.floorBeamWidth * params.floorBeamDepth * beamLength;

  // Slab
  const slabVolPerFloor = areaSqm * params.slabThickness;

  const totalColumnsConcrete = colVolPerFloor * floors;
  const totalBeamsConcrete = beamVolPerFloor * floors;
  const totalSlabConcrete = slabVolPerFloor * floors;

  // ---- BRICKWORK ----
  // Wall area = perimeter × wall height × floors - deductions for doors/windows
  const wallHeight = colHeightPerFloor; // wall sits between beams
  const totalWallArea = totalWallLength * wallHeight * floors - params.wallDeduction * floors;
  const brickworkVolume = totalWallArea * wallThickM;

  // ---- PLASTERING ----
  // Both sides of wall + slab bottom (ceiling)
  const plasterArea = (totalWallArea * 2) + (areaSqm * floors); // internal+external walls + ceiling
  const plasterThickness = 0.012; // 12mm
  const plasterMortar = plasterArea * plasterThickness;

  // ---- FLOORING PCC ----
  const flooringPcc = (areaSqm - totalWallLength * wallThickM) * 0.1; // 100mm PCC under flooring

  // ---- TOTALS ----
  const totalConcrete = foundationConcrete + plinthBeamVol + totalColumnsConcrete + totalBeamsConcrete + totalSlabConcrete;
  const totalPcc = totalPccFoundation + flooringPcc;
  const totalMortar = (brickworkVolume * MORTAR_PER_CUM_BRICKWORK) + plasterMortar;

  return {
    foundation: { concrete: foundationConcrete, pcc: totalPccFoundation },
    plinthBeam: { concrete: plinthBeamVol },
    columns: { concrete: totalColumnsConcrete },
    beams: { concrete: totalBeamsConcrete },
    slab: { concrete: totalSlabConcrete },
    brickwork: { volume: brickworkVolume, area: totalWallArea },
    plaster: { area: plasterArea, mortar: plasterMortar },
    flooringPcc: { volume: flooringPcc },
    totalConcrete,
    totalPcc,
    totalMortar,
  };
}

export function estimateMaterials(input: CalculatorInput): MaterialEstimate {
  const breakdown = calculateBreakdown(input);
  const params = STRUCTURAL_PARAMS[input.houseType];
  const steelRate = input.structureType === "load-bearing"
    ? LOAD_BEARING_OVERRIDES.steelKgPerCumRCC!
    : params.steelKgPerCumRCC;

  // ---- CEMENT ----
  // From M20 RCC concrete
  let cementBags = breakdown.totalConcrete * M20_PER_CUM.cement;
  // From M10 PCC
  cementBags += breakdown.totalPcc * M10_PER_CUM.cement;
  // From brickwork mortar (CM 1:6)
  cementBags += (breakdown.brickwork.volume * MORTAR_PER_CUM_BRICKWORK) * CM_1_6_PER_CUM.cement;
  // From plastering mortar (CM 1:4)
  cementBags += breakdown.plaster.mortar * CM_1_4_PER_CUM.cement;
  // Add 1% wastage (as per industry standard)
  cementBags *= 1.01;

  // ---- STEEL ----
  // Steel = total RCC volume × kg/cum
  let steelKg = breakdown.totalConcrete * steelRate;
  // Add 2% wastage
  steelKg *= 1.02;
  const steelTons = steelKg / 1000;

  // ---- SAND ----
  let sand = breakdown.totalConcrete * M20_PER_CUM.sand;
  sand += breakdown.totalPcc * M10_PER_CUM.sand;
  sand += (breakdown.brickwork.volume * MORTAR_PER_CUM_BRICKWORK) * CM_1_6_PER_CUM.sand;
  sand += breakdown.plaster.mortar * CM_1_4_PER_CUM.sand;
  sand *= 1.04; // 4% wastage

  // ---- AGGREGATE ----
  let aggregate = breakdown.totalConcrete * M20_PER_CUM.aggregate;
  aggregate += breakdown.totalPcc * M10_PER_CUM.aggregate;
  aggregate *= 1.04; // 4% wastage

  // ---- BRICKS ----
  let bricks = breakdown.brickwork.volume * BRICKS_PER_CUM;
  bricks *= 1.05; // 5% wastage/breakage

  return {
    cement: Math.ceil(cementBags),
    steel: parseFloat(steelTons.toFixed(2)),
    sand: parseFloat(sand.toFixed(1)),
    aggregate: parseFloat(aggregate.toFixed(1)),
    bricks: Math.ceil(bricks),
  };
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
