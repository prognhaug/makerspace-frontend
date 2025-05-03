import React from "react";
import { LucideIcon, LucideIconName } from "@/components/ui/icons/LucideIcon";
import { CustomIcon, CustomIconName } from "@/components/ui/icons/CustomIcon";

// Combined type for all possible icons
export type IconName = LucideIconName | CustomIconName;

// The list of all custom icons for checking
const customIcons: Record<CustomIconName, true> = {
  linkedin: true,
  instagram: true,
  tiktok: true,
  check: true,
  mail: true,
  trash: true,
  plus: true,
};

type IconProps = {
  name: IconName;
  size?: number | "sm" | "lg";
  className?: string;
};

export default function Icon({ name, size = 24, className = "" }: IconProps) {
  // Check if this is a custom icon
  if (name in customIcons) {
    return (
      <CustomIcon
        name={name as CustomIconName}
        size={size}
        className={className}
      />
    );
  }

  // It's a Lucide icon
  return (
    <LucideIcon
      name={name as LucideIconName}
      size={typeof size === "number" ? size : size === "sm" ? 22 : 28}
      className={className}
    />
  );
}
