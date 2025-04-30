"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import EditableSection from "@/components/content/sections/EditableSection";
import EditableHero from "@/components/content/hero/EditableHero";
import { Section, PageContent } from "@/types/content";
import Icon from "@/components/ui/Icon";

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
        const response = await fetch("/api/admin/mock");
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

  const handleDeleteSection = (sectionId: string) => {
    if (!content) return;

    // Confirm deletion
    if (
      window.confirm(
        "Er du sikker på at du vil slette denne seksjonen? Dette kan ikke angres."
      )
    ) {
      // Filter out the section with the given ID
      setContent({
        ...content,
        sections: content.sections.filter(
          (section) => section.id !== sectionId
        ),
      });

      // Show success toast
      toast.success("Seksjon slettet");
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
      <div className="mb-12">
        <EditableHero
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          description={content.hero.description}
          imagePath="/pictures/textile2.png"
          imageAlt="Jæren Makerspace"
          isEditing={isEditing}
          onContentChange={handleContentChange}
        />
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
            <Icon name="plus" />
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
          onDelete={handleDeleteSection}
        />
      ))}

      {/* Show 'Add first section' button if no sections exist */}
      {content.sections.length === 0 && isEditing && (
        <div className="flex justify-center my-8 p-6 border border-dashed rounded-lg">
          <Button
            onClick={handleAddSection}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <span>Legg til seksjon</span>
            <Icon name="plus" />
          </Button>
        </div>
      )}
    </div>
  );
}
