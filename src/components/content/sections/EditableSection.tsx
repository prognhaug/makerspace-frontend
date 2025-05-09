"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/types/content";
import Icon from "@/components/ui/Icon";

interface EditableSectionProps extends Section {
  isEditing: boolean;
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
  layout,
  isEditing,
  onContentChange,
  onLayoutChange,
  onDelete,
}: EditableSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const textColumnOrder = layout === "text-left" ? "order-first" : "order-last";
  const imageColumnOrder =
    layout === "text-left" ? "order-last" : "order-first";

  return (
    <div
      className="w-full bg-primary-faint py-10 my-6 rounded-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit overlay UI */}
      {isEditing && isHovered && (
        <div className="absolute top-2 right-2 bg-white rounded shadow px-3 py-2 z-10 flex gap-2">
          <button
            className={`px-2 py-1 rounded text-sm border ${
              layout === "text-left"
                ? "bg-primary-brown text-white border-primary-brown"
                : "bg-white text-primary-brown border-primary-brown"
            }`}
            onClick={() => onLayoutChange(id, "text-left")}
          >
            Text Left
          </button>
          <button
            className={`px-2 py-1 rounded text-sm border ${
              layout === "text-right"
                ? "bg-primary-brown text-white border-primary-brown"
                : "bg-white text-primary-brown border-primary-brown"
            }`}
            onClick={() => onLayoutChange(id, "text-right")}
          >
            Text Right
          </button>
          <button
            className="px-2 py-1 rounded text-sm border border-red-500 bg-white text-red-500 ml-2"
            onClick={() => onDelete(id)}
          >
            <Icon name="trash" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div
            className={`flex flex-col space-y-6 text-text ${textColumnOrder} text-left`}
          >
            {isEditing ? (
              <input
                type="text"
                className="font-poppins text-3xl font-bold w-full px-4 py-2 border rounded"
                value={title}
                onChange={(e) => onContentChange(id, "title", e.target.value)}
              />
            ) : (
              <h2 className="font-poppins text-3xl font-bold">{title}</h2>
            )}

            {isEditing ? (
              <textarea
                rows={6}
                className="font-work-sans w-full px-4 py-2 border rounded"
                value={content}
                onChange={(e) => onContentChange(id, "content", e.target.value)}
              />
            ) : (
              <p className="font-work-sans">{content}</p>
            )}
          </div>

          {/* Image Column */}
          <div
            className={`flex ${
              layout === "text-left"
                ? "justify-center md:justify-end"
                : "justify-center md:justify-start"
            } ${imageColumnOrder}`}
          >
            <Image
              src={imagePath || "/pictures/textile2.png"}
              alt={imageAlt || "Workshop at Jæren Makerspace"}
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
