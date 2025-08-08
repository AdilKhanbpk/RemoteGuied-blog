import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100",
        secondary:
          "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
        destructive:
          "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
        outline: "text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-gray-700",
        success:
          "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
        warning:
          "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
      },
      size: {
        default: "px-2 py-1 text-xs",
        sm: "px-1.5 py-0.5 text-xs",
        lg: "px-3 py-1.5 text-sm",
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