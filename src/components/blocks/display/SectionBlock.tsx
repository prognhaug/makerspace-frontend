import React from "react";
import Image from "next/image";

export interface SectionBlockProps {
  title: string;
  content: string;
  layout: "text-left" | "text-right";
  imagePath: string;
  imageAlt: string;
  [key: string]: unknown;
}

export function SectionBlock({
  title,
  content,
  layout = "text-left",
  imagePath,
  imageAlt,
}: SectionBlockProps) {
  // Split content into paragraphs for better formatting
  const paragraphs = content.split("\n").filter((p) => p.trim() !== "");

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${
            layout === "text-left" ? "md:flex-row" : "md:flex-row-reverse"
          } gap-8`}
        >
          {/* Text content */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-text">{title}</h2>
            <div className="space-y-4 text-text">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1">
            <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
              {imagePath ? (
                <Image
                  src={imagePath}
                  alt={imageAlt || title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJswPNGzXCSgAAAABJRU5ErkJggg=="
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
