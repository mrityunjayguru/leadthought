import * as React from 'react'
import { Tooltip } from 'radix-ui'

export interface GlassTooltipProps {
  content: React.ReactNode
  badge?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  enabled?: boolean
  children: React.ReactNode
  className?: string
}

export function GlassTooltip({
  content,
  badge,
  side = 'right',
  align = 'center',
  sideOffset = 10,
  enabled = true,
  children,
  className = '',
}: GlassTooltipProps) {
  // If disabled, render the trigger directly without Tooltip wrapper
  if (!enabled) {
    return <>{children}</>
  }

  return (
    <Tooltip.Provider delayDuration={120}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={`z-50 select-none relative overflow-hidden flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold tracking-[-0.01em] text-[#1e1e1e] bg-white/80 backdrop-blur-xl backdrop-saturate-180 border border-white/60 ring-1 ring-black/5 shadow-[0_12px_30px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.06)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150 ease-out pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/60 before:to-transparent before:pointer-events-none ${className}`}
          >
            <span className="relative z-10">{content}</span>
            {badge && (
              <span className="relative z-10 inline-flex items-center justify-center px-1.5 py-0.5 text-[9.5px] font-bold text-white bg-[#B08D3c] rounded-full shrink-0 shadow-xs leading-none">
                {badge}
              </span>
            )}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
