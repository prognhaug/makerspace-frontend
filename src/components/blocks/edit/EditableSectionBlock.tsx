import React, { useState, useRef } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

interface SectionBlockData {
  title: string;
  content: string;
  imagePath: string;
  imageAlt: string;
  layout: "text-left" | "text-right";
}

export function EditableSectionBlock({
  title = "",
  content = "",
  imagePath = "",
  imageAlt = "",
  layout = "text-left",
  onChange,
}: {
  title?: string;
  content?: string;
  imagePath?: string;
  imageAlt?: string;
  layout?: "text-left" | "text-right";
  onChange: (data: Partial<SectionBlockData>) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleImageError = () => {
    console.error(`Failed to load image: ${imagePath}`);
    setImageError(true);
    // Optionally notify the user
    onChange({ imagePath: "" }); // Clear the invalid image path
  };

  // Handle toolbar positioning
  const showElementToolbar = (element: string, e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setToolbarPosition({
        top: e.clientY - rect.top,
        left: e.clientX - rect.left,
      });
    }
    setActiveElement(element);
    setShowToolbar(true);
  };

  // For direct text editing
  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    onChange({ title: e.target.innerText });
  };

  const handleContentChange = (e: React.FocusEvent<HTMLDivElement>) => {
    onChange({ content: e.target.innerText });
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-dashed border-gray-300 hover:border-primary"
      ref={sectionRef}
      onMouseLeave={() => setShowToolbar(false)}
    >
      {/* Visual representation - similar to actual section display */}
      <section
        className={`flex flex-wrap items-center p-8 ${
          layout === "text-left" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Text content side */}
        <div
          className="w-full lg:w-1/2 p-4 relative"
          onMouseEnter={(e) => showElementToolbar("text", e)}
        >
          <h2
            className="text-3xl font-bold mb-4 text-text focus:outline-none focus:border-b focus:border-primary"
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTitleChange}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className="prose max-w-none text-text focus:outline-none focus:border-b focus:border-primary"
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentChange}
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }}
          />
        </div>

        {/* Image side */}
        <div
          className="w-full lg:w-1/2 p-4 relative"
          onMouseEnter={(e) => showElementToolbar("image", e)}
        >
          {imagePath && !imageError ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={imagePath}
                alt={imageAlt || "Section image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                onError={handleImageError}
              />
              {/* Image hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <button
                  className="p-2 bg-white rounded-full shadow-md opacity-0 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    showElementToolbar("image-upload", e);
                  }}
                >
                  <Icon name="image" size={24} className="text-primary" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={(e) => showElementToolbar("image-upload", e)}
            >
              <div className="text-gray-500 text-center">
                <Icon name="image" size={32} className="mx-auto mb-2" />
                <p>Click to add an image</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Floating toolbar */}
      {showToolbar && (
        <div
          className="absolute z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200 transform -translate-y-full"
          style={{ top: toolbarPosition.top - 10, left: toolbarPosition.left }}
        >
          {activeElement === "text" && (
            <div className="flex space-x-2">
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => onChange({ layout: "text-left" })}
              >
                <Icon
                  name="layout-left"
                  size={16}
                  className={layout === "text-left" ? "text-primary" : ""}
                />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => onChange({ layout: "text-right" })}
              >
                <Icon
                  name="layout-right"
                  size={16}
                  className={layout === "text-right" ? "text-primary" : ""}
                />
              </button>
              <div className="border-l border-gray-300 mx-1"></div>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Icon name="align-left" size={16} />
              </button>
            </div>
          )}

          {activeElement === "image" && (
            <div className="flex space-x-2">
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() =>
                  showElementToolbar("image-upload", {
                    clientX: toolbarPosition.left,
                    clientY: toolbarPosition.top,
                  } as React.MouseEvent)
                }
              >
                <Icon name="image" size={16} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded text-red-500"
                onClick={() => {
                  onChange({ imagePath: "" });
                  setImageError(false);
                }}
              >
                <Icon name="trash" size={16} />
              </button>
            </div>
          )}

          {activeElement === "image-upload" && (
            <div className="p-2 w-64">
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-1 mb-2 border border-gray-300 rounded text-sm text-text"
                value={imagePath}
                onChange={(e) => {
                  setImageError(false);
                  onChange({ imagePath: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Alt text for accessibility"
                className="w-full p-1 border border-gray-300 rounded text-sm text-text"
                value={imageAlt}
                onChange={(e) => onChange({ imageAlt: e.target.value })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
