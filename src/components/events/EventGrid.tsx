import type { EventItem } from '@/types/events'
import { EventCard } from './EventCard'
import { EventCardSkeleton } from './EventCardSkeleton'

export interface EventGridProps {
  events?: EventItem[]
  isLoading?: boolean
  skeletonCount?: number
  showEvaluation?: boolean
  isCompareLimitReached?: boolean
  onFollowToggle?: (eventId: string, isFollowing: boolean) => void
  onCompareToggle?: (eventId: string, isCompared: boolean) => void
  onMyEventsToggle?: (eventId: string, isInMyEvents: boolean) => void
  onViewDetails?: (eventId: string) => void
  className?: string
}

/**
 * EventGrid - Displays a responsive 3-column grid of event cards
 * with integrated skeleton loading state.
 */
export function EventGrid({
  events = [],
  isLoading = false,
  skeletonCount = 6,
  showEvaluation = false,
  isCompareLimitReached = false,
  onFollowToggle,
  onCompareToggle,
  onMyEventsToggle,
  onViewDetails,
  className = '',
}: EventGridProps) {
  if (isLoading) {
    return (
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3.5 sm:gap-4.5 ${className}`}
        aria-busy="true"
        aria-label="Loading events"
      >
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <EventCardSkeleton key={`skeleton-${idx}`} />
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="w-full bg-white rounded-[10px] border border-[#f1ecea] p-12 text-center select-none">
        <p className="text-[14px] text-[#7D7D7D]">No events found for this filter criteria.</p>
      </div>
    )
  }

  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3.5 sm:gap-4.5 ${className}`}
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          showEvaluation={showEvaluation}
          isCompareLimitReached={isCompareLimitReached}
          onFollowToggle={onFollowToggle}
          onCompareToggle={onCompareToggle}
          onMyEventsToggle={onMyEventsToggle}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}
