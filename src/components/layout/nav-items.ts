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

/**
 * Accurately determines if a navigation item is active across:
 * - root path ("/" or "")
 * - direct path ("/event-universe")
 * - trailing slash ("/event-universe/")
 * - subpaths / base URLs on live deployments (e.g. "/leadthought/event-universe" or "/leadthought/")
 * - hash routing ("#/event-universe")
 * - static index.html ("/index.html")
 */
export function isNavItemActive(
  itemPath: string,
  pathname: string,
  hash: string = '',
  allItems: NavItem[] = ALL_NAV_ITEMS
): boolean {
  // 1. Check hash route first (e.g. #/event-universe)
  if (hash && hash.startsWith('#/')) {
    const hashRoute = hash.slice(1).split('?')[0].replace(/\/+$/, '')
    if (hashRoute === itemPath || hashRoute.endsWith(itemPath)) {
      return true
    }
  }

  // 2. Normalize pathname: remove index.html, trailing slash, query strings
  const cleanPath = (pathname || '')
    .split('?')[0]
    .replace(/\/index\.html$/i, '')
    .replace(/\/+$/, '') || '/'

  // 3. Root path ("/" or empty) defaults to /event-universe
  if (cleanPath === '/' || cleanPath === '') {
    return itemPath === '/event-universe'
  }

  // 4. Exact match
  if (cleanPath === itemPath) {
    return true
  }

  // 5. Ends with itemPath (e.g. /leadthought/event-universe ends with /event-universe)
  if (cleanPath.endsWith(itemPath)) {
    return true
  }

  // 6. Subroute match (e.g. /event-universe/details or /leadthought/event-universe/details)
  if (cleanPath.includes(itemPath + '/')) {
    return true
  }

  // 7. Base subpath without route (e.g. "/leadthought" or "/leadthought/") where default is /event-universe
  const isAnyOtherMatched = allItems.some(
    (other) =>
      other.path !== '/event-universe' &&
      (cleanPath === other.path ||
        cleanPath.endsWith(other.path) ||
        cleanPath.includes(other.path + '/'))
  )

  if (!isAnyOtherMatched && itemPath === '/event-universe') {
    return true
  }

  return false
}
