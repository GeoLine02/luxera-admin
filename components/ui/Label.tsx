import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const labelStyles = cva("block text-sm font-medium text-gray-700", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    variant: {
      default: "text-gray-700",
      error: "text-red-600",
      success: "text-green-600",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelStyles>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelStyles({ size, variant }), className)}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";
