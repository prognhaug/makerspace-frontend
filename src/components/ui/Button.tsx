import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Icon, { IconName } from "./Icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary-brown text-white hover:bg-primary-dark focus:ring-primary-medium",
        outline:
          "border border-primary-brown text-primary-brown hover:bg-primary-faint focus:ring-primary-medium",
      },
      size: {
        xs: "h-6 text-xs py-1 px-2", // 24px
        sm: "h-[30px] text-sm py-1.5 px-3", // 30px
        md: "h-9 text-sm py-2 px-4", // 36px
        lg: "h-10 text-base py-2 px-5", // 40px
        xl: "h-[52px] text-lg py-3 px-6", // 52px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

const Button = ({
  children,
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  // Determine icon size based on button size
  const iconSize = size === "lg" || size === "xl" ? "lg" : "sm";

  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {leftIcon && <Icon name={leftIcon} size={iconSize} className="mr-2" />}
      {children}
      {rightIcon && <Icon name={rightIcon} size={iconSize} className="ml-2" />}
    </button>
  );
};

export default Button;
