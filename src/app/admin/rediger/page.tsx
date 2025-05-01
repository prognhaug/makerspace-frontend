"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import EditLandingPage from "@/components/admin/pages/EditLandingPage";

// Types of editable pages
type EditablePage = "landing" | "about" | "contact" | null;

// Mapping of page types to human-readable names
const pageNames: Record<string, string> = {
  landing: "Landingsside",
  about: "Om oss",
  contact: "Kontakt",
};

export default function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState<EditablePage>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle page selection from dropdown
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rawValue = e.target.value;
    const value = rawValue === "" ? null : (rawValue as EditablePage);

    setSelectedPage(value);
    setIsEditing(false);
  };

  // Render the selected page content
  const renderPageContent = () => {
    switch (selectedPage) {
      case "landing":
        return <EditLandingPage isEditing={isEditing} />;
      case "about":
        return <div>Om oss side (ikke implementert enda)</div>;
      case "contact":
        return <div>Kontakt side (ikke implementert enda)</div>;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
            <p>Velg en side fra nedtrekksmenyen for å redigere.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-800">
              Rediger innhold
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Page selector dropdown */}
              <div className="w-full sm:w-64">
                <select
                  value={selectedPage || ""}
                  onChange={handlePageChange}
                  className="w-full py-2 px-3 border border-gray-300 bg-white text-text rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="" className="text-text">
                    Velg side
                  </option>
                  {Object.entries(pageNames).map(([key, name]) => (
                    <option key={key} value={key} className="text-text">
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action buttons */}
              {selectedPage && (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className="w-full sm:w-auto"
                >
                  {isEditing ? "Avbryt redigering" : "Rediger innhold"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="container mx-auto px-4 py-8">{renderPageContent()}</main>
    </div>
  );
}
