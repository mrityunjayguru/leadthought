import { useState, useMemo, useEffect } from 'react'
import {
  EventUniverseHeader,
  EventFilters,
  EventListToolbar,
  EventDateDivider,
  EventGrid,
  EventCompareBar,
  EventPagination,
  DEFAULT_FILTERS,
  type EventFilterState,
} from '@/components/events'
import { MOCK_EVENTS } from '@/data/mock-events'
import type { EventItem } from '@/types/events'

const MONTH_ORDER: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
}

export function EventUniverse() {
  const PAGE_SIZE = 9
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS)
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all')
  const [filters, setFilters] = useState<EventFilterState>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState('Date')
  const [isLoading, setIsLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Reset pagination when active tab, filters, or sorting changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
    setIsLoadingMore(false)
    setLoadError(null)
  }, [activeTab, filters, sortBy])

  // 1. Filter events based on activeTab and all filter controls
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Tab filter
      if (activeTab === 'following' && !event.isFollowing) {
        return false
      }

      // Search (matches title, location, tags, industry)
      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim()
        const matchTitle = event.title.toLowerCase().includes(q)
        const matchLocation = event.location.toLowerCase().includes(q)
        const matchIndustry = event.industry.toLowerCase().includes(q)
        const matchTags = event.tags.some((t) => t.toLowerCase().includes(q))
        if (!matchTitle && !matchLocation && !matchIndustry && !matchTags) {
          return false
        }
      }

      // Topics & tags
      if (filters.topicsAndTags && filters.topicsAndTags.trim()) {
        const q = filters.topicsAndTags.toLowerCase().trim()
        const matchTags = event.tags.some((t) => t.toLowerCase().includes(q))
        const matchIndustry = event.industry.toLowerCase().includes(q)
        if (!matchTags && !matchIndustry) {
          return false
        }
      }

      // Region
      if (filters.region && filters.region !== 'Any' && filters.region !== 'Global') {
        const eventRegion = event.region || 'North America'
        if (eventRegion.toLowerCase() !== filters.region.toLowerCase()) {
          return false
        }
      }

      // Date / Quarter filter
      if (filters.date && filters.date !== 'Any') {
        if (
          filters.date === 'Next 12 Months' ||
          filters.date === 'Next 6 Months' ||
          filters.date === 'Next 90 Days' ||
          filters.date === 'Custom Range'
        ) {
          // In our timeline, all 2027 events are within the upcoming window
        }
      }

      // Attendance range filter
      if (filters.attendance && filters.attendance !== 'Any') {
        const count = parseInt(event.attendees.replace(/[^0-9]/g, ''), 10) || 0
        if (filters.attendance === 'Under 1,000' && count >= 1000) return false
        if (
          (filters.attendance === '1,000–2,499' || filters.attendance === '1,000-2,499') &&
          (count < 1000 || count > 2499)
        )
          return false
        if (
          (filters.attendance === '2,500–4,999' || filters.attendance === '2,500-4,999') &&
          (count < 2500 || count > 4999)
        )
          return false
        if (
          (filters.attendance === '5,000–9,999' || filters.attendance === '5,000-9,999') &&
          (count < 5000 || count > 9999)
        )
          return false
        if (filters.attendance === '10,000+' && count < 10000) return false
      }

      // Audience level filter
      if (filters.audienceLevel && filters.audienceLevel !== 'Any') {
        const level = event.audienceLevel.toLowerCase()
        if (filters.audienceLevel === 'Executive' && !level.includes('exec')) return false
        if (filters.audienceLevel === 'Senior' && !level.includes('senior')) return false
        if (filters.audienceLevel === 'Mid-Level' && !level.includes('mid')) return false
        if (filters.audienceLevel === 'Mixed' && !level.includes('mixed')) return false
      }

      // CFP filter
      if (filters.cfp && filters.cfp !== 'Any') {
        const deadline = event.cfpDeadline.toLowerCase()
        if (filters.cfp === 'Open' && deadline === 'unknown') return false
        if (
          filters.cfp === 'Closing Within 30 Days' &&
          !deadline.includes('oct') &&
          !deadline.includes('nov') &&
          !deadline.includes('closing')
        )
          return false
      }

      return true
    })
  }, [events, activeTab, filters])

  // 2. Sort filtered events
  const sortedEvents = useMemo(() => {
    const list = [...filteredEvents]
    if (sortBy === 'Alphabetical (A-Z)' || sortBy === 'Event name') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'Audience size' || sortBy === 'Attendance (High to Low)') {
      list.sort((a, b) => {
        const countA = parseInt(a.attendees.replace(/[^0-9]/g, ''), 10) || 0
        const countB = parseInt(b.attendees.replace(/[^0-9]/g, ''), 10) || 0
        return countB - countA
      })
    } else if (sortBy === 'Strategic Fit') {
      list.sort((a, b) => {
        const fitA = parseInt(a.evaluation?.strategicFit?.replace(/[^0-9]/g, '') || '0', 10)
        const fitB = parseInt(b.evaluation?.strategicFit?.replace(/[^0-9]/g, '') || '0', 10)
        return fitB - fitA
      })
    } else if (sortBy === 'Priority') {
      const PRIORITY_ORDER: Record<string, number> = {
        High: 3,
        Medium: 2,
        Low: 1,
      }
      list.sort((a, b) => {
        const pA = PRIORITY_ORDER[a.evaluation?.priority || ''] || 0
        const pB = PRIORITY_ORDER[b.evaluation?.priority || ''] || 0
        return pB - pA
      })
    } else {
      // Default: 'Date' (Soonest first)
      list.sort((a, b) => {
        const yearDiff = parseInt(a.year, 10) - parseInt(b.year, 10)
        if (yearDiff !== 0) return yearDiff
        const mA = MONTH_ORDER[a.month] || 99
        const mB = MONTH_ORDER[b.month] || 99
        if (mA !== mB) return mA - mB
        const dateA = parseInt(a.dates.split('-')[0], 10) || 0
        const dateB = parseInt(b.dates.split('-')[0], 10) || 0
        return dateA - dateB
      })
    }
    return list
  }, [filteredEvents, sortBy])

  // 3. Slice to first 9 events, then append 9 more on each Load More (no duplicated data)
  const visibleEvents = useMemo(() => {
    return sortedEvents.slice(0, visibleCount)
  }, [sortedEvents, visibleCount])

  // 4. Chronologically group displayed events by Month & Year (e.g. "Jan 2027", "Feb 2027")
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: EventItem[] } = {}
    visibleEvents.forEach((event) => {
      const key = `${event.month} ${event.year}`
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(event)
    })
    return groups
  }, [visibleEvents])

  const handleLoadMore = () => {
    if (isLoadingMore || visibleCount >= sortedEvents.length) return
    setIsLoadingMore(true)
    setLoadError(null)

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedEvents.length))
      setIsLoadingMore(false)
    }, 750)
  }

  const handleTabChange = (tab: 'all' | 'following') => {
    setActiveTab(tab)
    if (tab === 'following') {
      setSortBy('Priority')
    } else {
      setSortBy('Date')
    }
    setVisibleCount(PAGE_SIZE)
    setIsLoadingMore(false)
    setLoadError(null)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const handleFollowToggle = (id: string, isFollowing: boolean) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isFollowing } : e))
    )
  }

  const handleCompareToggle = (id: string, isCompared: boolean) => {
    if (isCompared) {
      const currentCount = events.filter((e) => e.isCompared).length
      if (currentCount >= 3) {
        return
      }
    }
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isCompared } : e))
    )
  }

  const handleRemoveFromComparison = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isCompared: false } : e))
    )
  }

  const handleClearComparison = () => {
    setEvents((prev) =>
      prev.map((e) => (e.isCompared ? { ...e, isCompared: false } : e))
    )
  }

  const comparedEvents = useMemo(() => {
    return events.filter((e) => e.isCompared)
  }, [events])

  const handleMyEventsToggle = (id: string, isInMyEvents: boolean) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isInMyEvents } : e))
    )
  }

  return (
    <div className={`w-full space-y-4 ${comparedEvents.length > 0 ? 'pb-24' : 'pb-0'}`}>
      {/* Subtitle Header */}
      <EventUniverseHeader />

      {/* Filter Bar with Search, Dropdowns & Active Pills */}
      <EventFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Toolbar with Tabs, Counter & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <EventListToolbar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentCount={sortedEvents.length}
          totalCount={events.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          className="flex-1"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <EventDateDivider dateLabel="Jan 2027" count={sortedEvents.length} />
          <EventGrid isLoading={true} skeletonCount={6} />
        </div>
      ) : Object.keys(groupedEvents).length === 0 ? (
        <div className="w-full bg-white rounded-[10px] border border-[#f1ecea] p-12 text-center select-none space-y-3">
          <p className="text-[15px] font-semibold text-[#1e1e1e]">No events found</p>
          <p className="text-[13px] text-[#736b66] max-w-md mx-auto">
            No events match your current search and filter criteria. Try searching for a different keyword or resetting your filters.
          </p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12.5px] font-medium text-[#A83B00] border border-[#A83B00]/40 rounded-lg hover:bg-[#FAF6F3] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([dateLabel, groupEvents]) => (
            <div key={dateLabel} className="space-y-3.5">
              <EventDateDivider
                dateLabel={dateLabel}
                count={groupEvents.length}
              />
              <EventGrid
                events={groupEvents}
                showEvaluation={activeTab === 'following'}
                isCompareLimitReached={comparedEvents.length >= 3}
                onFollowToggle={handleFollowToggle}
                onCompareToggle={handleCompareToggle}
                onMyEventsToggle={handleMyEventsToggle}
              />
            </div>
          ))}

          {/* Loading more skeleton cards matching image 3 */}
          {isLoadingMore && (
            <div className="w-full pt-1" aria-busy="true" aria-label="Loading more events">
              <EventGrid isLoading={true} skeletonCount={3} />
            </div>
          )}

          {/* Pagination bar with Load More, Loading..., Error/Retry, or End of list states */}
          <EventPagination
            visibleCount={visibleCount}
            totalCount={sortedEvents.length}
            isLoading={isLoadingMore}
            onLoadMore={handleLoadMore}
            error={loadError}
            onRetry={handleLoadMore}
          />
        </div>
      )}

      {/* Floating Comparison Tray */}
      {comparedEvents.length > 0 && (
        <EventCompareBar
          comparedEvents={comparedEvents}
          onRemoveEvent={handleRemoveFromComparison}
          onClearAll={handleClearComparison}
        />
      )}
    </div>
  )
}
