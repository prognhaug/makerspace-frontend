import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBlock } from "./SortableBlock";
import { useContentEditor } from "@/hooks/useContentEditor";
import { getAllBlockTypes } from "@/utils/blockRegistry";

export function PageEditor({ pageId }: { pageId: string }) {
  const {
    page,
    isLoading,
    isSaving,
    addBlock,
    updateBlockData,
    removeBlock,
    reorderBlocks,
    savePage,
  } = useContentEditor(pageId);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  if (isLoading || !page || !page.blocks) {
    return <div className="loading-indicator">Loading content...</div>;
  }

  if (isLoading) return <div className="loading-indicator">Loading...</div>;
  if (!page)
    return <div className="error-state">Could not load page content</div>;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Ensure both page exists and both active and over ids exist
    if (!page || !active.id || !over?.id || active.id === over.id) {
      return;
    }

    const oldIndex = page.blocks.findIndex((block) => block.id === active.id);
    const newIndex = page.blocks.findIndex((block) => block.id === over.id);

    // Additional check to ensure indices were found
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newOrder = arrayMove(
      page.blocks.map((block) => block.id),
      oldIndex,
      newIndex
    );

    reorderBlocks(newOrder);
  }

  return (
    <div className="page-editor p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">{page.title}</h1>
        <button
          onClick={savePage}
          disabled={isSaving}
          className="primary-button"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={page.blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-8">
            {page.blocks.map((block) => (
              <SortableBlock
                key={block.id}
                id={block.id}
                block={block}
                onUpdate={updateBlockData}
                onDelete={removeBlock}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Block section remains the same */}
      <div className="add-block-section mt-8 pt-8 border-t">
        <h3 className="text-lg font-medium mb-4">Add New Content</h3>
        <div className="grid grid-cols-3 gap-4">
          {getAllBlockTypes().map((definition) => (
            <button
              key={definition.type}
              onClick={() => addBlock(definition.type)}
              className="block-type-button p-4 border rounded hover:bg-gray-50"
            >
              <div className="icon mb-2">{definition.icon}</div>
              <div className="font-medium">{definition.name}</div>
              <div className="text-sm text-gray-500">
                {definition.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
