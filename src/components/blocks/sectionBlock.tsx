import { registerBlock } from "@/utils/blockRegistry";
import {
  SectionBlock,
  SectionBlockProps,
} from "@/components/blocks/display/SectionBlock";
import { EditableSectionBlock } from "@/components/blocks/edit/EditableSectionBlock";
import Icon from "@/components/ui/Icon";

// Use the explicit type for better type checking
registerBlock<SectionBlockProps>({
  type: "section",
  name: "Content Section",
  description: "Image and text content section",
  icon: <Icon name="image-text" />,
  displayComponent: SectionBlock,
  editComponent: EditableSectionBlock,
  defaultData: {
    title: "New Section",
    content: "Add your content here...",
    layout: "text-left",
    imagePath: "/images/placeholder.jpg",
    imageAlt: "Placeholder image",
  },
  validator: (data) => {
    const errors = [];
    if (!data.title) errors.push("Title is required");
    if (!data.content) errors.push("Content is required");

    return {
      valid: errors.length === 0,
      errors,
    };
  },
});
