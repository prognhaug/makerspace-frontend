import { Suspense } from "react";
import StaticSection from "@/components/content/sections/StaticSection";
import StaticHero from "@/components/content/hero/StaticHero";
import { ContentBlock } from "@/types/content";

export type PageContent = {
  pageId: string;
  title: string;
  blocks: ContentBlock<any>[];
};

async function PageContent() {
  // Fetch content from the API
  let content;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/mock`,
      {
        next: { revalidate: 5 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch content");
    content = await res.json();
  } catch (error) {
    console.error("Error fetching page content:", error);
    content = getDefaultContent();
  }

  // Find the hero block (first one of type "hero")
  const heroBlock = content.blocks.find((block) => block.type === "hero");

  // Find all section blocks
  const sectionBlocks = content.blocks.filter(
    (block) => block.type === "section"
  );

  return (
    <>
      {/* Hero Section */}
      {heroBlock && (
        <StaticHero
          title={heroBlock.data.title}
          subtitle={heroBlock.data.subtitle}
          description={heroBlock.data.description}
          imagePath={heroBlock.data.imagePath || "/pictures/hero.png"}
          imageAlt={heroBlock.data.imageAlt || "Jæren Makerspace"}
          ctaText={heroBlock.data.ctaText}
          ctaLink={heroBlock.data.ctaLink}
        />
      )}

      {/* Content Sections */}
      {sectionBlocks.map((block) => (
        <StaticSection
          key={block.id}
          id={block.id}
          title={block.data.title}
          content={block.data.content}
          imagePath={block.data.imagePath || "/pictures/textile2.png"}
          imageAlt={block.data.imageAlt || "Workshop at Jæren Makerspace"}
          layout={block.data.layout || "text-left"}
        />
      ))}
    </>
  );
}

// Default content for fallback
function getDefaultContent(): PageContent {
  return {
    pageId: "landing-page",
    title: "Landing Page",
    blocks: [
      {
        id: "hero-default",
        type: "hero",
        order: 0,
        data: {
          title: "Jæren Makerspace",
          subtitle: "Et fellesskap for skapende mennesker",
          description: "Vi i Jæren Makerspace gleder oss til å åpne dørene...",
          imagePath: "/pictures/hero.png",
          imageAlt: "Jæren Makerspace",
        },
      },
      {
        id: "section-default",
        type: "section",
        order: 1,
        data: {
          title: "Velkommen til Jæren Makerspace",
          content: "Vi vet at mange sitter med ideer, prosjekter og drømmer...",
          layout: "text-left",
          imagePath: "/pictures/textile2.png",
          imageAlt: "Workshop at Jæren Makerspace",
        },
      },
    ],
  };
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </main>
  );
}
