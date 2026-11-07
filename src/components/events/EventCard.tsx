import { useState } from 'react'
import { Tooltip } from 'radix-ui'
import type { EventItem } from '@/types/events'
import plusSquareIcon from '../../assets/icons/event/pluse.svg'
import { EventUniverseIcon, FollowIcon, FollowingIcon, TickIcon } from '../icons'
import { CustomerEvaluation } from './CustomerEvaluation'

export interface EventCardProps {
  event: EventItem
  showEvaluation?: boolean
  isCompareLimitReached?: boolean
  onFollowToggle?: (eventId: string, isFollowing: boolean) => void
  onCompareToggle?: (eventId: string, isCompared: boolean) => void
  onMyEventsToggle?: (eventId: string, isInMyEvents: boolean) => void
  onViewDetails?: (eventId: string) => void
  className?: string
}
function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function AttendeesMetricIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.02674 0C6.97082 0.000152791 8.5493 1.52838 8.5493 3.41002V3.41194C8.5413 5.25168 7.04293 6.75082 5.15203 6.81234C5.12946 6.81307 5.10688 6.81259 5.08441 6.81041C5.05168 6.80724 5.00275 6.80704 4.95714 6.81105C4.93621 6.81289 4.91517 6.81301 4.89417 6.81234C3.00369 6.75083 1.50368 5.25166 1.50352 3.41002C1.50352 1.52901 3.07501 0 5.02674 0ZM2.52171 3.41002C2.52186 4.71876 3.58313 5.77889 4.91936 5.82686C4.98684 5.82301 5.05679 5.82308 5.12419 5.82686C6.46056 5.7802 7.52421 4.7206 7.53111 3.41002L7.5278 3.28491C7.46053 2.00539 6.36523 0.985621 5.02674 0.985473C3.63883 0.985473 2.52171 2.07182 2.52171 3.41002Z" fill="#A83B00"/>
<path d="M11.9229 4.10614C11.9229 3.10937 11.091 2.29944 10.0562 2.29944C9.77509 2.2994 9.54713 2.07881 9.54713 1.8067C9.54713 1.53459 9.77509 1.314 10.0562 1.31396C11.6552 1.31396 12.9411 2.56695 12.9411 4.10614C12.9411 5.6142 11.705 6.8418 10.1636 6.89767C10.1362 6.89866 10.1087 6.89776 10.0814 6.89446C10.0713 6.89323 10.0505 6.8923 10.0244 6.8951C9.74501 6.92515 9.4934 6.7305 9.46228 6.46011C9.43123 6.18969 9.63234 5.94617 9.91171 5.91604C9.98492 5.90817 10.0613 5.90757 10.1371 5.91219C11.1289 5.87033 11.9229 5.07767 11.9229 4.10614Z" fill="#A83B00"/>
<path d="M5.14331 7.34998C6.4516 7.34998 7.78571 7.66799 8.817 8.33417C9.74461 8.93147 10.2767 9.76894 10.2767 10.6702C10.2767 11.5148 9.8101 12.305 8.98802 12.8952L8.81899 13.0107C7.78443 13.6806 6.44802 14 5.13867 14C3.82922 14 2.4923 13.6807 1.45768 13.0107C0.531062 12.4135 7.06523e-05 11.576 0 10.6753C0 9.77441 0.530943 8.93529 1.45768 8.33482L1.45967 8.33353C2.49709 7.66779 3.83439 7.35002 5.14331 7.34998ZM5.14331 8.33546C3.98838 8.3355 2.85838 8.61896 2.02245 9.1554C1.30802 9.61898 1.01819 10.179 1.01819 10.6753C1.01825 11.1407 1.27287 11.661 1.89386 12.1035L2.02312 12.1907L2.02444 12.1914C2.85648 12.7301 3.98417 13.0145 5.13867 13.0145C6.29316 13.0145 7.42089 12.7302 8.25289 12.1914C8.96861 11.7276 9.25848 11.1669 9.25848 10.6702C9.25847 10.1737 8.96859 9.61519 8.25355 9.15476L8.25289 9.15412C7.42448 8.61867 6.29841 8.33546 5.14331 8.33546Z" fill="#A83B00"/>
<path d="M10.8904 8.26809C10.9523 8.00271 11.2247 7.83616 11.4989 7.89597C12.0338 8.01267 12.5586 8.22075 13.0017 8.54718C13.6416 9.01168 14 9.6597 14 10.3443C14 11.0288 13.6422 11.6769 13.0024 12.1413L13.0017 12.1407C12.5533 12.4727 12.0208 12.6899 11.4704 12.8009C11.1953 12.8564 10.9253 12.6854 10.8679 12.4191C10.8105 12.1528 10.9872 11.8915 11.2623 11.8359C11.6874 11.7502 12.0758 11.587 12.3865 11.356L12.3912 11.3528C12.8102 11.0487 12.9818 10.678 12.9818 10.3443C12.9818 10.0105 12.8102 9.63986 12.3912 9.33569L12.3879 9.33312C12.0852 9.10942 11.7022 8.95027 11.2749 8.85706C11.0006 8.79724 10.8286 8.53356 10.8904 8.26809Z" fill="#A83B00"/>
</svg>

  )
}


