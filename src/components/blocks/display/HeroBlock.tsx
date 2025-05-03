import React from "react";
import Image from "next/image";

export interface HeroBlockData {
  title: string;
  subtitle?: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  layout?: "center" | "left" | "right";
  overlayOpacity?: number;
  [key: string]: unknown; // To satisfy Record<string, unknown>
}

export function HeroBlock({
  title,
  subtitle,
  description,
  imagePath,
  imageAlt,
  ctaText,
  ctaLink,
  layout = "center",
  overlayOpacity = 0.5,
}: HeroBlockData) {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={imageAlt || "Hero background"}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div
          className={`
          max-w-3xl text-white
          ${layout === "center" ? "mx-auto text-center" : ""}
          ${layout === "right" ? "ml-auto text-right" : ""}
        `}
        >
          {subtitle && <p className="text-xl mb-2 font-light">{subtitle}</p>}
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl mb-8">{description}</p>

          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md inline-block font-medium transition-colors"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
