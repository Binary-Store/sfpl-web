import * as React from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  className?: string
  placeholder?: string
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  ({ value, onChange, length = 6, className, placeholder = "0" }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length)
    }, [length])

    const handleChange = (index: number, digit: string) => {
      if (digit.length > 1) return

      const newValue = value.split('')
      newValue[index] = digit
      const newValueString = newValue.join('')
      onChange(newValueString)

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text/plain').slice(0, length)
      if (/^\d+$/.test(pastedData)) {
        onChange(pastedData.padEnd(length, ''))
        // Focus the last filled input or the first empty one
        const focusIndex = Math.min(pastedData.length, length - 1)
        inputRefs.current[focusIndex]?.focus()
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3 justify-center", className)}
        onPaste={handlePaste}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={(e) => e.target.select()}
            className={cn(
              "h-14 w-14 text-center text-2xl font-semibold",
              "border-2 border-gray-200 rounded-2xl transition-all duration-200",
              "focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none",
              "placeholder:text-gray-400 placeholder:text-lg",
              "bg-white hover:border-gray-300"
            )}
            placeholder={placeholder}
          />
        ))}
      </div>
    )
  }
)

OTPInput.displayName = "OTPInput"

export { OTPInput }
