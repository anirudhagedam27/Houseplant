export type CareLevel = "Easy" | "Very Easy"

export type Plant = {
  slug: string
  name: string
  latinName: string
  image: string
  tagline: string
  difficulty: CareLevel
  water: string
  waterFrequency: string
  light: string
  lightNote: string
  soil: string
  soilNote: string
}

export const plants: Plant[] = [
  {
    slug: "pothos",
    name: "Pothos",
    latinName: "Epipremnum aureum",
    image: "/plants/pothos.png",
    tagline: "The forgiving trailing vine that grows almost anywhere.",
    difficulty: "Very Easy",
    water: "Let the top 2 inches of soil dry out",
    waterFrequency: "Every 7–10 days",
    light: "Low to bright, indirect light",
    lightNote: "Avoid harsh direct sun, which scorches the leaves.",
    soil: "Well-draining indoor potting mix",
    soilNote: "A pot with a drainage hole prevents soggy roots.",
  },
  {
    slug: "snake-plant",
    name: "Snake Plant",
    latinName: "Dracaena trifasciata",
    image: "/plants/snake-plant.png",
    tagline: "Architectural, near-indestructible, and thrives on neglect.",
    difficulty: "Very Easy",
    water: "Water only when soil is completely dry",
    waterFrequency: "Every 2–3 weeks",
    light: "Low to bright, indirect light",
    lightNote: "Tolerates dim corners but grows faster in brighter spots.",
    soil: "Gritty, fast-draining cactus mix",
    soilNote: "Overwatering is the only real way to harm it.",
  },
  {
    slug: "zz-plant",
    name: "ZZ Plant",
    latinName: "Zamioculcas zamiifolia",
    image: "/plants/zz-plant.png",
    tagline: "Glossy, drought-tolerant greenery for busy plant parents.",
    difficulty: "Easy",
    water: "Let soil dry fully between waterings",
    waterFrequency: "Every 2–3 weeks",
    light: "Low to medium, indirect light",
    lightNote: "Handles low light and fluorescent office lighting well.",
    soil: "Standard well-draining potting mix",
    soilNote: "Stores water in its rhizomes, so err on the dry side.",
  },
]
