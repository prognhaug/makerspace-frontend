"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface EditableHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imagePath?: string;
  imageAlt?: string;
  isEditing: boolean;
  onContentChange: (id: string, field: string, value: string) => void;
}

export default function EditableHero({
  title,
  subtitle,
  description,
  imagePath = "/pictures/hero.png",
  imageAlt = "Jæren Makerspace",
  isEditing,
  onContentChange,
}: EditableHeroProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-secondary-beige">
      <div
        className="container mx-auto px-4 py-10 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edit overlay indicator - only shown when editing and hovered */}
        {isEditing && isHovered && (
          <div className="absolute top-2 right-2 bg-white rounded shadow px-3 py-2 z-10 text-sm">
            Rediger hero-seksjon
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <Image
              src={imagePath}
              alt={imageAlt}
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col space-y-6 text-text">
            {isEditing ? (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Overskrift
                </label>
                <input
                  type="text"
                  className="font-poppins text-2xl font-bold w-full px-4 py-2 border rounded"
                  value={title}
                  onChange={(e) =>
                    onContentChange("hero", "title", e.target.value)
                  }
                />
              </div>
            ) : (
              <h1 className="font-poppins text-4xl md:text-5xl font-bold">
                {title}
              </h1>
            )}

            {isEditing ? (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Undertittel
                </label>
                <input
                  type="text"
                  className="font-poppins text-xl w-full px-4 py-2 border rounded"
                  value={subtitle}
                  onChange={(e) =>
                    onContentChange("hero", "subtitle", e.target.value)
                  }
                />
              </div>
            ) : (
              <h2 className="font-poppins text-2xl md:text-3xl">{subtitle}</h2>
            )}

            {isEditing ? (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Beskrivelse
                </label>
                <textarea
                  rows={4}
                  className="font-work-sans w-full px-4 py-2 border rounded"
                  value={description}
                  onChange={(e) =>
                    onContentChange("hero", "description", e.target.value)
                  }
                />
              </div>
            ) : (
              <p className="font-work-sans">{description}</p>
            )}

            {!isEditing && (
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/meld-interesse">
                  <Button
                    variant="default"
                    size="md"
                    className="bg-primary-brown text-white hover:bg-primary-brown/90"
                  >
                    Meld interesse
                  </Button>
                </Link>

                <Link href="/ta-kontakt">
                  <Button variant="outline" size="md">
                    Ta kontakt
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
