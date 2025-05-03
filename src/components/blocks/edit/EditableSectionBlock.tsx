import React, { useState, useRef, useEffect } from "react";
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

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);

  // Local editable values
  const [localData, setLocalData] = useState({
    title,
    content,
    imagePath,
    imageAlt,
    layout,
  });

  // Update local data when props change (but only when not in edit mode)
  useEffect(() => {
    if (!isEditMode) {
      setLocalData({
        title,
        content,
        imagePath,
        imageAlt,
        layout,
      });
    }
  }, [title, content, imagePath, imageAlt, layout, isEditMode]);

  const handleImageError = () => {
    console.error(`Failed to load image: ${localData.imagePath}`);
    setImageError(true);

    if (!isEditMode) {
      onChange({ imagePath: "" });
    } else {
      setLocalData((prev) => ({ ...prev, imagePath: "" }));
    }
  };

  // Handle toolbar positioning
  const showElementToolbar = (element: string, e: React.MouseEvent) => {
    if (!isEditMode) return; // Only show toolbar in edit mode

    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setToolbarPosition({
        top: e.clientY - rect.top,
        left: e.clientX - rect.left,
      });
    }

    setActiveElement(element);
    setShowToolbar(true); // Show the toolbar without automatic hiding
  };

  // Add a function to explicitly close the toolbar when needed
  const closeToolbar = () => {
    setShowToolbar(false);
  };

  // For direct text editing
  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    setLocalData((prev) => ({ ...prev, title: e.target.innerText }));
  };

  const handleContentChange = (e: React.FocusEvent<HTMLDivElement>) => {
    setLocalData((prev) => ({ ...prev, content: e.target.innerText }));
  };

  // Save changes
  const handleSave = () => {
    onChange(localData);
    setIsEditMode(false);
    setShowToolbar(false);
  };

  // Cancel changes
  const handleCancel = () => {
    setLocalData({
      title,
      content,
      imagePath,
      imageAlt,
      layout,
    });
    setIsEditMode(false);
    setShowToolbar(false);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-dashed border-gray-300 hover:border-primary"
      ref={sectionRef}
    >
      {/* Edit mode toggle in top-right corner */}
      <div className="absolute top-2 right-2 z-20 flex gap-2">
        {isEditMode ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 bg-primary text-white rounded-md text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditMode(true)}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            <Icon name="plus" size={16} />
          </button>
        )}
      </div>

      {/* Visual representation - similar to actual section display */}
      <section
        className={`flex flex-wrap items-center p-8 ${
          localData.layout === "text-left" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Text content side */}
        <div
          className="w-full lg:w-1/2 p-4 relative"
          onClick={(e) => {
            if (isEditMode) {
              showElementToolbar("text", e);
            }
          }}
        >
          <h2
            className={`text-3xl font-bold mb-4 text-text ${
              isEditMode
                ? "focus:outline-none focus:border-b focus:border-primary"
                : ""
            }`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={handleTitleChange}
            dangerouslySetInnerHTML={{ __html: localData.title }}
          />
          <div
            className={`prose max-w-none text-text ${
              isEditMode
                ? "focus:outline-none focus:border-b focus:border-primary"
                : ""
            }`}
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={handleContentChange}
            dangerouslySetInnerHTML={{
              __html: localData.content.replace(/\n/g, "<br>"),
            }}
          />
        </div>

        {/* Image side */}
        <div
          className="w-full lg:w-1/2 p-4 relative"
          onClick={(e) => {
            if (isEditMode && !e.defaultPrevented) {
              showElementToolbar("image", e);
            }
          }}
        >
          {localData.imagePath &&
          localData.imagePath.trim() !== "" &&
          !imageError ? (
            <div className="relative aspect-video rounded-lg overflow-hidden group">
              <Image
                src={localData.imagePath}
                alt={localData.imageAlt || "Section image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                onError={handleImageError}
              />
              {/* Image hover overlay - only visible in edit mode */}
              {isEditMode && (
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                  <button
                    className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      showElementToolbar("image-upload", e);
                    }}
                  >
                    <Icon name="image" size={24} className="text-primary" />
                  </button>
                </div>
              )}
            </div>
          ) : isEditMode ? (
            <div
              className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={(e) => showElementToolbar("image-upload", e)}
            >
              <div className="text-gray-500 text-center">
                <Icon name="image" size={32} className="mx-auto mb-2" />
                <p>Click to add an image</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg"></div>
          )}
        </div>
      </section>

      {/* Floating toolbar - only visible in edit mode */}
      {isEditMode && showToolbar && (
        <div
          className="absolute z-10 bg-white shadow-lg rounded-md p-2 border border-gray-200 transform -translate-y-full"
          style={{ top: toolbarPosition.top - 10, left: toolbarPosition.left }}
        >
          <button
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              closeToolbar();
            }}
          >
            <Icon name="plus" size={12} />
          </button>
          {activeElement === "text" && (
            <div className="flex space-x-2">
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() =>
                  setLocalData((prev) => ({ ...prev, layout: "text-left" }))
                }
              >
                <Icon
                  name="layout-left"
                  size={16}
                  className={
                    localData.layout === "text-left" ? "text-primary" : ""
                  }
                />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() =>
                  setLocalData((prev) => ({ ...prev, layout: "text-right" }))
                }
              >
                <Icon
                  name="layout-right"
                  size={16}
                  className={
                    localData.layout === "text-right" ? "text-primary" : ""
                  }
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
                  setLocalData((prev) => ({ ...prev, imagePath: "" }));
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
                value={localData.imagePath}
                onChange={(e) => {
                  setImageError(false);
                  setLocalData((prev) => ({
                    ...prev,
                    imagePath: e.target.value,
                  }));
                }}
              />
              <input
                type="text"
                placeholder="Alt text for accessibility"
                className="w-full p-1 border border-gray-300 rounded text-sm text-text"
                value={localData.imageAlt}
                onChange={(e) =>
                  setLocalData((prev) => ({
                    ...prev,
                    imageAlt: e.target.value,
                  }))
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
