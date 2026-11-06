import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { EventUniverse } from '@/pages/EventUniverse'
import { EventIntelligence } from '@/pages/EventIntelligence'
import { MyEvents } from '@/pages/MyEvents'
import { OperationalReadiness } from '@/pages/OperationalReadiness'
import { Scorecard } from '@/pages/Scorecard'
import { Notifications } from '@/pages/Notifications'
import { Settings } from '@/pages/Settings'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Default Route redirects to Event Universe */}
          <Route path="/" element={<Navigate to="/event-universe" replace />} />

          {/* Main Navigation Pages */}
          <Route path="/event-universe" element={<EventUniverse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event-intelligence" element={<EventIntelligence />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/operational-readiness" element={<OperationalReadiness />} />
          <Route path="/scorecard" element={<Scorecard />} />

          {/* Secondary Pages */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
