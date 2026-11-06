export interface EventDateDividerProps {
  dateLabel?: string
  count?: number
  countLabel?: string
  className?: string
}
export function EventDateDivider({
  dateLabel = 'Jan 2027',
  count = 6,
  countLabel,
  className = '',
}: EventDateDividerProps) {
  const displayCountLabel =
    countLabel ?? `${count} ${count === 1 ? 'Event' : 'Events'}`

  return (
    <div
      className={`w-full flex items-center gap-2.5 sm:gap-3 select-none pt-1 pb-1 ${className}`}
      role="separator"
      aria-label={`${dateLabel}, ${displayCountLabel}`}
    >
      <span className="text-[16px] sm:text-[18px] font-normal text-[#2D2A28] tracking-[-0.01em] shrink-0">
        {dateLabel}
      </span>
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[13px] font-medium text-[#A83B00] border border-[#A83B00] bg-[white] rounded-sm leading-tight shrink-0">
        {displayCountLabel}
      </span>
      <div className="flex-1 h-px bg-[#A83B00]" />
    </div>
  )
}
