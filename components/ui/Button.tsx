import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium rounded-xl transition-all disabled:opacity-50 disabled:pointer-events-none", // base
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-neutral-800",
        outline: "border border-neutral-300 hover:bg-neutral-100",
        ghost: "hover:bg-neutral-100",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10 p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  type?: "submit" | "button" | "reset";
}

export function Button({
  className,
  variant,
  size,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
