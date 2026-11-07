import { useState } from 'react'
import type { EventItem } from '@/types/events'
import { Plus } from 'lucide-react'

export interface EventCompareBarProps {
  comparedEvents: EventItem[]
  onRemoveEvent: (eventId: string) => void
  onClearAll: () => void
  onCompareClick?: (events: EventItem[]) => void
  className?: string
}

/**
 * EventCompareBar - Floating comparison tray matching the design screenshot
 * with responsive layout that never gets cut off on smaller screens.
 */
export function EventCompareBar({
  comparedEvents,
  onRemoveEvent,
  onClearAll,
  onCompareClick,
  className = '',
}: EventCompareBarProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (comparedEvents.length === 0) return null

  const emptySlotsCount = Math.max(0, 3 - comparedEvents.length)
  const canCompare = comparedEvents.length >= 2

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 lg:left-[var(--sidebar-width,270px)] z-30 bg-[#F3EFF8] border-t border-[#AB9CC0] px-4 sm:px-6 py-2.5 transition-[left] duration-300 ease-in-out shadow-lg min-h-[90px] sm:h-[100px] flex items-center animate-in fade-in slide-in-from-bottom-2 duration-200 select-none ${className}`}
    >
      <div className="w-full flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        {/* Left Section: Title & Slots */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-6 min-w-0 flex-1">
          {/* Title & Clear All */}
          <div className="flex flex-col shrink-0 min-w-fit">
            <div className="text-[13 px] sm:text-[15px] font-semibold text-[#806A9E] leading-[1.25]">
              Select up to 3 events<br />to compare
            </div>
            <button
              type="button"
              onClick={onClearAll}
              className="text-[10.5px] sm:text-[11px] text-[#4E5053] hover:text-[#806A9E] hover:underline cursor-pointer text-left transition-colors mt-1"
            >
              Clear All
            </button>
          </div>

          {/* 3 Slots (scrollable horizontally if viewport is constrained) */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
            {comparedEvents.map((event) => (
              <div
                key={event.id}
                className="w-[170px] sm:w-[205px] md:w-[205px] h-[50px] bg-white rounded-[6px] border border-[#806A9E] px-2.5 py-1.5 flex flex-col justify-between shrink-0 shadow-2xs"
              >
                <div
                  className="text-[11.5px] sm:text-[12px] font-medium text-[#806A9E] truncate leading-tight"
                  title={event.title}
                >
                  {event.title}
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveEvent(event.id)}
                  className="text-[9.5px] sm:text-[10px] text-[#4E5053] hover:text-[#A83B00] transition-colors leading-none text-left cursor-pointer truncate"
                >
                  Remove from Comparison
                </button>
              </div>
            ))}

            {Array.from({ length: emptySlotsCount }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-[170px] sm:w-[205px] md:w-[205px] h-[50px] bg-[#FCFCFB] rounded-[6px] border border-dashed border-[#7D7D7D]/60 px-2 flex items-center gap-2.5 shrink-0 select-none"
              >
                <div className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] bg-white rounded-[4px] border border-dashed border-[#e8e4ee] shadow-2xs flex items-center justify-center shrink-0">
                  <Plus size={12} className="text-[#9E9E9E]" />
                </div>
                <span className="text-[11px] sm:text-[11.5px] text-[#B5AFBE] truncate font-normal">
                  Add Another Event
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Compare Button & Hover Tooltip */}
        <div className="relative shrink-0 flex flex-col items-center pl-1 sm:pl-2">
          {canCompare ? (
            <button
              type="button"
              onClick={() => onCompareClick?.(comparedEvents)}
              className="h-[32px] px-4 sm:px-5 rounded-[4px] bg-[#806A9E] hover:bg-[#6D5B97] text-white text-[12px] font-medium flex items-center justify-center transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Compare
            </button>
          ) : (
            <div
              className="relative flex flex-col items-end cursor-not-allowed"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <button
                type="button"
                className="w-[78px] sm:w-[84px] h-[32px] rounded-[4px] bg-[#D9D9D9] text-white text-[12px] font-medium flex items-center justify-center pointer-events-none whitespace-nowrap select-none"
              >
                Compare
              </button>
              {/* Tooltip shown only on hover */}
              {isHovered && (
                <div
                  role="tooltip"
                  className="absolute right-0 top-full mt-1.5 px-2.5 py-0.5 bg-white text-[#55504c] text-[9.5px] sm:text-[10px] rounded-[4px] border border-[#e6e2e5] shadow-md whitespace-nowrap z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-100"
                >
                  Select 2+ to compare
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
