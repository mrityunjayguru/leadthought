import { useState } from 'react'
import { FilterInput } from './FilterInput'
import { FilterDropdown } from './FilterDropdown'
import { FilterPill } from './FilterPill'
import {
  type EventFilterState,
  DEFAULT_FILTERS,
  DATE_OPTIONS,
  REGION_OPTIONS,
  ATTENDANCE_OPTIONS,
  AUDIENCE_LEVEL_OPTIONS,
  CFP_OPTIONS,
} from './filter-constants'
import { EventUniverseIcon } from '../icons'

export interface EventFiltersProps {
  initialFilters?: Partial<EventFilterState>
  filters?: EventFilterState
  onFilterChange?: (filters: EventFilterState) => void
  className?: string
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

/**
 * EventFilters - Full-width modular filter toolbar matching the design screenshot.
 */
export function EventFilters({
  initialFilters = {},
  filters: controlledFilters,
  onFilterChange,
  className = '',
}: EventFiltersProps) {
  const [internalFilters, setInternalFilters] = useState<EventFilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })

  const currentFilters = controlledFilters ?? internalFilters

  const updateField = (field: keyof EventFilterState, value: string) => {
    const updated = { ...currentFilters, [field]: value }
    setInternalFilters(updated)
    onFilterChange?.(updated)
  }

  const clearAllFilters = () => {
    const cleared: EventFilterState = {
      search: '',
      date: 'Any',
      region: 'Global',
      attendance: 'Any',
      audienceLevel: 'Any',
      topicsAndTags: '',
      cfp: 'Any',
    }
    setInternalFilters(cleared)
    onFilterChange?.(cleared)
  }

  const removePill = (field: keyof EventFilterState) => {
    if (field === 'search' || field === 'topicsAndTags') {
      updateField(field, '')
    } else if (field === 'region') {
      updateField(field, 'Global')
    } else {
      updateField(field, 'Any')
    }
  }

  // Reactive active pills list computed from current filters
  const activePills: { field: keyof EventFilterState; label: string }[] = []
  if (currentFilters.region && currentFilters.region !== 'Any' && currentFilters.region !== 'Global') {
    activePills.push({ field: 'region', label: `Region: ${currentFilters.region}` })
  }
  if (currentFilters.date && currentFilters.date !== 'Any') {
    activePills.push({ field: 'date', label: `Date: ${currentFilters.date}` })
  }
  if (currentFilters.attendance && currentFilters.attendance !== 'Any') {
    activePills.push({ field: 'attendance', label: `Attendance: ${currentFilters.attendance}` })
  }
  if (currentFilters.audienceLevel && currentFilters.audienceLevel !== 'Any') {
    activePills.push({ field: 'audienceLevel', label: `Audience: ${currentFilters.audienceLevel}` })
  }
  if (currentFilters.cfp && currentFilters.cfp !== 'Any') {
    activePills.push({ field: 'cfp', label: `CFP: ${currentFilters.cfp}` })
  }
  if (currentFilters.topicsAndTags && currentFilters.topicsAndTags.trim()) {
    activePills.push({ field: 'topicsAndTags', label: `Tag: ${currentFilters.topicsAndTags}` })
  }
  if (currentFilters.search && currentFilters.search.trim()) {
    activePills.push({ field: 'search', label: `Search: "${currentFilters.search}"` })
  }

  return (
    <div
      className={`w-full bg-white rounded-[10px] border border-[#f1ecea] p-3 sm:p-4  select-none space-y-3.5 ${className}`}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_0.85fr_0.85fr_1.1fr_0.8fr] xl:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] 2xl:grid-cols-[1.5fr_1fr_1fr_0.85fr_0.85fr_1.1fr_0.8fr] gap-2.5 sm:gap-3 items-end">

        <FilterInput
          label="Search"
          placeholder="Search events, cities, topics"
          value={currentFilters.search}
          onChange={(val) => updateField('search', val)}
          icon={<SearchIcon />}
          className="w-full"
        />

        <FilterDropdown
          label="Date"
          value={currentFilters.date}
          options={DATE_OPTIONS}
          onChange={(val) => updateField('date', val)}
          icon={<EventUniverseIcon size={14} />}
          className="w-full"
        />

        <FilterDropdown
          label="Region"
          value={currentFilters.region}
          options={REGION_OPTIONS}
          onChange={(val) => updateField('region', val)}
          className="w-full"
        />

        <FilterDropdown
          label="Attendance"
          value={currentFilters.attendance}
          options={ATTENDANCE_OPTIONS}
          onChange={(val) => updateField('attendance', val)}
          className="w-full"
        />

        <FilterDropdown
          label="Audience level"
          value={currentFilters.audienceLevel}
          options={AUDIENCE_LEVEL_OPTIONS}
          onChange={(val) => updateField('audienceLevel', val)}
          className="w-full"
        />

        <FilterInput
          label="Topics & tags"
          placeholder="Search topic or tag"
          value={currentFilters.topicsAndTags}
          onChange={(val) => updateField('topicsAndTags', val)}
          className="w-full"
        />

        <FilterDropdown
          label="CFP"
          value={currentFilters.cfp}
          options={CFP_OPTIONS}
          onChange={(val) => updateField('cfp', val)}
          className="w-full"
        />

        {/* Active pills positioned in the grid for XL, outside for others */}
        {activePills.length > 0 && (
          <div className="hidden xl:flex 2xl:hidden flex-wrap items-center gap-2 xl:col-span-3 pb-2.5">
            {activePills.map((pill) => (
              <FilterPill
                key={pill.field}
                label={pill.label}
                onRemove={() => removePill(pill.field)}
              />
            ))}

            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-normal bg-[#f6efe9] text-[#2d2b29] hover:text-[#A83B00] transition-colors ml-1.5 cursor-pointer leading-none"
            >
              <span>Clear Filters</span>
              <span className="text-[12px] font-bold">✕</span>
            </button>
          </div>
        )}
      </div>

      {activePills.length > 0 && (
        <div className="flex xl:hidden 2xl:flex flex-wrap items-center gap-2 pt-2">
          {activePills.map((pill) => (
            <FilterPill
              key={pill.field}
              label={pill.label}
              onRemove={() => removePill(pill.field)}
            />
          ))}

          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-normal text-[#2d2b29] hover:text-[#A83B00] transition-colors ml-1.5 cursor-pointer leading-none"
          >
            <span>Clear Filters</span>
            <span className="text-[12px] font-bold">✕</span>
          </button>
        </div>
      )}
    </div>
  )
}
