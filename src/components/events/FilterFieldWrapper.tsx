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
      <label className={`text-[13px] font-regular text-[#7D7D7D] tracking-[-0.01em] select-none ${labelClassName}`}>
        {label}
      </label>
      {children}
    </div>
  )
}
