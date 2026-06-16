import bangurImg from "@/assets/products/bangur-powermax.jpg";
import mpBirlaImg from "@/assets/products/mp-birla-perfect-plus.jpg";
import accGoldImg from "@/assets/products/acc-gold-water-shield.webp";
import accConcreteImg from "@/assets/products/acc-concrete-plus.webp";
import ultratechWeatherImg from "@/assets/products/ultratech-weather-plus.png";
import ultratechOpcImg from "@/assets/products/ultratech-opc.png";
import rhlGoldImg from "@/assets/products/rhl-gold.png";
import sigmaGriplockImg from "@/assets/products/sigma-griplock.png";

export type ProductCategory = "cement" | "steel";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  tip?: string;
}

export const products: Product[] = [
  // ── CEMENT ──────────────────────────────────────────────
  {
    id: "cem-1",
    name: "UltraTech Cement",
    brand: "UltraTech",
    category: "cement",
    price: 365,
    unit: "bag (50kg)",
    image: ultratechOpcImg,
    description: "India's No.1 Cement — The Engineer's Choice. Premium OPC 53 grade for high-strength RCC, foundations, and structural work.",
    specs: { Grade: "OPC 53", Weight: "50 kg", Type: "Ordinary Portland Cement", "Setting Time": "30 min initial" },
    tip: "1 bag of OPC 53 cement produces approximately 1.25 cubic feet of concrete (1:2:4 mix).",
  },
  {
    id: "cem-2",
    name: "UltraTech Weather Plus",
    brand: "UltraTech",
    category: "cement",
    price: 390,
    unit: "bag (50kg)",
    image: ultratechWeatherImg,
    description: "India's No.1 Cement with enhanced weather resistance. Ideal for exterior plastering and areas exposed to rain and humidity.",
    specs: { Grade: "PPC", Weight: "50 kg", Type: "Weather Resistant Cement", "Water Resistance": "Superior" },
    tip: "Weather Plus is specially formulated for external walls and roofs exposed to harsh weather.",
  },
  {
    id: "cem-3",
    name: "ACC Gold Water Shield",
    brand: "ACC",
    category: "cement",
    price: 400,
    unit: "bag (50kg)",
    image: accGoldImg,
    description: "Adani ACC Gold Water Shield — advanced water-repelling cement for superior durability against moisture and seepage.",
    specs: { Grade: "PPC", Weight: "50 kg", Type: "Water Shield Cement", Durability: "High" },
    tip: "Ideal for basements, bathrooms, and external walls prone to moisture.",
  },
  {
    id: "cem-4",
    name: "ACC Concrete+ Xtra Strong",
    brand: "ACC",
    category: "cement",
    price: 380,
    unit: "bag (50kg)",
    image: accConcreteImg,
    description: "Adani ACC Concrete+ Xtra Strong — high-strength cement for robust concrete mixes and heavy-duty structural applications.",
    specs: { Grade: "OPC 53", Weight: "50 kg", Type: "High Strength Cement", Strength: "Xtra Strong" },
  },
  {
    id: "cem-5",
    name: "Bangur Powermax Cement",
    brand: "Bangur",
    category: "cement",
    price: 345,
    unit: "bag (50kg)",
    image: bangurImg,
    description: "Bangur Powermax — trusted cement brand delivering maximum power and durability for all construction needs.",
    specs: { Grade: "PPC", Weight: "50 kg", Type: "Portland Pozzolana Cement", Durability: "High" },
  },
  {
    id: "cem-6",
    name: "MP Birla Cement Perfect Plus",
    brand: "MP Birla",
    category: "cement",
    price: 360,
    unit: "bag (50kg)",
    image: mpBirlaImg,
    description: "MP Birla Cement Perfect Plus — Portland Pozzolana Cement with extra additives for extra strength. Fly ash based.",
    specs: { Grade: "PPC", Weight: "50 kg", Type: "Portland Pozzolana Cement (Fly Ash)", Additives: "Extra Strength" },
    tip: "PPC with fly ash offers better workability and long-term strength compared to regular PPC.",
  },
  // ── STEEL ───────────────────────────────────────────────
  {
    id: "stl-rhl",
    name: "RHL Gold Fe500 TMT Bars",
    brand: "RHL Gold",
    category: "steel",
    price: 62000,
    unit: "ton",
    image: rhlGoldImg,
    description: "RHL Gold Fe500 TMT bars — trusted strength for residential and commercial construction. Available in all standard sizes.",
    specs: { Grade: "Fe500", Diameter: "8mm–32mm", Ductility: "High", "Corrosion Resistance": "Superior" },
    tip: "Common house construction uses 8mm, 10mm, 12mm and 16mm diameter bars.",
  },
  {
    id: "stl-sigma",
    name: "Sigma Griplock Fe550D TMT Bars",
    brand: "Sigma Griplock",
    category: "steel",
    price: 57000,
    unit: "ton",
    image: sigmaGriplockImg,
    description: "Sigma Griplock Fe550D TMT bars — premium grip ribs for stronger bond with concrete. Ideal for RCC structures.",
    specs: { Grade: "Fe550D", Diameter: "8mm–32mm", Strength: "550 MPa", Ductility: "High" },
    tip: "Fe550D offers higher tensile strength — recommended for multi-storey and earthquake-prone construction.",
  },
];

export const brands: Record<ProductCategory, string[]> = {
  cement: ["UltraTech", "ACC", "Bangur", "MP Birla"],
  steel: ["RHL Gold", "Sigma Griplock"],
};
