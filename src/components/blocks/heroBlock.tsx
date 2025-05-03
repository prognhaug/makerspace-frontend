import { registerBlock } from "@/utils/blockRegistry";
import {
  HeroBlock,
  HeroBlockData,
} from "@/components/blocks/display/HeroBlock";
import { EditableHeroBlock } from "@/components/blocks/edit/EditableHeroBlock";
import Icon from "@/components/ui/Icon";

// Register the hero block
registerBlock<HeroBlockData>({
  type: "hero",
  name: "Hero Banner",
  description: "Large banner with image background and call-to-action",
  icon: <Icon name="layout-hero" />,
  displayComponent: HeroBlock,
  editComponent: EditableHeroBlock,
  defaultData: {
    title: "Welcome to Our Site",
    subtitle: "Discover what we offer",
    description:
      "This is a brief description of what your visitors can expect to find.",
    imagePath: "/images/placeholder-hero.jpg",
    imageAlt: "Hero background image",
    ctaText: "Learn More",
    ctaLink: "/about",
    layout: "center",
    overlayOpacity: 0.5,
  },
  validator: (data) => {
    const errors = [];
    if (!data.title) errors.push("Title is required");
    if (!data.description) errors.push("Description is required");

    return {
      valid: errors.length === 0,
      errors,
    };
  },
});
