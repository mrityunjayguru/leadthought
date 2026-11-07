import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { ALL_NAV_ITEMS, isNavItemActive } from './nav-items'
import { TopBar } from './TopBar'

export interface AppLayoutProps {
  children?: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('thoughtlead_sidebar_collapsed') === 'true'
    }
    return false
  })
  const location = useLocation()

  const currentItem = ALL_NAV_ITEMS.find((item) =>
    isNavItemActive(item.path, location.pathname, location.hash, ALL_NAV_ITEMS)
  )
  const pageTitle = currentItem ? currentItem.label : 'Event Universe'

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileMenuOpen((prev) => !prev)
    } else {
      setIsCollapsed((prev) => {
        const next = !prev
        try {
          localStorage.setItem('thoughtlead_sidebar_collapsed', String(next))
        } catch {
          // ignore
        }
        return next
      })
    }
  }

  return (
    <div
      className="h-screen w-full bg-background flex text-[#1e1e1e] font-sans overflow-hidden"
      style={{ '--sidebar-width': isCollapsed ? '72px' : '270px' } as React.CSSProperties}
    >
      {/* Desktop Persistent Sticky Sidebar */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0 left-0 z-30 transition-[width] duration-300 ease-in-out">
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:hidden transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} isCollapsed={false} />
      </div>

      {/* Right Column: Sticky TopBar + Scrollable Page Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopBar
          className="sticky top-0 z-20 shrink-0 bg-white"
          title={pageTitle}
          isCollapsed={isCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />

        <main className="flex-1 w-full min-w-0 overflow-y-auto scroll-smooth p-5 lg:p-6 bg-background">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
