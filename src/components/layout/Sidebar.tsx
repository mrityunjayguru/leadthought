import { Link, useLocation } from 'react-router-dom'
import { ThoughtLeadLogo, ThoughtLeadLogoCollapsed } from '@/components/icons'
import { GlassTooltip } from '@/components/ui/glass-tooltip'
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from './nav-items'

export interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onCloseMobile?: () => void
}

export function Sidebar({ className = '', isCollapsed = false, onCloseMobile }: SidebarProps) {
  const location = useLocation()
  const currentPath = location.pathname === '/' ? '/event-universe' : location.pathname

  return (
    <aside
      className={`shrink-0 h-screen bg-white border-r border-[#f1ecea] flex flex-col justify-between select-none transition-[width] duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${
        isCollapsed ? 'w-[72px]' : 'w-[270px]'
      } ${className}`}
    >
      {/* Top Section: Logo & Main Navigation */}
      <div className="flex flex-col">
        {/* Logo Header - Height matched with TopBar (70px) */}
        <div
          className={`h-[70px] flex items-center transition-all duration-300 ${
            isCollapsed ? 'justify-center px-2' : 'px-6'
          }`}
        >
          {isCollapsed ? (
            <GlassTooltip
              content="ThoughtLead Home"
              side="right"
              sideOffset={14}
              enabled={isCollapsed}
            >
              <Link
                to="/event-universe"
                onClick={onCloseMobile}
                className="inline-flex items-center justify-center p-2 rounded-xl hover:bg-[#faf7f4] transition-colors group"
                aria-label="ThoughtLead Home"
              >
                <ThoughtLeadLogoCollapsed className="h-[18px] w-auto transition-transform duration-200 group-hover:scale-105" />
              </Link>
            </GlassTooltip>
          ) : (
            <Link
              to="/event-universe"
              onClick={onCloseMobile}
              className="inline-block"
              aria-label="ThoughtLead Home"
            >
              <ThoughtLeadLogo className="h-[45px] w-auto" />
            </Link>
          )}
        </div>

        {/* Main Nav Items */}
        <nav
          className={`mt-1 transition-all duration-300 ${
            isCollapsed ? 'px-2.5 space-y-1.5 flex flex-col items-center' : 'px-3 space-y-1'
          }`}
        >
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path

            return (
              <GlassTooltip
                key={item.id}
                content={item.label}
                badge={item.badge}
                side="right"
                sideOffset={14}
                enabled={isCollapsed}
              >
                <Link
                  to={item.path}
                  onClick={onCloseMobile}
                  aria-label={item.label}
                  className={`transition-colors cursor-pointer group ${
                    isCollapsed
                      ? `relative w-11 h-11 flex items-center justify-center rounded-2xl ${
                          isActive
                            ? 'bg-background text-[#a83b00] shadow-xs'
                            : 'text-[#2d2b29] hover:bg-[#faf7f4] hover:text-[#1e1e1e]'
                        }`
                      : `w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-[14px] font-medium ${
                          isActive
                            ? 'bg-background text-[#1e1e1e]'
                            : 'text-[#2d2b29] hover:bg-[#faf7f4] hover:text-[#1e1e1e]'
                        }`
                  }`}
                >
                  {isCollapsed ? (
                    <>
                      <Icon
                        size={20}
                        className={`shrink-0 transition-all duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-[#a83b00]'
                            : 'text-[#3a3734] group-hover:text-[#1e1e1e]'
                        }`}
                      />
                      {item.badge && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B08D3c] ring-2 ring-white" />
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={20}
                          className={`shrink-0 transition-colors ${
                            isActive
                              ? 'text-[#a83b00]'
                              : 'text-[#3a3734] group-hover:text-[#1e1e1e]'
                          }`}
                        />
                        <span className="truncate tracking-[-0.01em]">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-[9.5px] font-medium tracking-wide text-white bg-[#B08D3c] rounded-full shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </GlassTooltip>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section: Secondary Nav & Copyright */}
      <div className="flex flex-col">
        {/* Subtle Horizontal Divider */}
        <div
          className={`border-t border-[#f1ecea] transition-all duration-300 ${
            isCollapsed ? 'mx-3 mb-2' : 'mx-4 mb-2'
          }`}
        />

        {/* Secondary Nav Items */}
        <nav
          className={`mb-6 transition-all duration-300 ${
            isCollapsed ? 'px-2.5 space-y-1.5 flex flex-col items-center' : 'px-3 space-y-1'
          }`}
        >
          {SECONDARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path

            return (
              <GlassTooltip
                key={item.id}
                content={item.label}
                badge={item.badge}
                side="right"
                sideOffset={14}
                enabled={isCollapsed}
              >
                <Link
                  to={item.path}
                  onClick={onCloseMobile}
                  aria-label={item.label}
                  className={`transition-colors cursor-pointer group ${
                    isCollapsed
                      ? `relative w-11 h-11 flex items-center justify-center rounded-2xl ${
                          isActive
                            ? 'bg-background text-[#a83b00] shadow-xs'
                            : 'text-[#2d2b29] hover:bg-[#faf7f4] hover:text-[#1e1e1e]'
                        }`
                      : `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-[14px] font-medium ${
                          isActive
                            ? 'bg-background text-[#1e1e1e]'
                            : 'text-[#2d2b29] hover:bg-[#faf7f4] hover:text-[#1e1e1e]'
                        }`
                  }`}
                >
                  {isCollapsed ? (
                    <>
                      <Icon
                        size={20}
                        className={`shrink-0 transition-all duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-[#a83b00]'
                            : 'text-[#3a3734] group-hover:text-[#1e1e1e]'
                        }`}
                      />
                      {item.badge && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B08D3c] ring-2 ring-white" />
                      )}
                    </>
                  ) : (
                    <>
                      <Icon
                        size={20}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#a83b00]'
                            : 'text-[#3a3734] group-hover:text-[#1e1e1e]'
                        }`}
                      />
                      <span className="truncate tracking-[-0.01em]">{item.label}</span>
                    </>
                  )}
                </Link>
              </GlassTooltip>
            )
          })}
        </nav>

        {/* Footer Copyright */}
        {isCollapsed ? (
          <div className="pb-6 flex justify-center">
            <GlassTooltip
              content="Copyright © 2026 ThoughtLead. All rights reserved."
              side="right"
              sideOffset={14}
              enabled={isCollapsed}
            >
              <span className="text-[11px] font-semibold text-[#8a847f] cursor-default px-2 py-1 rounded-md hover:bg-[#faf7f4] transition-colors">
                © 26
              </span>
            </GlassTooltip>
          </div>
        ) : (
          <div className="px-6 pb-7 text-[11px] leading-[1.45] text-[#8a847f] transition-opacity duration-200">
            <p>Copyright © 2026 ThoughtLead.</p>
            <p>All rights reserved.</p>
          </div>
        )}
      </div>
    </aside>
  )
}
