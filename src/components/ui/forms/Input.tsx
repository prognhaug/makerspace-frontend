import React, {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useId,
  useEffect,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

const inputVariants = cva(
  "w-full px-4 py-3 rounded bg-white border-none text-text focus:outline-none focus:ring-2 focus:ring-primary-light font-work-sans",
  {
    variants: {
      variant: {
        default: "",
        error: "ring-2 ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, error, id, ...props }, ref) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;

    // Reset dismissed state when error changes
    useEffect(() => {
      if (error) {
        setIsDismissed(false);
      }
    }, [error]);

    // Show error only if it exists and hasn't been dismissed
    const showError = error && !isDismissed;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-text mb-1 font-work-sans"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            className={inputVariants({
              variant: showError ? "error" : variant,
              className,
            })}
            ref={ref}
            {...props}
          />
          {showError && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss error"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {showError && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