function AudienceLevelMetricIcon() {
  return (
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.58494 5.0268C9.77566 4.83608 10.0848 4.83608 10.2755 5.0268C10.4663 5.21752 10.4663 5.52667 10.2755 5.71739L7.54052 8.4524C7.43714 8.5557 7.29297 8.60725 7.14753 8.59293C7.00194 8.57852 6.87005 8.49972 6.78888 8.378L6.07731 7.31032L4.41506 8.9732C4.22434 9.16393 3.9152 9.16393 3.72448 8.9732C3.53375 8.78248 3.53375 8.47334 3.72448 8.28262L5.80832 6.19877L5.84902 6.16252C5.94786 6.08366 6.07407 6.04571 6.20131 6.05823C6.3469 6.07265 6.4788 6.15144 6.55996 6.27317L7.2709 7.34021L9.58494 5.0268Z" fill="#A83B00"/>
<path d="M9.44186 6.67442V5.86047H8.62791C8.35819 5.86047 8.13953 5.64181 8.13953 5.37209C8.13953 5.10237 8.35819 4.88372 8.62791 4.88372H9.93023C10.2 4.88372 10.4186 5.10237 10.4186 5.37209V6.67442C10.4186 6.94414 10.2 7.16279 9.93023 7.16279C9.66051 7.16279 9.44186 6.94414 9.44186 6.67442Z" fill="#A83B00"/>
<path d="M13.0233 5.04651C13.0233 3.46677 12.7044 2.48797 12.1082 1.89181C11.512 1.29565 10.5332 0.976744 8.95349 0.976744H5.04651C3.46677 0.976744 2.48797 1.29565 1.89181 1.89181C1.29565 2.48797 0.976744 3.46677 0.976744 5.04651V8.95349C0.976744 10.5332 1.29565 11.512 1.89181 12.1082C2.48797 12.7044 3.46677 13.0233 5.04651 13.0233H8.95349C10.5332 13.0233 11.512 12.7044 12.1082 12.1082C12.7044 11.512 13.0233 10.5332 13.0233 8.95349V5.04651ZM14 8.95349C14 10.6296 13.6677 11.9298 12.7988 12.7988C11.9298 13.6677 10.6296 14 8.95349 14H5.04651C3.37044 14 2.07017 13.6677 1.20122 12.7988C0.332261 11.9298 0 10.6296 0 8.95349V5.04651C0 3.37044 0.332261 2.07017 1.20122 1.20122C2.07017 0.332261 3.37044 0 5.04651 0H8.95349C10.6296 0 11.9298 0.332261 12.7988 1.20122C13.6677 2.07017 14 3.37044 14 5.04651V8.95349Z" fill="#A83B00"/>
</svg>


  )
}

function IndustryMetricIcon() {
  return (
<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 3.00114C0 1.3523 1.31311 0 2.93184 0H9.06195C10.6811 0 11.9924 1.35201 12 2.9986V12.173C12 12.8687 11.7538 13.4842 11.2293 13.8004C10.7046 14.1168 10.0598 14.0377 9.46623 13.6994L6.36299 11.9359L6.35864 11.9334C6.28641 11.8914 6.15851 11.8558 6.00217 11.8558C5.84631 11.8558 5.71502 11.8911 5.63763 11.9353L5.63701 11.9359L2.53377 13.7L2.53191 13.7006C1.93781 14.0354 1.29401 14.1108 0.770688 13.7953C0.247009 13.4796 3.0052e-05 12.8667 0 12.173V3.00114ZM0.953889 12.173C0.953918 12.6508 1.11686 12.8713 1.25446 12.9543C1.39243 13.0375 1.66127 13.0769 2.07173 12.8456L5.17373 11.0822C5.42681 10.9379 5.72756 10.8794 6.00217 10.8794C6.27496 10.8794 6.57446 10.9373 6.82565 11.0822L9.92951 12.8462C10.3405 13.0805 10.6083 13.041 10.7449 12.9588C10.8817 12.8763 11.0461 12.6555 11.0461 12.173V3.00305L11.043 2.89943C10.9852 1.83356 10.1178 0.976436 9.06195 0.976436H2.93184C1.84153 0.976436 0.953889 1.88993 0.953889 3.00114V12.173Z" fill="#A83B00"/>
<path d="M7.62458 4.37426C7.81084 4.1836 8.11275 4.1836 8.29901 4.37426C8.48527 4.56492 8.48527 4.87397 8.29901 5.06463L5.7553 7.66846C5.56905 7.85912 5.26713 7.85912 5.08088 7.66846L4.12699 6.69202C3.94073 6.50136 3.94073 6.19231 4.12699 6.00165C4.31325 5.81099 4.61516 5.81099 4.80142 6.00165L5.41809 6.6329L7.62458 4.37426Z" fill="#A83B00"/>
</svg>
  )
}

