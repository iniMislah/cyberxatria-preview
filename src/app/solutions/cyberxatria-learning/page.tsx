import type { Metadata } from "next";
import { LearningPageContent } from "@/components/learning-page-content";
import { learningContent } from "@/lib/learning-content";

export const metadata: Metadata = {
  title: "CyberXatria Learning",
  description: learningContent.id.hero.description,
};

export default function LearningPage() {
  return <LearningPageContent />;
}
