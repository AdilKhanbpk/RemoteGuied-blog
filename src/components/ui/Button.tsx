'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Button styles moved from globals.css
const buttonStyles = `
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 300ms ease-in-out;
    background: linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(221 83% 48%) 100%);
    color: hsl(var(--primary-foreground));
    box-shadow: 0 4px 14px 0 hsl(221 83% 53% / 0.25);
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-height: 44px;
  }

  @media (min-width: 768px) {
    .btn-primary {
      padding: 0.875rem 2rem;
      font-size: 0.875rem;
      min-height: 40px;
    }
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px 0 hsl(221 83% 53% / 0.35);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    font-weight: 500;
    border: 2px solid;
    transition: all 300ms ease-in-out;
    border-color: hsl(var(--border));
    background: hsl(var(--background));
    color: hsl(var(--content-primary));
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-height: 44px;
  }

  @media (min-width: 768px) {
    .btn-secondary {
      padding: 0.875rem 2rem;
      font-size: 0.875rem;
      min-height: 40px;
    }
  }

  .btn-secondary:hover {
    border-color: hsl(var(--primary));
    color: hsl(var(--primary));
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px hsl(220 13% 91% / 0.1), 0 2px 4px -1px hsl(220 13% 91% / 0.06);
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    min-height: 48px;
  }

  @media (min-width: 768px) {
    .btn-lg {
      padding: 1.125rem 2.5rem;
      font-size: 1rem;
      min-height: 44px;
    }
  }
`;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:-translate-y-0.5",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm min-h-[44px] sm:min-h-[40px] sm:text-sm [&_svg]:size-4",
        sm: "h-9 px-3 py-1.5 text-sm min-h-[40px] sm:min-h-[36px] sm:text-xs [&_svg]:size-3.5",
        lg: "h-12 px-6 py-3 text-base min-h-[48px] sm:min-h-[44px] sm:text-sm [&_svg]:size-5",
        icon: "h-10 w-10 min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px] [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Inject styles on first render
    React.useEffect(() => {
      const styleId = 'button-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = buttonStyles;
        document.head.appendChild(style);
      }
    }, []);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export default Button
