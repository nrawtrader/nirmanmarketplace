// Run this once to populate your MongoDB with all products:
//   cd backend && node scripts/seedProducts.js

require("dotenv").config({ path: "../backend/.env" });
const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  // ── CEMENT ──────────────────────────────────────────────
  { productId: "cem-1", name: "UltraTech Cement OPC 53 Grade", brand: "UltraTech", category: "cement", price: 380, unit: "bag (50kg)", description: "India's No.1 Cement — The Engineer's Choice.", specs: { Grade: "OPC 53", Weight: "50 kg" } },
  { productId: "cem-2", name: "UltraTech Weather Plus", brand: "UltraTech", category: "cement", price: 400, unit: "bag (50kg)", description: "Enhanced weather resistance for exterior work.", specs: { Grade: "PPC", Weight: "50 kg" } },
  { productId: "cem-3", name: "ACC Gold Water Shield", brand: "ACC", category: "cement", price: 370, unit: "bag (50kg)", description: "Advanced water-repelling cement.", specs: { Grade: "PPC", Weight: "50 kg" } },
  { productId: "cem-4", name: "ACC Concrete Plus", brand: "ACC", category: "cement", price: 360, unit: "bag (50kg)", description: "High strength concrete cement.", specs: { Grade: "OPC 43", Weight: "50 kg" } },
  { productId: "cem-5", name: "Bangur PowerMax Cement", brand: "Bangur", category: "cement", price: 345, unit: "bag (50kg)", description: "High-performance cement for all construction needs.", specs: { Grade: "PPC", Weight: "50 kg" } },
  { productId: "cem-6", name: "MP Birla Perfect Plus", brand: "MP Birla", category: "cement", price: 355, unit: "bag (50kg)", description: "Superior quality for residential projects.", specs: { Grade: "PPC", Weight: "50 kg" } },
  // ── STEEL ───────────────────────────────────────────────
  { productId: "stl-1", name: "RHL Gold TMT Fe 500D", brand: "RHL", category: "steel", price: 68000, unit: "tonne", description: "High-ductility TMT bar for earthquake-resistant construction.", specs: { Grade: "Fe 500D", Standard: "IS 1786" } },
  { productId: "stl-2", name: "Sigma Griplock TMT Fe 500", brand: "Sigma", category: "steel", price: 65000, unit: "tonne", description: "Ribbed TMT bars for superior concrete bonding.", specs: { Grade: "Fe 500", Standard: "IS 1786" } },
  // ── SANITARY ────────────────────────────────────────────
  { productId: "san-1", name: "CPVC Hot/Cold Pipes 1/2\"", brand: "Astral", category: "sanitary", price: 45, unit: "metre", description: "Heat-resistant pipes for hot and cold water.", specs: { Size: "1/2 inch", Material: "CPVC" } },
  { productId: "san-2", name: "UPVC Drainage Pipe 4\"", brand: "Supreme", category: "sanitary", price: 120, unit: "metre", description: "High-flow drainage pipe for sewer lines.", specs: { Size: "4 inch", Material: "UPVC" } },
  // ── PAINT ───────────────────────────────────────────────
  { productId: "pnt-1", name: "Apex Exterior Emulsion", brand: "Asian Paints", category: "paint", price: 280, unit: "litre", description: "All-weather exterior paint with UV protection.", specs: { Finish: "Matt", Coverage: "120-140 sq.ft/litre" } },
  { productId: "pnt-2", name: "Tractor Emulsion Interior", brand: "Asian Paints", category: "paint", price: 180, unit: "litre", description: "Smooth interior finish with washable surface.", specs: { Finish: "Matt", Coverage: "140-160 sq.ft/litre" } },
  { productId: "pnt-3", name: "WeatherCoat All Guard", brand: "Berger", category: "paint", price: 260, unit: "litre", description: "Waterproof exterior paint with anti-fungal protection.", specs: { Finish: "Sheen", Coverage: "120-140 sq.ft/litre" } },
  { productId: "pnt-4", name: "Weathershield Exterior", brand: "Dulux", category: "paint", price: 290, unit: "litre", description: "12-year weathering guarantee exterior paint.", specs: { Finish: "Matt", Coverage: "120 sq.ft/litre" } },
  // ── AGGREGATE ───────────────────────────────────────────
  { productId: "agg-1", name: "Manufactured Sand (M-Sand)", brand: "Local", category: "aggregate", price: 800, unit: "cubic foot", description: "Cleaner alternative to river sand, zero silt content.", specs: { Type: "Manufactured Sand", Silt: "< 2%" } },
  { productId: "agg-2", name: "Blue Metal 20mm Aggregate", brand: "Local", category: "aggregate", price: 1100, unit: "cubic foot", description: "Crushed granite aggregate for high-strength concrete.", specs: { Size: "20mm", Type: "Granite" } },
  { productId: "agg-3", name: "Fly Ash Bricks", brand: "Local", category: "aggregate", price: 7, unit: "brick", description: "Eco-friendly, lightweight, high-compression bricks.", specs: { Size: "230×110×76 mm", Strength: "7.5 N/mm²" } },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully!`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seed();
