import { learningHeroImage, learningRoute } from "@/lib/learning-content";

export const solutionServiceMeta: { image: string; imageLight: string; href: string; imageFit?: "contain" | "cover" }[] = [
  { image: "/images/Solusi_CyberDrill_Dark.png", imageLight: "/images/Solusi_Cyberdrill_Light.png", href: "/solutions/cyber-drill" },
  { image: "/images/Solusi_TTX_Dark.png", imageLight: "/images/Solusi_TTX_Light.png", href: "/solutions/tabletop" },
  { image: learningHeroImage, imageLight: learningHeroImage, href: learningRoute, imageFit: "contain" },
  { image: "/images/Solusi_SOC_AI_Dark.png", imageLight: "/images/Solusi_SOC_Light.png", href: "" },
];
