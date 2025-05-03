import { BlockType } from "@/types/content";

export interface BlockDefinition<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  type: BlockType;
  name: string;
  description: string;
  icon: React.ReactNode;
  displayComponent: React.ComponentType<T>;
  editComponent: React.ComponentType<
    T & { onChange: (data: Partial<T>) => void }
  >;
  defaultData: T;
  validator?: (data: T) => { valid: boolean; errors?: string[] };
}

const BLOCK_REGISTRY = new Map<
  BlockType,
  BlockDefinition<Record<string, unknown>>
>();

// Function to register a block
export function registerBlock<T extends Record<string, unknown>>(
  definition: BlockDefinition<T>
) {
  BLOCK_REGISTRY.set(
    definition.type,
    definition as BlockDefinition<Record<string, unknown>>
  );
}

// When retrieving, we cast to the specific type needed
export function getBlockDefinition<
  T extends Record<string, unknown> = Record<string, unknown>
>(type: BlockType): BlockDefinition<T> | undefined {
  const definition = BLOCK_REGISTRY.get(type);
  return definition as BlockDefinition<T> | undefined;
}

export function getAllBlockTypes(): BlockDefinition<Record<string, unknown>>[] {
  return Array.from(BLOCK_REGISTRY.values());
}
