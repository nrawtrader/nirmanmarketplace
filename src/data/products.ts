import bangurImg from "@/assets/products/bangur-powermax.jpg";
import mpBirlaImg from "@/assets/products/mp-birla-perfect-plus.jpg";
import accGoldImg from "@/assets/products/acc-gold-water-shield.webp";
import accConcreteImg from "@/assets/products/acc-concrete-plus.webp";
import ultratechWeatherImg from "@/assets/products/ultratech-weather-plus.png";
import ultratechOpcImg from "@/assets/products/ultratech-opc.png";

export type ProductCategory = "cement" | "steel" | "sanitary";

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
  // Cement
  {
    id: "cem-1",
    name: "UltraTech Cement OPC 53 Grade",
    brand: "UltraTech",
    category: "cement",
    price: 380,
    unit: "bag (50kg)",
    image: ultratechOpcImg,
    description: "India's No.1 Cement — The Engineer's Choice. Premium OPC 53 grade for high-strength RCC, foundations, and structural work.",
    specs: { Grade: "OPC 53", Weight: "50 kg", Type: "Ordinary Portland Cement", "Setting Time": "30 min initial" },
    tip: "1 bag of OPC 53 cement can produce approximately 1.25 cubic feet of concrete (1:2:4 mix).",
  },
  {
    id: "cem-2",
    name: "UltraTech Weather Plus",
    brand: "UltraTech",
    category: "cement",
    price: 400,
    unit: "bag (50kg)",
    image: ultratechWeatherImg,
    description: "India's No.1 Cement with enhanced weather resistance. Ideal for exterior plastering and areas exposed to rain and humidity.",
    specs: { Grade: "PPC", Weight: "50 kg", Type: "Weather Resistant Cement", "Water Resistance": "Superior" },
    tip: "Weather Plus cement is specially formulated for external walls and roofs exposed to harsh weather.",
  },
  {
    id: "cem-3",
    name: "ACC Gold Water Shield",
    brand: "ACC",
    category: "cement",
    price: 370,
    unit: "bag (50kg)",
    image: accGoldImg,
    description: "Adani ACC Gold Water Shield — advanced water-repelling cement for superior durability against moisture and seepage.",
    specs: { Grade: "PPC", Weight: "50 kg", Type: "Water Shield Cement", Durability: "High" },
    tip: "ACC Gold Water Shield is ideal for areas with high moisture — basements, bathrooms, and external walls.",
  },
  {
    id: "cem-4",
    name: "ACC Concrete+ Xtra Strong",
    brand: "ACC",
    category: "cement",
    price: 365,
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
    price: 355,
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
    tip: "PPC with fly ash offers better workability and long-term strength gain compared to regular PPC.",
  },
  // Steel
  {
    id: "stl-1",
    name: "TATA Tiscon Fe500D TMT Bars",
    brand: "TATA Tiscon",
    category: "steel",
    price: 65000,
    unit: "ton",
    image: "/placeholder.svg",
    description: "High-strength Fe500D TMT reinforcement bars with superior ductility. Earthquake resistant.",
    specs: { Grade: "Fe500D", Diameter: "8mm–32mm", Ductility: "High", "Corrosion Resistance": "CRS treated" },
    tip: "Fe500D bars have higher elongation than Fe500 — preferred in earthquake-prone areas.",
  },
  {
    id: "stl-2",
    name: "JSW NeoSteel Fe550D",
    brand: "JSW Steel",
    category: "steel",
    price: 68000,
    unit: "ton",
    image: "/placeholder.svg",
    description: "Premium Fe550D TMT bars for heavy-duty structural applications.",
    specs: { Grade: "Fe550D", Diameter: "10mm–32mm", Strength: "550 MPa", Ductility: "High" },
  },
  {
    id: "stl-3",
    name: "SAIL TMT Fe500",
    brand: "SAIL",
    category: "steel",
    price: 60000,
    unit: "ton",
    image: "/placeholder.svg",
    description: "Reliable Fe500 grade TMT bars from India's leading steel manufacturer.",
    specs: { Grade: "Fe500", Diameter: "8mm–25mm", Manufacturer: "SAIL" },
  },
  // Sanitary
  {
    id: "san-1",
    name: "Hindware Wash Basin",
    brand: "Hindware",
    category: "sanitary",
    price: 3500,
    unit: "piece",
    image: "/placeholder.svg",
    description: "Premium ceramic wall-mounted wash basin with modern design.",
    specs: { Type: "Wall Mounted", Material: "Ceramic", Color: "White", Size: "18×14 inches" },
  },
  {
    id: "san-2",
    name: "Astral CPVC Pipes 1 inch",
    brand: "Astral",
    category: "sanitary",
    price: 450,
    unit: "3m pipe",
    image: "/placeholder.svg",
    description: "CPVC pipes for hot and cold water supply. Lead-free and corrosion resistant.",
    specs: { Type: "CPVC", Diameter: "1 inch", Length: "3 meters", "Temp Rating": "Up to 93°C" },
  },
  {
    id: "san-3",
    name: "Jaquar Shower Set",
    brand: "Jaquar",
    category: "sanitary",
    price: 8500,
    unit: "set",
    image: "/placeholder.svg",
    description: "Complete overhead and hand shower set with rain spray technology.",
    specs: { Type: "Shower Set", Finish: "Chrome", "Spray Type": "Rain + Hand", Warranty: "5 years" },
  },
  {
    id: "san-4",
    name: "Cera Western Toilet",
    brand: "Cera",
    category: "sanitary",
    price: 7200,
    unit: "piece",
    image: "/placeholder.svg",
    description: "One-piece western toilet with soft-close seat and dual flush system.",
    specs: { Type: "One-piece EWC", Material: "Ceramic", Flush: "Dual 3/6L", Color: "White" },
  },
];

export const brands: Record<ProductCategory, string[]> = {
  cement: ["UltraTech", "ACC", "Bangur", "MP Birla"],
  steel: ["TATA Tiscon", "JSW Steel", "SAIL"],
  sanitary: ["Hindware", "Astral", "Jaquar", "Cera"],
};
