"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

type Section = {
  id: string;
  title: string;
  content: string;
};

type PageContent = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  sections: Section[];
};

export default function EditLandingPage() {
  const router = useRouter();
  const [content, setContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch content from mock API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // In a real app, this would be an API call
        // For mock, we'll import the JSON directly
        const response = await fetch("/api/content/landing-page");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        // Fallback to mock data if API fails
        import("@/api-mock/content/landing-page.json")
          .then((data) => {
            setContent(data.default);
          })
          .catch((err) => console.error("Failed to load mock data:", err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

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
      setIsEditing(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Failed to save content:", error);
      alert("Kunne ikke lagre innhold. Prøv igjen senere.");
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Laster innhold...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Kunne ikke laste innhold</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-faint py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-h2 font-bold text-text">Rediger landingsside</h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Avbryt
            </Button>

            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Avbryt redigering
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Lagrer..." : "Lagre endringer"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Rediger innhold
              </Button>
            )}
          </div>
        </div>

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
        <h2 className="text-h3 font-bold mb-4 text-text">Seksjoner</h2>
        {content.sections.map((section) => (
          <div
            key={section.id}
            className="mb-8 p-6 border rounded-lg text-text"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seksjon tittel
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={section.title}
                  onChange={(e) =>
                    handleContentChange(section.id, "title", e.target.value)
                  }
                />
              ) : (
                <h3 className="text-h3 font-medium">{section.title}</h3>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Innhold
              </label>
              {isEditing ? (
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border rounded"
                  value={section.content}
                  onChange={(e) =>
                    handleContentChange(section.id, "content", e.target.value)
                  }
                />
              ) : (
                <p className="text-p1">{section.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
