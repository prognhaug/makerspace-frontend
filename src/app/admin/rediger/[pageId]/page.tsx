"use client";

import { useEffect } from "react";
import { use } from "react";
import { PageEditor } from "@/components/admin/PageEditor";
import { initBlockTypes } from "@/utils/initBlockTypes";

type PageParams = { pageId: string };

export default function AdminEditPage({ params }: { params: PageParams }) {
  // Initialize block types when the page loads
  useEffect(() => {
    initBlockTypes();
  }, []);

  const unwrappedParams = use(params as unknown as Promise<PageParams>);
  const { pageId } = unwrappedParams;

  return (
    <div className="admin-edit-page">
      <PageEditor pageId={pageId} />
    </div>
  );
}
