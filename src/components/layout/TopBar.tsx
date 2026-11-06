import { MenuIcon, ChevronDownIcon } from '@/components/icons'
import { GlassTooltip } from '@/components/ui/glass-tooltip'
import defaultAvatar from '@/assets/icons/avatar.jpg'

export interface UserProfile {
  name: string
  company: string
  avatarUrl?: string
}

export interface TopBarProps {
  title?: string
  user?: UserProfile
  onToggleSidebar?: () => void
  isCollapsed?: boolean
  className?: string
}

const DEFAULT_USER: UserProfile = {
  name: 'Sarah Mitchell',
  company: 'Nexus Health Technologies',
  avatarUrl: defaultAvatar,
}

export function TopBar({
  title = 'Event Universe',
  user = DEFAULT_USER,
  onToggleSidebar,
  isCollapsed = false,
  className = '',
}: TopBarProps) {
  return (
    <header
      className={`h-[70px] bg-white border-b border-[#f1ecea] px-6 flex items-center justify-between select-none shrink-0 ${className}`}
    >
      {/* Left: Hamburger Menu + Page Title */}
      <div className="flex items-center gap-3.5">
        <GlassTooltip
          content={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          side="bottom"
          sideOffset={8}
        >
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
            aria-expanded={!isCollapsed}
            className="p-1.5 -ml-1 text-[#2d2b29] hover:text-[#1e1e1e] rounded-lg hover:bg-[#faf7f4] active:bg-[#f2ece6] transition-colors cursor-pointer flex items-center justify-center"
          >
            <MenuIcon size={20} />
          </button>
        </GlassTooltip>

        <h1 className="text-[20px] sm:text-[22px] font-bold text-[#A83B00] tracking-[-0.015em] leading-none">
          {title}
        </h1>
      </div>

      {/* Right: User Profile Widget */}
      <button
        type="button"
        className="flex items-center gap-3 py-1.5 pl-3 pr-2 transition-colors cursor-pointer group text-left"
      >
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-[14px] font-medium text-[#1e1e1e] tracking-[-0.01em]">
            {user.name}
          </span>
          <span className="text-[12px] text-[#b86030] tracking-[-0.005em]">
            {user.company}
          </span>
        </div>
<div className="rounded-full bg-[#fbf9f6]">
        <div className="relative ">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#f1ecea]"
              onError={(e) => {
                // Graceful fallback to initial avatar if image fails to load
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent) {
                  const fallback = parent.querySelector('.avatar-fallback')
                  if (fallback) fallback.classList.remove('hidden')
                }
              }}
            />
          ) : null}
          <div className="avatar-fallback hidden w-8 h-8 rounded-full bg-[#f6f3f0] text-[#a83b00] text-xs font-semibold flex items-center justify-center ring-1 ring-[#f1ecea]">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          </div>
        </div>

        <ChevronDownIcon
          size={14}
          className="text-[#7D7D7D] group-hover:text-[#1e1e1e] transition-colors"
        />
      </button>
    </header>
  )
}
