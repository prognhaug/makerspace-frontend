import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

interface EditableImageProps {
  id: string;
  src: string;
  alt: string;
  isEditing: boolean;
  onChange: (id: string, field: string, value: string) => void;
  className?: string;
}

export default function EditableImage({
  id,
  src,
  alt,
  isEditing,
  onChange,
  className = "",
}: EditableImageProps) {
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [localSrc, setLocalSrc] = useState(src);
  const [localAlt, setLocalAlt] = useState(alt);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSave = () => {
    onChange(id, "imagePath", localSrc);
    onChange(id, "imageAlt", localAlt);
    setShowImageEditor(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Image display */}
      <div className="relative aspect-video rounded overflow-hidden">
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400">Image not available</p>
          </div>
        )}

        {/* Edit overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity flex items-center justify-center">
            <button
              className="p-2 bg-white rounded-full shadow-md opacity-0 hover:opacity-100 group-hover:opacity-100"
              onClick={() => setShowImageEditor(true)}
            >
              <Icon name="instagram" size="sm" className="text-primary" />
            </button>
          </div>
        )}
      </div>

      {/* Image editor dialog */}
      {isEditing && showImageEditor && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-white p-4 shadow-lg rounded border border-gray-200">
          <h3 className="font-medium mb-2">Edit Image</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={localSrc}
                onChange={(e) => {
                  setLocalSrc(e.target.value);
                  setImageError(false);
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={localAlt}
                onChange={(e) => setLocalAlt(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowImageEditor(false)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-primary text-white rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
