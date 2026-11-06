import React, { useState, useRef, useEffect } from 'react'
import { FilterFieldWrapper } from './FilterFieldWrapper'
import { ChevronDownIcon } from '@/components/icons'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterDropdownProps {
  label?: string
  value: string
  options: (string | FilterOption)[]
  onChange?: (value: string) => void
  icon?: React.ReactNode
  placeholder?: string
  className?: string
  wrapperClassName?: string
}

/**
 * Reusable dropdown filter select with label wrapper, optional leading icon,
 * and click-outside popover menu.
 */
export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  icon,
  placeholder = 'Select',
  className = '',
  wrapperClassName = '',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Normalize options to object format
  const normalizedOptions: FilterOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  const selectedOption = normalizedOptions.find((opt) => opt.value === value)
  const displayLabel = selectedOption ? selectedOption.label : value || placeholder

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const buttonElement = (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-[36px] flex items-center justify-between gap-1.5 px-3 rounded-lg border border-[#e6dfdb] bg-white text-left text-[12.5px] text-[#1e1e1e] transition-all hover:border-[#d5cdc6] focus:outline-none focus:border-[#a83b00] focus:ring-1 focus:ring-[#a83b00]/20 cursor-pointer ${
          isOpen ? 'border-[#a83b00] ring-1 ring-[#a83b00]/20' : ''
        } ${className}`}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {icon && (
            <span className="text-[#8a847f] mr-1 shrink-0 flex items-center justify-center">
              {icon}
            </span>
          )}
          <span className="truncate tracking-[-0.01em]" >{displayLabel}</span>
        </div>

        <ChevronDownIcon
          size={13}
          className={`text-[#8a847f] shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-[#a83b00]' : ''
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full min-w-[150px] bg-white rounded-lg border border-[#e6dfdb] shadow-lg py-1 z-30 max-h-60 overflow-y-auto">
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-[12px] transition-colors cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#fdf2ec] text-[#a83b00] font-semibold'
                    : 'text-[#1e1e1e] hover:bg-[#faf7f4]'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <span className="text-[#a83b00] text-xs font-bold">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )

  if (label) {
    return (
      <FilterFieldWrapper label={label} className={`w-full ${wrapperClassName}`}>
        {buttonElement}
      </FilterFieldWrapper>
    )
  }

  return buttonElement
}
