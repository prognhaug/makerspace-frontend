import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Icon, { IconName } from "./Icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-colors cursor-pointer font-work-sans",
  {
    variants: {
      variant: {
        default:
          "bg-primary-brown text-white hover:bg-primary-brown/90 focus:bg-primary-brown/90 focus:outline-none",
        outline:
          "border border-primary-brown text-primary-brown hover:bg-primary-faint focus:bg-primary-faint focus:outline-none",
      },
      size: {
        xs: "h-6 text-xs py-1 px-2", // 24px
        sm: "h-[34px] text-sm py-1.5 px-3", // 34px
        md: "h-[40px] text-sm py-2.5 px-4", // 40px
        lg: "h-12 text-base py-2.5 px-5", // 48px
        xl: "h-[56px] text-lg py-3.5 px-6", // 56px
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
  fullWidth?: boolean;
}

const Button = ({
  children,
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  fullWidth,
  ...props
}: ButtonProps) => {
  const iconSize = size === "lg" || size === "xl" ? "lg" : "sm";

  return (
    <button
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...props}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} className="mr-2" />}
      {children}
      {rightIcon && <Icon name={rightIcon} size={iconSize} className="ml-2" />}
    </button>
  );
};

export default Button;
