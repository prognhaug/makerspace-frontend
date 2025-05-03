import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// GET handler for fetching content
export async function GET(request: Request) {
  try {
    // Extract page ID from query params
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId") || "landing-page";

    const filePath = path.join(
      process.cwd(),
      `src/temp/api-mock/content/${pageId}.json`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading content file:", error);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}

// POST handler for saving content
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Use the pageId from the content to determine where to save it
    const pageId = data.pageId || "landing-page";

    const filePath = path.join(
      process.cwd(),
      `src/temp/api-mock/content/${pageId}.json`
    );

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
