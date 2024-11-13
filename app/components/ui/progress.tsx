import * as React from "react"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  className?: string
  indicatorClassName?: string
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className, indicatorClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`h-2 w-full bg-gray-700 rounded-full overflow-hidden ${className}`}
        {...props}
      >
          <div
          className={`h-full bg-red-500 transition-all ${indicatorClassName} width-${value}`}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"