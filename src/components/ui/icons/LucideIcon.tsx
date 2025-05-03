import React from "react";
import {
  LayoutPanelLeft,
  PanelRight,
  Image,
  ChevronDown,
  ChevronUp,
  GripVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Layout,
  LucideProps,
} from "lucide-react";

export type LucideIconName =
  | "layout-left"
  | "layout-right"
  | "image"
  | "chevron-up"
  | "chevron-down"
  | "grip"
  | "image-text"
  | "align-left"
  | "align-center"
  | "align-right"
  | "layout-hero";

type LucideIconProps = {
  name: LucideIconName;
} & Omit<LucideProps, "ref">;

// Map icon names to Lucide components
const lucideIcons = {
  "layout-left": LayoutPanelLeft,
  "layout-right": PanelRight,
  "image-text": LayoutPanelLeft,
  image: Image,
  "chevron-up": ChevronUp,
  "chevron-down": ChevronDown,
  grip: GripVertical,
  "align-left": AlignLeft,
  "align-center": AlignCenter,
  "align-right": AlignRight,
  "layout-hero": Layout,
};

export function LucideIcon({ name, ...props }: LucideIconProps) {
  const IconComponent = lucideIcons[name];
  return <IconComponent {...props} />;
}
