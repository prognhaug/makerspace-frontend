export type Section = {
  id: string;
  title: string;
  content: string;
  layout: "text-left" | "text-right";
  imagePath: string;
  imageAlt: string;
};

// export type PageContent = {
//   hero: {
//     title: string;
//     subtitle: string;
//     description: string;
//   };
//   sections: Section[];
// };

export type BlockType =
  | "hero"
  | "section"
  | "carousel"
  | "team"
  | "machineList"
  | "form"
  | "imageWall";

// Base content block interface
export interface ContentBlock<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  id: string;
  type: BlockType;
  order: number;
  data: T;
}

// Page content structure
export interface PageContent {
  pageId: string;
  title: string;
  blocks: ContentBlock[];
  meta?: Record<string, unknown>; // SEO fields, etc.
}
