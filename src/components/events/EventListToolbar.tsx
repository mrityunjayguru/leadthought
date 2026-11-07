import { useState } from 'react'
import { SegmentedTabs } from './SegmentedTabs'
import {
  EventSortDropdown,
  ALL_EVENTS_SORT_OPTIONS,
  FOLLOWING_SORT_OPTIONS,
  type SortOptionItem,
} from './EventSortDropdown'

export interface EventListToolbarProps {
  activeTab?: 'all' | 'following'
  onTabChange?: (tab: 'all' | 'following') => void
  currentCount?: number | string
  totalCount?: number | string
  sortBy?: string
  sortOptions?: SortOptionItem[] | string[]
  onSortChange?: (sort: string) => void
  className?: string
}

/**
 * Reusable Event List Toolbar containing the All Events / Following tabs,
 * event counts label, and sort by dropdown.
 */
export function EventListToolbar({
  activeTab: externalTab,
  onTabChange,
  currentCount = 54,
  totalCount = 54,
  sortBy: externalSort,
  sortOptions,
  onSortChange,
  className = '',
}: EventListToolbarProps) {
  const [internalTab, setInternalTab] = useState<'all' | 'following'>('all')
  const [internalSort, setInternalSort] = useState('Date')

  const currentTab = externalTab ?? internalTab
  const currentSort = externalSort ?? internalSort

  const activeOptions =
    sortOptions ??
    (currentTab === 'following' ? FOLLOWING_SORT_OPTIONS : ALL_EVENTS_SORT_OPTIONS)

  const handleTabChange = (tab: 'all' | 'following') => {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  const handleSortChange = (sort: string) => {
    setInternalSort(sort)
    onSortChange?.(sort)
  }

  return (
    <div
      className={`w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none pt-1 ${className}`}
    >
      {/* Left: Tabs Switcher + Count Display */}
      <div className="flex items-center gap-4 sm:gap-5">
        <SegmentedTabs activeTab={currentTab} onChange={handleTabChange} />

        <span className="text-[18px] font-semibold text-[#A83B00] tracking-[-0.01em]">
          {currentCount} of {totalCount} Events
        </span>
      </div>

      {/* Right: Sort By Dropdown */}
      <EventSortDropdown
        value={currentSort}
        options={activeOptions}
        onChange={handleSortChange}
      />
    </div>
  )
}
