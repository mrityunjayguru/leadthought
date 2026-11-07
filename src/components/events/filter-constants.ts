export interface EventFilterState {
  search: string
  date: string
  region: string
  attendance: string
  audienceLevel: string
  topicsAndTags: string
  cfp: string
}

export const DEFAULT_FILTERS: EventFilterState = {
  search: '',
  date: 'Any',
  region: 'Global',
  attendance: 'Any',
  audienceLevel: 'Any',
  topicsAndTags: '',
  cfp: 'Any',
}

export const DATE_OPTIONS = [
  'Any',
  'Next 90 Days',
  'Next 6 Months',
  'Next 12 Months',
  'Custom Range',
]

export const REGION_OPTIONS = [
  'Global',
  'North America',
  'South America',
  'Europe',
  'Asia-Pacific',
  'Central America & Caribbean',
  'Middle East',
  'Africa',
]

export const ATTENDANCE_OPTIONS = [
  'Any',
  'Under 1,000',
  '1,000–2,499',
  '2,500–4,999',
  '5,000–9,999',
  '10,000+',
]

export const AUDIENCE_LEVEL_OPTIONS = [
  'Any',
  'Executive',
  'Senior',
  'Mid-Level',
  'Mixed',
]

export const CFP_OPTIONS = [
  'Any',
  'Open',
  'Closing Within 30 Days',
]
