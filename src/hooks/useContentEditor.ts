import { useEffect, useState } from "react";
import { fetchPageContent, savePageContent } from "@/lib/api";
import { getBlockDefinition } from "@/utils/blockRegistry";
import { BlockType, ContentBlock, PageContent } from "@/types/content";
export function useContentEditor(pageId: string) {
  const [page, setPage] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch page content
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await fetchPageContent(pageId);
        setPage(data);
      } catch (error) {
        console.error("Error fetching page:", error);
        // Fallback to local data if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [pageId]);

  // Block management functions
  const addBlock = (type: BlockType) => {
    if (!page) return;

    const definition = getBlockDefinition(type);
    if (!definition) return;

    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      order: page.blocks.length,
      data: { ...definition.defaultData },
    };

    setPage({
      ...page,
      blocks: [...page.blocks, newBlock],
    });
  };

  const updateBlockData = <T extends Record<string, unknown>>(
    blockId: string,
    data: Partial<T>
  ) => {
    if (!page) return;

    setPage({
      ...page,
      blocks: page.blocks.map((block) => {
        if (block.id === blockId) {
          return {
            ...block,
            data: { ...block.data, ...data } as typeof block.data,
          };
        }
        return block;
      }),
    });
  };

  const removeBlock = (blockId: string) => {
    if (!page || !window.confirm("Are you sure you want to delete this block?"))
      return;

    setPage({
      ...page,
      blocks: page.blocks.filter((block) => block.id !== blockId),
    });
  };

  const reorderBlocks = (blockIds: string[]) => {
    if (!page) return;

    const newBlocks = [...page.blocks];
    blockIds.forEach((id, index) => {
      const blockIndex = newBlocks.findIndex((block) => block.id === id);
      if (blockIndex !== -1) {
        newBlocks[blockIndex] = { ...newBlocks[blockIndex], order: index };
      }
    });

    setPage({
      ...page,
      blocks: newBlocks.sort((a, b) => a.order - b.order),
    });
  };

  // Saving functionality
  const savePage = async () => {
    if (!page) return;

    setIsSaving(true);
    try {
      await savePageContent(page);
      return true;
    } catch (error) {
      console.error("Error saving page:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    page,
    isLoading,
    isSaving,
    addBlock,
    updateBlockData,
    removeBlock,
    reorderBlocks,
    savePage,
  };
}
