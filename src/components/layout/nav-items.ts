import React from 'react'
import {
  DashboardIcon,
  EventUniverseIcon,
  EventIntelligenceIcon,
  MyEventsIcon,
  OperationalReadinessIcon,
  ScorecardIcon,
  NotificationsIcon,
  SettingsIcon,
} from '@/components/icons'

export interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: string
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { id: 'event-universe', label: 'Event Universe', path: '/event-universe', icon: EventUniverseIcon, badge: 'Premium' },
  { id: 'event-intelligence', label: 'Event Intelligence', path: '/event-intelligence', icon: EventIntelligenceIcon, badge: 'Premium' },
  { id: 'my-events', label: 'My Events', path: '/my-events', icon: MyEventsIcon },
  { id: 'operational-readiness', label: 'Operational Readiness', path: '/operational-readiness', icon: OperationalReadinessIcon },
  { id: 'scorecard', label: 'Scorecard', path: '/scorecard', icon: ScorecardIcon },
]

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { id: 'notifications', label: 'Notifications', path: '/notifications', icon: NotificationsIcon },
  { id: 'settings', label: 'Settings', path: '/settings', icon: SettingsIcon },
]

export const ALL_NAV_ITEMS = [...MAIN_NAV_ITEMS, ...SECONDARY_NAV_ITEMS]
