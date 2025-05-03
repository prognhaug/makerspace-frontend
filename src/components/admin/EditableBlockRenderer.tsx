import { getBlockDefinition } from "@/utils/blockRegistry";
import { ContentBlock } from "@/types/content";

export function EditableBlockRenderer<T extends Record<string, unknown>>({
  block,
  onUpdate,
  onDelete,
}: {
  block: ContentBlock<T>;
  onUpdate: (data: Partial<T>) => void;
  onDelete: (id: string) => void;
}) {
  const definition = getBlockDefinition(block.type);
  if (!definition || !definition.editComponent) {
    return <div className="error-block">Unknown block type: {block.type}</div>;
  }

  const EditComponent = definition.editComponent;

  // Create a wrapped update handler for debugging
  const handleUpdate = (data: Partial<Record<string, unknown>>) => {
    console.log("EditableBlockRenderer received update:", data);
    // Use type assertion to tell TypeScript this is safe
    onUpdate(data as Partial<T>);
  };

  const handleDelete = () => {
    onDelete(block.id);
  };

  return (
    <div className="editable-block border border-gray-200 rounded-lg p-4 bg-white">
      <div className="block-controls mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleDelete}
          className="delete-button text-red-500 hover:text-red-700"
        >
          Delete Block
        </button>
      </div>

      <EditComponent {...block.data} onChange={handleUpdate} />
    </div>
  );
}
