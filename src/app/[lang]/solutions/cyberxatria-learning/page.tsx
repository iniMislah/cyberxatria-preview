import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningPageContent } from "@/components/learning-page-content";
import { learningContent } from "@/lib/learning-content";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "id" && lang !== "en") notFound();
  return {
    title: "CyberXatria Learning",
    description: learningContent[lang].hero.description,
  };
}

export default async function LearningPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "id" && lang !== "en") notFound();
  return <LearningPageContent language={lang} />;
}
