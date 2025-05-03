import React from "react";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";

interface EditableHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  isEditing: boolean;
  onContentChange: (id: string, field: string, value: string) => void;
}

export default function EditableHero({
  title,
  subtitle,
  description,
  imagePath,
  imageAlt,
  isEditing,
  onContentChange,
}: EditableHeroProps) {
  const heroId = "hero";

  return (
    <div className="flex flex-col md:flex-row items-center bg-secondary-beige">
      {/* Hero image */}
      <div className="w-full md:w-1/2 p-4">
        <EditableImage
          id={heroId}
          src={imagePath}
          alt={imageAlt}
          isEditing={isEditing}
          onChange={onContentChange}
        />
      </div>
      {/* Text content */}
      <div className="w-full md:w-1/2 p-4">
        <EditableText
          id={heroId}
          value={title}
          variant="heading"
          isEditing={isEditing}
          onChange={onContentChange}
          fieldName="title"
          className="text-4xl mb-2"
        />

        <EditableText
          id={heroId}
          value={subtitle}
          variant="subtitle"
          isEditing={isEditing}
          onChange={onContentChange}
          fieldName="subtitle"
          className="mb-4"
        />

        <EditableText
          id={heroId}
          value={description}
          variant="paragraph"
          isEditing={isEditing}
          onChange={onContentChange}
          fieldName="description"
        />
      </div>
    </div>
  );
}
