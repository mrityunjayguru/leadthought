import React from 'react'

export interface FilterFieldWrapperProps {
  label: string
  children: React.ReactNode
  className?: string
  labelClassName?: string
}

/**
 * Reusable wrapper providing the standard field label and spacing.
 */
export function FilterFieldWrapper({
  label,
  children,
  className = '',
  labelClassName = '',
}: FilterFieldWrapperProps) {
  return (
    <div className={`flex flex-col gap-1.5 min-w-0 ${className}`}>
      <label className={`text-[12px] font-normal text-[#8a847f] tracking-[-0.01em] select-none ${labelClassName}`}>
        {label}
      </label>
      {children}
    </div>
  )
}
