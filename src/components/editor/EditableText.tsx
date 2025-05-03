import React, { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  id: string;
  value: string;
  variant?: "heading" | "paragraph" | "subtitle";
  isEditing: boolean;
  placeholder?: string;
  onChange: (id: string, field: string, value: string) => void;
  fieldName: string;
  className?: string;
}

export default function EditableText({
  id,
  value,
  variant = "paragraph",
  isEditing,
  placeholder = "Add text here...",
  onChange,
  fieldName,
  className = "",
}: EditableTextProps) {
  const [localValue, setLocalValue] = useState(value);
  const divRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);

  // Update local value when props change and not focused
  useEffect(() => {
    const currentElements = [
      divRef.current,
      h2Ref.current,
      h3Ref.current,
    ].filter(Boolean);

    const isAnyRefFocused = currentElements.some(
      (el) => el === document.activeElement
    );

    if (!isAnyRefFocused) {
      setLocalValue(value);
    }
  }, [value]);

  // Handle content changes - determine which ref to check
  const handleBlur = () => {
    let newValue = "";

    if (variant === "heading" && h2Ref.current) {
      newValue = h2Ref.current.innerText;
    } else if (variant === "subtitle" && h3Ref.current) {
      newValue = h3Ref.current.innerText;
    } else if (divRef.current) {
      newValue = divRef.current.innerText;
    }

    onChange(id, fieldName, newValue);
  };

  // Shared props for all element types
  const commonProps = {
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    dangerouslySetInnerHTML: { __html: localValue || placeholder },
  };

  // Render different elements based on variant
  if (variant === "heading") {
    return isEditing ? (
      <h2
        ref={h2Ref}
        className={`text-size-h2 text-default ${className} ${
          isEditing
            ? "focus:outline-none focus:border-b focus:border-primary p-1"
            : ""
        }`}
        {...commonProps}
      />
    ) : (
      <h2 className={`text-size-h2 text-default font-poppins ${className}`}>
        {localValue || placeholder}
      </h2>
    );
  } else if (variant === "subtitle") {
    return isEditing ? (
      <h3
        ref={h3Ref}
        className={`text-size-h3 text-default font-poppins ${className} ${
          isEditing
            ? "focus:outline-none focus:border-b focus:border-primary p-1"
            : ""
        }`}
        {...commonProps}
      />
    ) : (
      <h3 className={`text-size-h3 text-default font-poppins ${className}`}>
        {localValue || placeholder}
      </h3>
    );
  } else {
    return isEditing ? (
      <div
        ref={divRef}
        className={`text-size-p1 text-default font-work-sans ${className} ${
          isEditing
            ? "focus:outline-none focus:border-b focus:border-primary p-1"
            : ""
        }`}
        {...commonProps}
      />
    ) : (
      <div className={`text-size-p1 text-default font-work-sans ${className}`}>
        {localValue || placeholder}
      </div>
    );
  }
}
