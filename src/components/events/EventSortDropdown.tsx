import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@/components/icons'

export interface EventSortDropdownProps {
  value?: string
  options?: string[]
  onChange?: (sort: string) => void
  label?: string
  className?: string
}

const DEFAULT_SORT_OPTIONS = [
  'Date',
  'Attendance (High to Low)',
  'Relevance',
  'Alphabetical (A-Z)',
]

/**
 * Reusable sort by dropdown component matching the design screenshot.
 */
export function EventSortDropdown({
  value = 'Date',
  options = DEFAULT_SORT_OPTIONS,
  onChange,
  label = 'Sort by',
  className = '',
}: EventSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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

  return (
    <div ref={ref} className={`relative inline-flex items-center gap-2 select-none ${className}`}>
      {label && <span className="text-[12px] text-[#7d7f80] font-normal">{label}</span>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-[34px] flex items-center justify-between gap-2 px-3 rounded-lg border border-white bg-white hover:border-white text-[12.5px] font-medium text-[#1e1e1e] transition-all cursor-pointer focus:outline-none focus:border-[#a83b00] ${
            isOpen ? 'border-[#a83b00] ring-1 ring-[#a83b00]/20' : ''
          }`}
        >
          <span>{value}</span>
          <ChevronDownIcon
            size={13}
            className={`text-[#7d7f80] transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-[#a83b00]' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] right-0 min-w-[220px] bg-white rounded-lg border border-white py-1 z-30">
            {options.map((opt) => {
              const isSelected = opt === value
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange?.(opt)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[12px] transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#fdf2ec] text-[#a83b00] font-semibold'
                      : 'text-[#1e1e1e] hover:bg-[#faf7f4]'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <span className="text-[#a83b00] text-xs font-bold">✓</span>}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
