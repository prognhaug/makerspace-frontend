export type Section = {
  id: string;
  title: string;
  content: string;
  layout: "text-left" | "text-right";
  imagePath: string;
  imageAlt: string;
};

export type PageContent = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  sections: Section[];
};
