import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"