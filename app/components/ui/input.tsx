import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`px-3 py-2 bg-gray-800 border border-red-500 text-white rounded ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"