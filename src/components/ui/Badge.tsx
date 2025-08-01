import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-sm",
        outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm sm:px-4 sm:py-1.5 sm:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
export default Badge
