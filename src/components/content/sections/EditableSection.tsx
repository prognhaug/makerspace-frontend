import React from "react";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import Icon from "@/components/ui/Icon";

interface EditableSectionProps {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  imageAlt: string;
  isEditing: boolean;
  layout: "text-left" | "text-right";
  onContentChange: (id: string, field: string, value: string) => void;
  onLayoutChange: (id: string, layout: "text-left" | "text-right") => void;
  onDelete: (id: string) => void;
}

export default function EditableSection({
  id,
  title,
  content,
  imagePath,
  imageAlt,
  isEditing,
  layout,
  onContentChange,
  onLayoutChange,
  onDelete,
}: EditableSectionProps) {
  return (
    <div className="mb-16 relative bg-primary-faint">
      {/* Edit controls */}
      {isEditing && (
        <div className="absolute top-0 right-0 flex space-x-2 z-10">
          {/* Layout controls */}
          <div className="flex space-x-1">
            <button
              className={`p-2 rounded ${
                layout === "text-left" ? "bg-primary text-white" : "bg-gray-100"
              }`}
              onClick={() => onLayoutChange(id, "text-left")}
              title="Text on left"
            >
              Text left
            </button>
            <button
              className={`p-2 rounded ${
                layout === "text-right"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => onLayoutChange(id, "text-right")}
              title="Text on right"
            >
              Text right
            </button>
          </div>

          {/* Delete button */}
          <button
            className="p-2 bg-red-100 text-red-500 rounded hover:bg-red-200"
            onClick={() => onDelete(id)}
            title="Delete section"
          >
            <Icon name="trash" size="sm" />
          </button>
        </div>
      )}

      {/* Section content */}
      <div
        className={`flex flex-wrap items-center ${
          layout === "text-left" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Text content */}
        <div className="w-full lg:w-1/2 p-4">
          <EditableText
            id={id}
            value={title}
            variant="heading"
            isEditing={isEditing}
            onChange={onContentChange}
            fieldName="title"
            className="mb-4"
          />

          <EditableText
            id={id}
            value={content}
            variant="paragraph"
            isEditing={isEditing}
            onChange={onContentChange}
            fieldName="content"
          />
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 p-4">
          <EditableImage
            id={id}
            src={imagePath}
            alt={imageAlt}
            isEditing={isEditing}
            onChange={onContentChange}
          />
        </div>
      </div>
    </div>
  );
}