export function EventCard({
  event,
  showEvaluation = false,
  isCompareLimitReached = false,
  onFollowToggle,
  onCompareToggle,
  onMyEventsToggle,
  onViewDetails,
  className = '',
}: EventCardProps) {
  const [internalFollowing, setInternalFollowing] = useState(event.isFollowing ?? false)
  const [internalCompared, setInternalCompared] = useState(event.isCompared ?? false)
  const [internalInMyEvents, setInternalInMyEvents] = useState(event.isInMyEvents ?? false)

  const isFollowing = event.isFollowing !== undefined ? event.isFollowing : internalFollowing
  const isCompared = event.isCompared !== undefined ? event.isCompared : internalCompared
  const isInMyEvents = event.isInMyEvents !== undefined ? event.isInMyEvents : internalInMyEvents

  // When 3 places are full in compare, all unselected compare checkboxes are disabled
  const isCompareDisabled = !isCompared && isCompareLimitReached

  const handleFollowClick = () => {
    const next = !isFollowing
    setInternalFollowing(next)
    onFollowToggle?.(event.id, next)
  }

  const handleCompareClick = () => {
    if (isCompareDisabled) return
    const next = !isCompared
    setInternalCompared(next)
    onCompareToggle?.(event.id, next)
  }

  const handleMyEventsClick = () => {
    const next = !isInMyEvents
    setInternalInMyEvents(next)
    onMyEventsToggle?.(event.id, next)
  }

  return (
    <article
      className={`bg-white rounded-[10px] border-[1.5px] ${
        isCompared ? 'border-[#806A9E] ' : 'border-white'
      } p-3 sm:p-3 flex flex-col justify-between space-y-3.5 select-none transition-all hover:shadow-xs ${className}`}
    >
      {/* Top Header Section */}
      <div className="flex items-start gap-3">
        {/* Date Badge */}
        <div className="w-[45px] mt-4 shrink-0 rounded-[4px] overflow-hidden text-center bg-background">
          <div className="bg-[#A83B00] text-white text-[9.5px] font-semibold tracking-wider py-0.5 leading-none">
            {event.month}
          </div>
          <div className="py-1 px-0.5 flex flex-col items-center justify-center">
            <span className="font-bold text-[14px] text-[#1e1e1e] leading-tight">
              {event.dates}
            </span>
            <span className="text-[10px] text-[#7D7D7D] leading-none">
              {event.year}
            </span>
          </div>
        </div>

        {/* Content on the right: Top row has Compare, then Title, then Location */}
        <div className="flex-1 min-w-0">
          {/* Top Row: Compare aligned to top-right */}
          <div className="flex items-center justify-end gap-3 mb-0.5">
            {/* Compare */}
            {isCompareDisabled ? (
              <Tooltip.Provider delayDuration={50}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="inline-flex cursor-pointer">
                      <button
                        type="button"
                        onClick={handleCompareClick}
                        className="flex items-center gap-1.5 text-[13px] text-[#C5BFBA] cursor-pointer select-none"
                        aria-disabled="true"
                        aria-label="Compare limit reached. Remove one to add another"
                      >
                        <span className="w-[14px] h-[14px] rounded-[3px] border border-[#D5CFCA] bg-white flex items-center justify-center transition-colors" />
                        <span>Compare</span>
                      </button>
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="bottom"
                      align="start"
                      sideOffset={4}
                      className="z-50 px-3 py-1.5 rounded-[8px] bg-[#F4F5F6] text-[#6B7280] text-[12.5px] font-normal tracking-normal shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-200/60 select-none animate-in fade-in-0 duration-150"
                    >
                      Remove one to add another
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              <button
                type="button"
                onClick={handleCompareClick}
                className="flex items-center gap-1.5 text-[13px] text-[#6D5B97] hover:text-[#58477f] transition-colors cursor-pointer select-none"
              >
                <span
                  className={`w-[14px] h-[14px] rounded-[3px] border flex items-center justify-center transition-colors ${
                    isCompared
                      ? 'bg-[#8A79A9] border-[#8A79A9] text-white'
                      : 'border-[#8A79A9] bg-white'
                  }`}
                >
                  {isCompared && (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span>Compare</span>
              </button>
            )}
          </div>

          {/* Event Title */}
          <h3
            onClick={() => onViewDetails?.(event.id)}
            className="text-[14.5px] mt-3 sm:text-[15px] font-medium text-[#1e1e1e] leading-[1.25] tracking-[-0.015em] hover:text-[#A83B00] transition-colors cursor-pointer truncate"
            title={event.title}
          >
            {event.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-[10px] text-[#7D7D7D] mt-0.5">
            <LocationPinIcon />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>
      <div className="h-px bg-background" />
      {/* 3 Key Stats / Meta Row */}
      <div className="grid grid-cols-3 gap-2 pt-0.5 px-3">
        {/* Attendees */}
        <div className="flex items-start gap-2 min-w-0">
          <AttendeesMetricIcon />
          <div className="min-w-0 leading-tight">
            <div className="text-[12.5px] font-semibold text-[#1e1e1e] tracking-tight">
              {event.attendees}
            </div>
            <div className="text-[10.5px] text-[#7D7D7D]">Attendees</div>
          </div>
        </div>

        {/* Audience Level */}
        <div className="flex items-start gap-2 min-w-0">
          <AudienceLevelMetricIcon />
          <div className="min-w-0 leading-tight">
            <div className="text-[12.5px] font-semibold text-[#1e1e1e] tracking-tight truncate">
              {event.audienceLevel}
            </div>
            <div className="text-[10.5px] text-[#7D7D7D]">Audience Level</div>
          </div>
        </div>

        {/* Industry */}
        <div className="flex items-start gap-2 min-w-0">
          <IndustryMetricIcon />
          <div className="min-w-0 leading-tight">
            <div className="text-[12.5px] font-bold text-[#1e1e1e] tracking-tight truncate" title={event.industry}>
              {event.industry}
            </div>
            <div className="text-[10.5px] text-[#7D7D7D]">Industry</div>
          </div>
        </div>
      </div>

      {/* Topic Tags */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] text-[#7D7D7D] bg-background border border-[#D9D9D9] px-2 py-0.5 rounded-full leading-tight font-regular"
          >
            {tag}
          </span>
        ))}
        {event.overflowTagsCount && (
          <span className="text-[11px] text-[#7D7D7D] bg-background border border-[#D9D9D9] px-1.5 py-0.5 rounded-full leading-tight font-regular">
            +{event.overflowTagsCount}
          </span>
        )}
      </div>

      {/* CFP Deadline Strip */}
      <div className="bg-[#f8f5f2] rounded-[6px] px-2.5 py-1.5 flex items-center gap-2 text-[11.5px] text-[#55504c]">
        <span className="text-[#7D7D7D]">
          <EventUniverseIcon size={12} />
        </span>
        <span className="truncate">CFP deadline: {event.cfpDeadline}</span>
      </div>

      {/* Customer Evaluation (only shown on Following tab) */}
      {showEvaluation && (
        <CustomerEvaluation
          evaluation={
            event.evaluation ?? {
              tier: '-',
              strategicFit: '-',
              priority: '-',
              status: '-',
              actionType: 'evaluate',
            }
          }
        />
      )}

      {/* Action Buttons Row */}
      <div className="grid grid-cols-3 gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => onViewDetails?.(event.id)}
          className="w-full border border-[#B86030] text-[#A83B00] bg-white hover:bg-[#FAF6F3] rounded-[6px] py-1.5 px-2 text-[12px] font-medium transition-colors text-center cursor-pointer truncate"
        >
          View Details
        </button>

        {isFollowing ? (
          <button
            type="button"
            onClick={handleFollowClick}
            className="w-full border border-[#806A9E] text-[#806A9E] bg-[#F3EFF8] hover:bg-[#F2F7F6] rounded-[6px] py-1.5 px-2 text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FollowingIcon size={14} className="shrink-0" />
            <span>Following</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFollowClick}
                        className="w-full bg-[white] text-[#806A9E] border border-[#806A9E] rounded-[6px] py-1.5 px-2 text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"

          >
            <FollowIcon size={14} className="shrink-0" />
            <span>Follow</span>
          </button>
        )}

        {isInMyEvents ? (
          <button
            type="button"
            onClick={handleMyEventsClick}
            className="w-full bg-[#397A72] text-white hover:bg-[#43877E] rounded-[6px] py-1.5 px-2 text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <TickIcon size={14} className="shrink-0" />
            <span>In My Events</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMyEventsClick}
            className="w-full border border-[#397A72] text-[#397A72] bg-white hover:bg-[#F2F7F6] rounded-[6px] py-1.5 px-2 text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <img src={plusSquareIcon} width="14" height="14" alt="Add to My Events" className="shrink-0" />
            <span className="truncate">Add to My Events</span>
          </button>
        )}
      </div>
    </article>
  )
}


