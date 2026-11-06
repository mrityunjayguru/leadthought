export interface EventUniverseHeaderProps {
  subtitle?: string
  className?: string
}

/**
 * Reusable header subtitle component with ThoughtLead terracotta color.
 */
export function EventUniverseHeader({
  subtitle = 'Discover, evaluate, and prioritize events that drive impact.',
  className = '',
}: EventUniverseHeaderProps) {
  return (
    <div className={`mb-4 select-none ${className}`}>
      <p className="text-[15px] sm:text-[16px] text-[#b86131] font-normal tracking-[-0.01em]">
        {subtitle}
      </p>
    </div>
  )
}
