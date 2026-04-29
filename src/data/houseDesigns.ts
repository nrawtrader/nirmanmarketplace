import plan1 from "@/assets/designs/plan-modern-3bhk.jpg";
import plan2 from "@/assets/designs/plan-cozy-2bhk.jpg";
import plan3 from "@/assets/designs/plan-villa-4bhk.jpg";
import plan4 from "@/assets/designs/plan-narrow-30x40.jpg";
import plan5 from "@/assets/designs/plan-courtyard.jpg";
import plan6 from "@/assets/designs/plan-duplex-g1.jpg";

export type Character = "Natural" | "Rustic" | "Industrial" | "Classic" | "Earthy" | "Bright" | "Bold";
export type Shape = "Rectangle" | "L-Shape" | "Square" | "Custom";

export interface HouseDesign {
  id: string;
  title: string;
  designer: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  stories: number;
  character: Character;
  shape: Shape;
  features: string[];
}

export const HOUSE_DESIGNS: HouseDesign[] = [
  {
    id: "hd-1",
    title: "Modern 3-Bed Family Home",
    designer: "by Aarav",
    image: plan1,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    stories: 1,
    character: "Bright",
    shape: "Rectangle",
    features: ["Porch", "Modular Kitchen"],
  },
  {
    id: "hd-2",
    title: "Cozy 2-Bed with Pooja Room",
    designer: "by Priya",
    image: plan2,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    stories: 1,
    character: "Earthy",
    shape: "L-Shape",
    features: ["Pooja Room", "Car Porch"],
  },
  {
    id: "hd-3",
    title: "Spacious 4-Bed Villa",
    designer: "by Rohan",
    image: plan3,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    stories: 2,
    character: "Classic",
    shape: "Rectangle",
    features: ["Pool", "Double Garage", "Garden"],
  },
  {
    id: "hd-4",
    title: "Compact 30x40 Plot Home",
    designer: "by Wil",
    image: plan4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    stories: 1,
    character: "Industrial",
    shape: "Square",
    features: ["Staircase", "Balcony"],
  },
  {
    id: "hd-5",
    title: "Earthy Courtyard Bungalow",
    designer: "by Ishita",
    image: plan5,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    stories: 1,
    character: "Earthy",
    shape: "Rectangle",
    features: ["Courtyard", "Garden", "Open Kitchen"],
  },
  {
    id: "hd-6",
    title: "Sleek G+1 Duplex",
    designer: "by Nicholas",
    image: plan6,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    stories: 2,
    character: "Bold",
    shape: "Rectangle",
    features: ["Family Lounge", "Balcony", "Parking"],
  },
];
