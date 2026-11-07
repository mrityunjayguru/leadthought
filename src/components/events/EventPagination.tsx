export interface EventPaginationProps {
  /** Current count of visible/loaded items */
  visibleCount: number
  /** Total count of items matching current filter/universe */
  totalCount: number
  /** True when the next page/batch is loading */
  isLoading?: boolean
  /** Callback triggered when user clicks "Load More" */
  onLoadMore: () => void
  /** Error message or boolean flag indicating loading failed */
  error?: string | boolean | null
  /** Callback triggered when user clicks "Retry" */
  onRetry?: () => void
  /** Additional styling */
  className?: string
}

/**
 * EventPagination - Clean, responsive pagination bar for the Event Universe.
 *
 * Supports 4 states:
 * 1. Idle: "Showing X of Y" + Centered "Load More" button
 * 2. Loading: "Showing X of Y" + Centered disabled "Loading..." button with spinner
 * 3. Error: "Showing X of Y" + "We couldn't load more events" + "Retry" button
 * 4. End: "Showing Y of Y" + "You've reached the end of the list"
 */
export function EventPagination({
  visibleCount,
  totalCount,
  isLoading = false,
  onLoadMore,
  error = null,
  onRetry,
  className = '',
}: EventPaginationProps) {
  // If there are no items matching filter, don't show pagination
  if (totalCount === 0) return null

  const isAtEnd = visibleCount >= totalCount && !isLoading
  const displayedCount = Math.min(visibleCount, totalCount)

  const errorMessage =
    typeof error === 'string' && error.trim().length > 0
      ? error
      : "We couldn't load more events"

  return (
    <nav
      aria-label="Event list pagination"
      className={`relative w-full flex flex-col sm:flex-row items-center justify-between gap-4 select-none ${className}`}
    >
      {/* Left: Showing X of Y */}
      <div className="text-[13.5px] sm:text-[14px] text-[#A83B00] font-medium tracking-tight shrink-0">
        Showing {displayedCount} of {totalCount}
      </div>

      {/* Center content: Load More / Loading... / Error + Retry / End of list */}
      <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center justify-center gap-3.5">
        {isLoading ? (
          // Loading state: Disabled button with circular spinner and "Loading..." text
          <button
            type="button"
            disabled
            className="h-[38px] px-6 py-2 bg-[#D1CCC7] text-white text-[13.5px] font-medium rounded-[6px] inline-flex items-center justify-center gap-2 cursor-not-allowed select-none shadow-none border border-transparent transition-all"
            aria-busy="true"
            aria-label="Loading more events"
          >
            <svg
              className="animate-spin h-3.5 w-3.5 text-white shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="28"
                strokeDashoffset="10"
                className="opacity-90"
              />
            </svg>
            <span>Loading...</span>
          </button>
        ) : error ? (
          // Error state: "We couldn't load more events" message + "Retry" button
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[13px] sm:text-[13.5px] text-[#736B66] font-normal">
              {errorMessage}
            </span>
            <button
              type="button"
              onClick={onRetry || onLoadMore}
              className="h-[38px] px-6 py-2 border border-[#A83B00] text-[#A83B00] text-[13.5px] font-normal hover:bg-[#FAF6F3] active:bg-[#F2EAE3] rounded-[6px] transition-colors cursor-pointer select-none"
            >
              Retry
            </button>
          </div>
        ) : isAtEnd ? (
          // End of list state: "You've reached the end of the list"
          <span className="text-[13px] sm:text-[13.5px] text-[#736B66] font-normal select-none">
            You've reached the end of the list
          </span>
        ) : (
          // Default Idle state: Outlined "Load More" button
          <button
            type="button"
            onClick={onLoadMore}
            className="h-[38px] px-7 py-2 border border-[#A83B00] text-[#A83B00] text-[13.5px] font-normal hover:bg-[#FAF6F3] active:bg-[#F2EAE3] rounded-[6px] transition-colors cursor-pointer select-none"
          >
            Load More
          </button>
        )}
      </div>
    </nav>
  )
}
