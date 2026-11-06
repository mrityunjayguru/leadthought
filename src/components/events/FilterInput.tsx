import React from 'react'
import { FilterFieldWrapper } from './FilterFieldWrapper'
import { X } from 'lucide-react'

export interface FilterInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  value?: string
  onChange?: (value: string) => void
  icon?: React.ReactNode
  wrapperClassName?: string
}

/**
 * Reusable filter text input with optional leading icon, quick clear button, and label wrapper.
 */
export function FilterInput({
  label,
  value = '',
  onChange,
  icon,
  placeholder,
  className = '',
  wrapperClassName = '',
  ...props
}: FilterInputProps) {
  const inputElement = (
    <div className="relative flex items-center w-full">
      {icon && (
        <span className="absolute left-2.5 text-[#8a847f] pointer-events-none flex items-center justify-center shrink-0">
          {icon}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-[36px] rounded-lg border border-[#e6dfdb] bg-white text-[12.5px] text-[#1e1e1e] placeholder:text-[#8a847f] transition-all focus:outline-none focus:border-[#a83b00] focus:ring-1 focus:ring-[#a83b00]/20 ${
          icon ? 'pl-8' : 'pl-3'
        } ${value ? 'pr-7' : 'pr-3'} ${className}`}
        {...props}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange?.('')}
          className="absolute right-2.5 text-[#8a847f] hover:text-[#a83b00] text-[11px] font-bold cursor-pointer transition-colors p-0.5 leading-none"
          aria-label="Clear search input"
        >
          <X className="text-[12px]" size={12} />
        </button>
      ) : null}
    </div>
  )

  if (label) {
    return (
      <FilterFieldWrapper label={label} className={`w-full ${wrapperClassName}`}>
        {inputElement}
      </FilterFieldWrapper>
    )
  }

  return inputElement
}
