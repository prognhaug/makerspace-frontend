import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// GET handler for fetching content
export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/api-mock/content/landing-page.json"
    );
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
    const filePath = path.join(
      process.cwd(),
      "src/api-mock/content/landing-page.json"
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
