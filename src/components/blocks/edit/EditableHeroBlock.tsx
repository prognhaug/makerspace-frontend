import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { HeroBlockData } from "@/components/blocks/display/HeroBlock";

export function EditableHeroBlock({
  title = "",
  subtitle = "",
  description = "",
  imagePath = "",
  imageAlt = "",
  ctaText = "",
  ctaLink = "",
  layout = "center",
  overlayOpacity = 0.5,
  onChange,
}: HeroBlockData & {
  onChange: (data: Partial<HeroBlockData>) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="font-medium text-gray-900 mb-4">Hero Block</h3>

      {/* Title input */}
      <div className="mb-4">
        <label
          htmlFor="hero-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="hero-title"
          type="text"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter hero title"
        />
      </div>

      {/* Subtitle input */}
      <div className="mb-4">
        <label
          htmlFor="hero-subtitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subtitle (optional)
        </label>
        <input
          id="hero-subtitle"
          type="text"
          value={subtitle}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter subtitle"
        />
      </div>

      {/* Description textarea */}
      <div className="mb-4">
        <label
          htmlFor="hero-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="hero-description"
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter description"
        />
      </div>

      {/* Call to action fields */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cta-text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Button Text (optional)
          </label>
          <input
            id="cta-text"
            type="text"
            value={ctaText}
            onChange={(e) => onChange({ ctaText: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Call to action text"
          />
        </div>

        <div>
          <label
            htmlFor="cta-link"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Button Link (optional)
          </label>
          <input
            id="cta-link"
            type="text"
            value={ctaLink}
            onChange={(e) => onChange({ ctaLink: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="/path/to/page"
          />
        </div>
      </div>

      {/* Layout selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Layout
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => onChange({ layout: "left" })}
            className={`p-2 border rounded-md flex items-center ${
              layout === "left"
                ? "bg-blue-50 border-blue-500"
                : "border-gray-300"
            }`}
          >
            <Icon name="align-left" className="mr-2" size={16} />
            Left
          </button>
          <button
            type="button"
            onClick={() => onChange({ layout: "center" })}
            className={`p-2 border rounded-md flex items-center ${
              layout === "center"
                ? "bg-blue-50 border-blue-500"
                : "border-gray-300"
            }`}
          >
            <Icon name="align-center" className="mr-2" size={16} />
            Center
          </button>
          <button
            type="button"
            onClick={() => onChange({ layout: "right" })}
            className={`p-2 border rounded-md flex items-center ${
              layout === "right"
                ? "bg-blue-50 border-blue-500"
                : "border-gray-300"
            }`}
          >
            <Icon name="align-right" className="mr-2" size={16} />
            Right
          </button>
        </div>
      </div>

      {/* Image section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Image
        </label>

        {/* Image preview */}
        <div className="mb-2 border border-gray-200 rounded-md p-2 bg-gray-50">
          {imagePath && !imageError ? (
            <div className="relative h-48 bg-gray-200">
              <Image
                src={imagePath}
                alt={imageAlt || "Hero image"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
                onError={handleImageError}
              />
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
              <div className="text-gray-500 text-center">
                <Icon name="image" size={32} className="mx-auto mb-2" />
                <p>No image selected or image failed to load</p>
              </div>
            </div>
          )}
        </div>

        {/* Image URL input */}
        <div className="mb-2">
          <label
            htmlFor="image-path"
            className="block text-sm text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            id="image-path"
            type="text"
            value={imagePath}
            onChange={(e) => {
              setImageError(false);
              onChange({ imagePath: e.target.value });
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
          />
        </div>

        {/* Image Alt Text */}
        <div>
          <label
            htmlFor="image-alt"
            className="block text-sm text-gray-700 mb-1"
          >
            Alt Text
          </label>
          <input
            id="image-alt"
            type="text"
            value={imageAlt}
            onChange={(e) => onChange({ imageAlt: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe the image for accessibility"
          />
        </div>
      </div>

      {/* Advanced options toggle */}
      <div className="mt-4 border-t pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 flex items-center"
        >
          <span>{showAdvanced ? "Hide" : "Show"} advanced options</span>
          <Icon
            name={showAdvanced ? "chevron-up" : "chevron-down"}
            size={16}
            className="ml-1"
          />
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="overlay-opacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Overlay Opacity: {overlayOpacity}
              </label>
              <input
                id="overlay-opacity"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) =>
                  onChange({ overlayOpacity: parseFloat(e.target.value) })
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Transparent</span>
                <span>Opaque</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
