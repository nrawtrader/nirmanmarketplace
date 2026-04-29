import plan1 from "@/assets/designs/plan-modern-3bhk.jpg";
import plan2 from "@/assets/designs/plan-cozy-2bhk.jpg";
import plan3 from "@/assets/designs/plan-villa-4bhk.jpg";
import plan4 from "@/assets/designs/plan-narrow-30x40.jpg";
import plan5 from "@/assets/designs/plan-courtyard.jpg";
import plan6 from "@/assets/designs/plan-duplex-g1.jpg";

import floor1 from "@/assets/designs/floor-modern-3bhk.jpg";
import floor2 from "@/assets/designs/floor-cozy-2bhk.jpg";
import floor3 from "@/assets/designs/floor-villa-4bhk.jpg";
import floor4 from "@/assets/designs/floor-narrow-30x40.jpg";
import floor5 from "@/assets/designs/floor-courtyard.jpg";
import floor6 from "@/assets/designs/floor-duplex-g1.jpg";

import elev1 from "@/assets/designs/elev-modern-3bhk.jpg";
import elev2 from "@/assets/designs/elev-cozy-2bhk.jpg";
import elev3 from "@/assets/designs/elev-villa-4bhk.jpg";
import elev4 from "@/assets/designs/elev-narrow-30x40.jpg";
import elev5 from "@/assets/designs/elev-courtyard.jpg";
import elev6 from "@/assets/designs/elev-duplex-g1.jpg";

export type Character = "Natural" | "Rustic" | "Industrial" | "Classic" | "Earthy" | "Bright" | "Bold";
export type Shape = "Rectangle" | "L-Shape" | "Square" | "Custom";

export interface HouseDesign {
  id: string;
  title: string;
  designer: string;
  image: string;
  floorPlan: string;
  elevation: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  stories: number;
  character: Character;
  shape: Shape;
  features: string[];
  dimensions: string;
  description: string;
}

export const HOUSE_DESIGNS: HouseDesign[] = [
  {
    id: "hd-1",
    title: "Modern 3-Bed Family Home",
    designer: "by Aarav",
    image: plan1,
    floorPlan: floor1,
    elevation: elev1,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    stories: 1,
    character: "Bright",
    shape: "Rectangle",
    features: ["Porch", "Modular Kitchen"],
    dimensions: "50' x 37'",
    description: "A bright single-story 3 BHK with an open kitchen-living layout and a welcoming front porch. Ideal for nuclear families building on a 40x60 plot.",
  },
  {
    id: "hd-2",
    title: "Cozy 2-Bed with Pooja Room",
    designer: "by Priya",
    image: plan2,
    floorPlan: floor2,
    elevation: elev2,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    stories: 1,
    character: "Earthy",
    shape: "L-Shape",
    features: ["Pooja Room", "Car Porch"],
    dimensions: "33' x 33'",
    description: "An earthy L-shape 2 BHK featuring a dedicated Pooja room and a covered car porch. Perfect for compact urban plots.",
  },
  {
    id: "hd-3",
    title: "Spacious 4-Bed Villa",
    designer: "by Rohan",
    image: plan3,
    floorPlan: floor3,
    elevation: elev3,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    stories: 2,
    character: "Classic",
    shape: "Rectangle",
    features: ["Pool", "Double Garage", "Garden"],
    dimensions: "70' x 80'",
    description: "A classic G+1 luxury villa with 4 spacious bedrooms, double garage, swimming pool and landscaped garden.",
  },
  {
    id: "hd-4",
    title: "Compact 30x40 Plot Home",
    designer: "by Wil",
    image: plan4,
    floorPlan: floor4,
    elevation: elev4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    stories: 1,
    character: "Industrial",
    shape: "Square",
    features: ["Staircase", "Balcony"],
    dimensions: "30' x 40'",
    description: "Industrial-style compact home built for narrow 30x40 plots — efficient circulation, balcony and staircase to future first floor.",
  },
  {
    id: "hd-5",
    title: "Earthy Courtyard Bungalow",
    designer: "by Ishita",
    image: plan5,
    floorPlan: floor5,
    elevation: elev5,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    stories: 1,
    character: "Earthy",
    shape: "Rectangle",
    features: ["Courtyard", "Garden", "Open Kitchen"],
    dimensions: "60' x 50'",
    description: "Inspired by traditional Indian homes — a central courtyard brings light and ventilation into every room.",
  },
  {
    id: "hd-6",
    title: "Sleek G+1 Duplex",
    designer: "by Nicholas",
    image: plan6,
    floorPlan: floor6,
    elevation: elev6,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    stories: 2,
    character: "Bold",
    shape: "Rectangle",
    features: ["Family Lounge", "Balcony", "Parking"],
    dimensions: "40' x 70'",
    description: "A bold modern G+1 duplex with double-height living, family lounge upstairs, and parking for two cars.",
  },
];
