import { X } from "lucide-react"

export interface FilterPillProps {
  label: string
  onRemove?: () => void
  className?: string
}

/**
 * Reusable active filter pill chip with terracotta theme and remove icon.
 */
export function FilterPill({ label, onRemove, className = '' }: FilterPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#f6efe9] text-[#b75f2f]  transition-colors select-none ${className}`}
    >
      <span className="leading-none">{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove filter ${label}`}
          className="text-[#a83b00] hover:text-[#a83b00] hover:opacity-75 transition-opacity cursor-pointer p-0.5 -mr-1 flex items-center justify-center leading-none"
        >
          <span className="text-[13px] font-bold"><X className="text-[12px]" size={12} /></span>
        </button>
      )}
    </span>
  )
}
