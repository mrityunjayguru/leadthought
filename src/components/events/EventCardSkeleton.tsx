export interface EventCardSkeletonProps {
  className?: string
}

/**
 * EventCardSkeleton - High-fidelity animated loading skeleton matching the exact
 * proportions, grid alignment, and visual rhythm of EventCard.
 */
export function EventCardSkeleton({ className = '' }: EventCardSkeletonProps) {
  return (
    <div
      className={`bg-white rounded-[10px] border border-[#f1ecea] p-4 sm:p-4.5 flex flex-col justify-between space-y-4 animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Top Header: Date Block + Right Column (Actions, Title, Location) */}
      <div className="flex items-start gap-3">
        {/* Date Badge Skeleton */}
        <div className="w-[42px] h-[48px] rounded-[4px] bg-[#ede7e3] shrink-0" />

        {/* Right Column Skeleton */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Action Indicators (Follow & Compare) aligned right */}
          <div className="flex items-center justify-end gap-3 mb-1">
            <div className="w-14 h-3 bg-[#f2ece8] rounded-[3px]" />
            <div className="w-14 h-3 bg-[#f2ece8] rounded-[3px]" />
          </div>

          {/* Title & Location Skeleton */}
          <div className="h-4 bg-[#ede7e3] rounded-[4px] w-4/5" />
          <div className="h-3 bg-[#f2ece8] rounded-[4px] w-2/5" />
        </div>
      </div>

      {/* 3 Key Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#f7f4f1]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#f2ece8] shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-[#ede7e3] rounded w-3/4" />
            <div className="h-2.5 bg-[#f4efe9] rounded w-full" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#f2ece8] shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-[#ede7e3] rounded w-3/4" />
            <div className="h-2.5 bg-[#f4efe9] rounded w-full" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#f2ece8] shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-[#ede7e3] rounded w-3/4" />
            <div className="h-2.5 bg-[#f4efe9] rounded w-full" />
          </div>
        </div>
      </div>

      {/* Pill Tags Row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <div className="h-5 w-24 bg-[#f4efe9] rounded-full" />
        <div className="h-5 w-28 bg-[#f4efe9] rounded-full" />
        <div className="h-5 w-20 bg-[#f4efe9] rounded-full" />
        <div className="h-5 w-7 bg-[#f4efe9] rounded-full" />
      </div>

      {/* CFP Deadline Strip */}
      <div className="h-[28px] w-full bg-[#f8f5f2] rounded-[6px] flex items-center px-3 gap-2">
        <div className="w-3.5 h-3.5 rounded bg-[#ede7e3]" />
        <div className="w-32 h-2.5 rounded bg-[#ede7e3]" />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div className="h-[36px] bg-[#f2ece8] rounded-[6px]" />
        <div className="h-[36px] bg-[#e4ece9] rounded-[6px]" />
      </div>
    </div>
  )
}
