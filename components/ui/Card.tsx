import * as React from "react";
import { cn } from "@/utils/cn";

type CardBaseProps = React.HTMLAttributes<HTMLDivElement>;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

// Subcomponents
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1 p-4 border-b", className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "Card.Header";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-4", className)} {...props} />;
  }
);
CardContent.displayName = "Card.Content";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "Card.Title";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "Card.Description";

// Main Card Component
type CardComponent = React.ForwardRefExoticComponent<
  CardBaseProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
};

const Card = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-2xl border bg-white shadow-sm", className)}
        {...props}
      />
    );
  }
) as CardComponent;

Card.displayName = "Card";

// Attach subcomponents
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Description = CardDescription;

export { Card };
