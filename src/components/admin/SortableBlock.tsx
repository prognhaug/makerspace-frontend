import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditableBlockRenderer } from "./EditableBlockRenderer";
import { ContentBlock } from "@/types/content";

export function SortableBlock<T extends Record<string, unknown>>({
  id,
  block,
  onUpdate,
  onDelete,
}: {
  id: string;
  block: ContentBlock<T>;
  onUpdate: (id: string, data: Partial<T>) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Create a wrapper function to ensure proper handling of updates
  const handleUpdate = (data: Partial<T>) => {
    console.log("Update received in SortableBlock:", data); // Debugging
    onUpdate(block.id, data);
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag handle */}
      <div
        className="cursor-move px-2 py-1 bg-gray-100 rounded mb-2 inline-flex items-center"
        {...attributes}
        {...listeners}
      >
        <span className="mr-2">≡</span> Drag to reorder
      </div>

      {/* Block content */}
      <div className="block-content">
        <EditableBlockRenderer
          block={block}
          onUpdate={handleUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
