import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputStyles = cva(
  "w-full rounded-xl border bg-blue-900 px-4 py-2 shadow-sm focus:outline-none focus:ring-blue-300 focus:ring-1 font-medium",
  {
    variants: {
      variant: {
        default: "border-blue-600 focus:border-blue-400 focus:ring-blue-400",
        error: "border-red-500 focus:border-red-600 focus:ring-red-600",
        success: "border-green-500 focus:border-green-600 focus:ring-green-600",
      },
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-base",
        lg: "h-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyles>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputStyles({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
