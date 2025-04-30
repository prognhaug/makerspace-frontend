"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import EditableSection from "@/components/content/sections/EditableSection";
import { Section, PageContent } from "@/types/content";

interface EditLandingPageProps {
  isEditing: boolean;
}

export default function EditLandingPage({ isEditing }: EditLandingPageProps) {
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch content from mock API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/content/landing-page");
        const data = await response.json();

        // Use a temporary type for incoming data
        type RawSection = {
          id: string;
          title: string;
          content: string;
          layout: string;
          imagePath?: string;
          imageAlt?: string;
        };

        const completeData = {
          ...data,
          sections: data.sections.map((section: RawSection) => {
            const layout =
              section.layout === "text-left" || section.layout === "text-right"
                ? (section.layout as "text-left" | "text-right")
                : "text-left";

            return {
              ...section,
              layout,
              imagePath: section.imagePath || "/pictures/textile2.png",
              imageAlt: section.imageAlt || "Workshop at Jæren Makerspace",
            };
          }),
        };

        setContent(completeData as PageContent);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        import("@/temp/api-mock/content/landing-page.json").then((data) => {
          const mockData = data.default;

          type RawSection = {
            id: string;
            title: string;
            content: string;
            layout: string;
            imagePath?: string;
            imageAlt?: string;
          };

          const completeData = {
            ...mockData,
            sections: mockData.sections.map((section: RawSection) => {
              const layout =
                section.layout === "text-left" ||
                section.layout === "text-right"
                  ? (section.layout as "text-left" | "text-right")
                  : "text-left";

              return {
                ...section,
                layout,
                imagePath: section.imagePath || "/pictures/textile2.png",
                imageAlt: section.imageAlt || "Workshop at Jæren Makerspace",
              };
            }),
          };

          setContent(completeData as PageContent);
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleAddSection = () => {
    if (!content) return;

    // Generate a unique ID
    const newId = `section-${Date.now()}`;

    // Create a new section with default values
    const newSection: Section = {
      id: newId,
      title: "Ny seksjon",
      content: "Legg til innhold her...",
      layout: "text-left",
      imagePath: "/pictures/textile2.png",
      imageAlt: "Workshop at Jæren Makerspace",
    };

    // Add the new section to the content
    setContent({
      ...content,
      sections: [...content.sections, newSection],
    });

    // Show success toast
    toast.success("Ny seksjon lagt til");
  };

  const handleSave = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading("Lagrer innhold...");
    try {
      const response = await fetch("/api/admin/mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.dismiss(loadingToast);
      toast.success("Innhold lagret!");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Failed to save content:", error);
      toast.error("Kunne ikke lagre innhold. Prøv igjen senere.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (
    sectionId: string,
    field: string,
    value: string
  ) => {
    if (!content) return;

    if (sectionId === "hero") {
      setContent({
        ...content,
        hero: {
          ...content.hero,
          [field]: value,
        },
      });
    } else {
      setContent({
        ...content,
        sections: content.sections.map((section) => {
          if (section.id === sectionId) {
            return { ...section, [field]: value };
          }
          return section;
        }),
      });
    }
  };

  const handleLayoutChange = (
    sectionId: string,
    layout: "text-left" | "text-right"
  ) => {
    if (!content) return;

    setContent({
      ...content,
      sections: content.sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, layout };
        }
        return section;
      }),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Laster innhold...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Kunne ikke laste innhold</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Save button - only visible when editing */}
      {isEditing && (
        <div className="mb-6 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Lagrer..." : "Lagre endringer"}
          </Button>
        </div>
      )}

      {/* Preview/Edit Hero Section */}
      <div className="mb-12 p-6 border rounded-lg bg-gray-50 text-text">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Overskrift</label>
          {isEditing ? (
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={content.hero.title}
              onChange={(e) =>
                handleContentChange("hero", "title", e.target.value)
              }
            />
          ) : (
            <h1 className="text-h1 font-bold">{content.hero.title}</h1>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Undertittel
          </label>
          {isEditing ? (
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={content.hero.subtitle}
              onChange={(e) =>
                handleContentChange("hero", "subtitle", e.target.value)
              }
            />
          ) : (
            <h2 className="text-h3">{content.hero.subtitle}</h2>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beskrivelse
          </label>
          {isEditing ? (
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded"
              value={content.hero.description}
              onChange={(e) =>
                handleContentChange("hero", "description", e.target.value)
              }
            />
          ) : (
            <p className="text-p1">{content.hero.description}</p>
          )}
        </div>
      </div>

      {/* Preview/Edit Content Sections */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-h3 font-bold text-text">Seksjoner</h2>
        {isEditing && (
          <Button
            onClick={handleAddSection}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <span>Legg til seksjon</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Button>
        )}
      </div>

      {content.sections.map((section) => (
        <EditableSection
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
          imagePath={section.imagePath || "/pictures/textile2.png"}
          imageAlt={section.imageAlt || "Workshop at Jæren Makerspace"}
          isEditing={isEditing}
          layout={section.layout || "text-left"}
          onContentChange={handleContentChange}
          onLayoutChange={handleLayoutChange}
        />
      ))}

      {/* Show 'Add first section' button if no sections exist */}
      {content.sections.length === 0 && isEditing && (
        <div className="flex justify-center my-8 p-6 border border-dashed rounded-lg">
          <Button
            onClick={handleAddSection}
            variant="outline"
            className="flex items-center gap-2"
          >
            <span>Legg til din første seksjon</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
