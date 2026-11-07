import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@/components/icons'

export interface SortOptionItem {
  id: string
  label: string
  detail: string
}

export const ALL_EVENTS_SORT_OPTIONS: SortOptionItem[] = [
  { id: 'Date', label: 'Date', detail: '(Soonest first)' },
  { id: 'Audience size', label: 'Audience size', detail: '(Largest first)' },
  { id: 'Event name', label: 'Event name', detail: '(A–Z)' },
]

export const FOLLOWING_SORT_OPTIONS: SortOptionItem[] = [
  { id: 'Date', label: 'Date', detail: '(Soonest first)' },
  { id: 'Audience size', label: 'Audience size', detail: '(Largest first)' },
  { id: 'Event name', label: 'Event name', detail: '(A–Z)' },
  { id: 'Strategic Fit', label: 'Strategic Fit', detail: '(Highest first)' },
  { id: 'Priority', label: 'Priority', detail: '(High, Medium, Low)' },
]

export interface EventSortDropdownProps {
  value?: string
  options?: SortOptionItem[] | string[]
  onChange?: (sort: string) => void
  label?: string
  className?: string
}

/**
 * EventSortDropdown - Reusable sort dropdown matching the screenshots:
 * - "Date (Soonest first)", "Audience size (Largest first)", "Event name (A–Z)"
 * - In Following: adds "Strategic Fit (Highest first)", "Priority (High, Medium, Low)"
 * - Selected item has bold title
 */
export function EventSortDropdown({
  value = 'Date',
  options = ALL_EVENTS_SORT_OPTIONS,
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

  // Normalize options to SortOptionItem[]
  const normalizedOptions: SortOptionItem[] = options.map((opt) => {
    if (typeof opt === 'string') {
      if (opt.includes('(')) {
        const match = opt.match(/^(.*?)\s*(\(.*?\))$/)
        if (match) {
          return { id: match[1].trim(), label: match[1].trim(), detail: match[2].trim() }
        }
      }
      return { id: opt, label: opt, detail: '' }
    }
    return opt
  })

  const selectedItem = normalizedOptions.find(
    (opt) => opt.id === value || opt.label === value || `${opt.label} ${opt.detail}`.trim() === value
  )
  const buttonLabel = selectedItem ? selectedItem.label : value

  return (
    <div ref={ref} className={`relative inline-flex items-center gap-2 select-none ${className}`}>
      {label && <span className="text-[13px] text-[#7d7f80] font-normal">{label}</span>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-[34px] flex items-center justify-between gap-2.5 px-3 rounded-lg border border-[#E5E0DB] bg-white hover:border-[#D1CCC7] text-[13px] font-normal text-[#1e1e1e] transition-all cursor-pointer focus:outline-none ${
            isOpen ? 'border-[#a83b00] ring-1 ring-[#a83b00]/20' : ''
          }`}
        >
          <span>{buttonLabel}</span>
          <ChevronDownIcon
            size={13}
            className={`text-[#7d7f80] transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-[#a83b00]' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] right-0 min-w-[245px] bg-white rounded-lg border border-[#e8e4e0] shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-1.5 px-1 z-30">
            {normalizedOptions.map((opt) => {
              const isSelected =
                opt.id === value ||
                opt.label === value ||
                `${opt.label} ${opt.detail}`.trim() === value

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onChange?.(opt.id)
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-3 py-1.5 text-[12.5px] leading-snug hover:bg-[#FAF7F4] transition-colors cursor-pointer flex items-center justify-start rounded-[4px]"
                >
                  <span className={isSelected ? 'font-bold text-[#1e1e1e]' : 'font-normal text-[#1e1e1e]'}>
                    {opt.label}
                  </span>
                  {opt.detail && (
                    <span className="font-normal text-[#736B66] ml-1">
                      {opt.detail}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
