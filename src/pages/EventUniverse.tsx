import { useState, useMemo } from 'react'
import {
  EventUniverseHeader,
  EventFilters,
  EventListToolbar,
  EventDateDivider,
  EventGrid,
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
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS)
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all')
  const [filters, setFilters] = useState<EventFilterState>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState('Date')
  const [isLoading, setIsLoading] = useState(false)

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
      if (filters.region && filters.region !== 'Any') {
        const eventRegion = event.region || 'North America'
        if (eventRegion.toLowerCase() !== filters.region.toLowerCase()) {
          return false
        }
      }

      // Date / Quarter filter
      if (filters.date && filters.date !== 'Any') {
        const eventQuarter =
          event.quarter ||
          (event.month === 'Jan' || event.month === 'Feb' || event.month === 'Mar'
            ? 'Q1 2027'
            : 'Q2 2027')
        if (
          filters.date === 'Next 12 Months' ||
          filters.date === 'Next 6 Months' ||
          filters.date === 'Next 3 Months'
        ) {
          // In our timeline, all 2027 events are within the upcoming window
        } else if (filters.date.startsWith('Q')) {
          if (eventQuarter !== filters.date) {
            return false
          }
        }
      }

      // Attendance range filter
      if (filters.attendance && filters.attendance !== 'Any') {
        const count = parseInt(event.attendees.replace(/[^0-9]/g, ''), 10) || 0
        if (filters.attendance === '1,000 - 3,000' && (count < 1000 || count > 3000)) return false
        if (filters.attendance === '3,000 - 5,000' && (count < 3000 || count > 5000)) return false
        if (filters.attendance === '5,000 - 10,000' && (count < 5000 || count > 10000)) return false
        if (filters.attendance === '10,000+' && count < 10000) return false
      }

      // Audience level filter
      if (filters.audienceLevel && filters.audienceLevel !== 'Any') {
        const level = event.audienceLevel.toLowerCase()
        if (filters.audienceLevel === 'C-Suite / Executive' && !level.includes('exec')) return false
        if (filters.audienceLevel === 'Senior Leadership' && !level.includes('senior')) return false
        if (
          filters.audienceLevel === 'Director / Manager' &&
          !level.includes('director') &&
          !level.includes('manager')
        )
          return false
        if (filters.audienceLevel === 'Mid-level' && !level.includes('mid')) return false
        if (filters.audienceLevel === 'Mixed' && !level.includes('mixed')) return false
      }

      // CFP filter
      if (filters.cfp && filters.cfp !== 'Any') {
        const deadline = event.cfpDeadline.toLowerCase()
        if (filters.cfp === 'Open Now' && deadline === 'unknown') return false
        if (filters.cfp === 'Unknown' && deadline !== 'unknown') return false
        if (filters.cfp === 'Closing Soon' && !deadline.includes('oct') && !deadline.includes('nov'))
          return false
      }

      return true
    })
  }, [events, activeTab, filters])

  // 2. Sort filtered events
  const sortedEvents = useMemo(() => {
    const list = [...filteredEvents]
    if (sortBy === 'Alphabetical (A-Z)') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'Attendance (High to Low)') {
      list.sort((a, b) => {
        const countA = parseInt(a.attendees.replace(/[^0-9]/g, ''), 10) || 0
        const countB = parseInt(b.attendees.replace(/[^0-9]/g, ''), 10) || 0
        return countB - countA
      })
    } else if (sortBy === 'Date') {
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

  // 3. Chronologically group displayed events by Month & Year (e.g. "Jan 2027", "Feb 2027")
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: EventItem[] } = {}
    sortedEvents.forEach((event) => {
      const key = `${event.month} ${event.year}`
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(event)
    })
    return groups
  }, [sortedEvents])

  const handleTabChange = (tab: 'all' | 'following') => {
    setActiveTab(tab)
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
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isCompared } : e))
    )
  }

  const handleMyEventsToggle = (id: string, isInMyEvents: boolean) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isInMyEvents } : e))
    )
  }

  return (
    <div className="w-full space-y-4 pb-12">
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
          totalCount="1,046"
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
                onFollowToggle={handleFollowToggle}
                onCompareToggle={handleCompareToggle}
                onMyEventsToggle={handleMyEventsToggle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
