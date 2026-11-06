export interface EventEvaluation {
  tier?: string
  strategicFit?: string
  priority?: 'High' | 'Medium' | 'Low' | '-' | string
  status?: 'Proposed' | 'Evaluating' | 'On Hold' | 'Approved' | '-' | string
  actionType?: 'notes' | 'evaluate' | 'add-notes'
}

export interface EventItem {
  id: string
  month: string
  dates: string
  year: string
  title: string
  location: string
  region?: string
  quarter?: string
  isFollowing?: boolean
  isCompared?: boolean
  attendees: string
  audienceLevel: 'Executive' | 'Senior' | 'Mid-level' | 'Mixed' | string
  industry: string
  tags: string[]
  overflowTagsCount?: number
  cfpDeadline: string
  isInMyEvents?: boolean
  evaluation?: EventEvaluation
}
