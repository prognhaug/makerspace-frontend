import { PageContent } from "@/types/content";

/**
 * Fetches page content by page ID
 * @param pageId - The ID of the page to fetch
 * @returns Promise containing the page content
 */
export async function fetchPageContent(pageId: string): Promise<PageContent> {
  try {
    // For now, we'll use the mock API endpoint for all page IDs
    // Later, this can be updated to use different endpoints based on pageId
    const response = await fetch(`/api/admin/mock?pageId=${pageId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch page content: ${response.statusText}`);
    }

    const data = await response.json();
    return data as PageContent;
  } catch (error) {
    console.error("Error fetching page content:", error);

    // Fallback to local JSON if fetch fails
    // This is especially useful during development
    try {
      // Using dynamic import to load the JSON file
      const contentModule = await import(
        `@/temp/api-mock/content/${pageId}.json`
      );
      return contentModule.default as PageContent;
    } catch (fallbackError) {
      console.error("Fallback loading failed:", fallbackError);
      throw new Error("Could not load page content from any source");
    }
  }
}

/**
 * Saves page content
 * @param page - The page content to save
 * @returns Promise that resolves when the save is complete
 */
export async function savePageContent(page: PageContent): Promise<void> {
  try {
    const response = await fetch("/api/admin/mock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      throw new Error(`Failed to save page content: ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error("Save operation did not report success");
    }
  } catch (error) {
    console.error("Error saving page content:", error);
    throw error;
  }
}
