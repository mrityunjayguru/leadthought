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
  date: 'Next 12 Months',
  region: 'North America',
  attendance: 'Any',
  audienceLevel: 'Any',
  topicsAndTags: '',
  cfp: 'Any',
}

export const DATE_OPTIONS = [
  'Next 12 Months',
  'Next 3 Months',
  'Next 6 Months',
  'Q1 2027',
  'Q2 2027',
  'Q3 2027',
  'Q4 2027',
  'Any',
]

export const REGION_OPTIONS = [
  'North America',
  'Latin America',
  'Europe',
  'Asia Pacific',
  'Middle East & Africa',
  'Global / Virtual',
  'Any',
]

export const ATTENDANCE_OPTIONS = [
  'Any',
  '1,000 - 3,000',
  '3,000 - 5,000',
  '5,000 - 10,000',
  '10,000+',
]

export const AUDIENCE_LEVEL_OPTIONS = [
  'Any',
  'C-Suite / Executive',
  'Senior Leadership',
  'Director / Manager',
  'Mid-level',
  'Mixed',
]

export const CFP_OPTIONS = [
  'Any',
  'Open Now',
  'Closing Soon',
  'Upcoming',
  'Unknown',
]
