export interface SegmentedTabsProps {
  activeTab: 'all' | 'following'
  onChange: (tab: 'all' | 'following') => void
  allLabel?: string
  followingLabel?: string
  className?: string
}

/**
 * Reusable segmented tab button switcher (All Events / Following).
 */
export function SegmentedTabs({
  activeTab,
  onChange,
  allLabel = 'All Events',
  followingLabel = 'Following',
  className = '',
}: SegmentedTabsProps) {
  return (
    <div
      className={`inline-flex items-center rounded-lg bg-white overflow-hidden shadow-2xs select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange('all')}
        className={`px-4.5 py-2.5 text-[14px] font-normal transition-colors cursor-pointer ${activeTab === 'all'
          ? 'bg-[#a83b00] text-white'
          : 'bg-white text-[#b96030] hover:text-[#a83b00]'
          }`}
      >
        {allLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange('following')}
        className={`px-4.5 py-2.5 text-[14px] font-normal transition-colors cursor-pointer border-l border-[#e6dfdb] ${activeTab === 'following'
          ? 'bg-[#806A9E] text-white'
          : 'bg-white text-[#b96030] hover:text-[#a83b00]'
          }`}
      >
        {followingLabel}
      </button>
    </div>
  )
}
