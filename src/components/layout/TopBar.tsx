import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuIcon, ChevronDownIcon } from '@/components/icons'
import { GlassTooltip } from '@/components/ui/glass-tooltip'
import defaultAvatar from '@/assets/icons/avatar.jpg'
import SettingsIcon from '@/assets/icons/profile/setting.svg'
import ProfileIcon from '@/assets/icons/profile/user.svg'



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
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

      {/* Right: User Profile Widget with Bubble Trigger & Dropdown */}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-3 py-1 pl-3 pr-0 transition-colors cursor-pointer group text-left select-none focus:outline-none"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* User Name & Company text info */}
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-[14px] font-semibold text-[#1e1e1e] tracking-[-0.01em]">
              {user.name}
            </span>
            <span className="text-[12px] font-medium text-[#b86030] tracking-[-0.005em]">
              {user.company}
            </span>
          </div>

          {/* Bubble containing Avatar and Chevron Down Icon */}
          <div className="h-[40px] bg-[#F6F3F0] rounded-full pl-1 pr-2.5 flex items-center gap-2 transition-colors hover:bg-[#EFEAE4]">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-[32px] h-[32px] rounded-full object-cover shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    const fallback = parent.querySelector('.avatar-fallback')
                    if (fallback) fallback.classList.remove('hidden')
                  }
                }}
              />
            ) : null}
            <div className="avatar-fallback hidden w-[32px] h-[32px] rounded-full bg-[#f6f3f0] text-[#a83b00] text-xs font-semibold flex items-center justify-center shrink-0">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <ChevronDownIcon
              size={13}
              className={`text-[#2D2A28] transition-transform duration-200 shrink-0 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        
      </div>
    </header>
  )
}
