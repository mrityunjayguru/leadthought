import type { EventEvaluation } from '@/types/events'
import { PenIcon } from '../icons'

export interface CustomerEvaluationProps {
  evaluation: EventEvaluation
  onActionClick?: (actionType: string) => void
  className?: string
}

/**
 * CustomerEvaluation - Renders the purple-bordered evaluation box with
 * Tier, Strategic Fit, Priority, Status, and contextual Action Button (Notes, Evaluate, or Add Notes).
 */
export function CustomerEvaluation({
  evaluation,
  onActionClick,
  className = '',
}: CustomerEvaluationProps) {
  const {
    tier = '-',
    strategicFit = '-',
    priority = '-',
    status = '-',
    actionType = 'evaluate',
  } = evaluation

  return (
    <div
      className={`relative w-full rounded-[8px] border border-[#806A9E] bg-[#FAF9FC] pt-3 pb-2.5 px-3 select-none ${className}`}
    >
      {/* "Customer Evaluation" pill badge overlapping top border */}
      <div className="absolute -top-[14px] left-5 sm:left-6">
        <span className="inline-flex items-center px-2.5 py-0.5 text-[9.5px] font-medium text-[#806A9E] bg-white border border-[#806A9E] rounded-full leading-none shadow-2xs">
          Customer Evaluation
        </span>
      </div>

      {/* Row with 4 metrics + Action button */}
      <div className="flex items-center justify-between gap-1.5 pt-0.5">
        {/* Tier */}
        <div className="flex flex-col min-w-0">
          <span className="text-[9.5px] text-[#7D7D7D] leading-none">Tier</span>
          <span className="text-[11.5px] font-semibold text-[#1e1e1e] leading-tight mt-1 truncate">
            {tier}
          </span>
        </div>

        {/* Strategic Fit */}
        <div className="flex flex-col min-w-0">
          <span className="text-[9.5px] text-[#7D7D7D] leading-none">Strategic Fit</span>
          <span className="text-[11.5px] font-semibold text-[#1e1e1e] leading-tight mt-1 truncate">
            {strategicFit}
          </span>
        </div>

        {/* Priority */}
        <div className="flex flex-col min-w-0">
          <span className="text-[9.5px] text-[#7D7D7D] leading-none">Priority</span>
          <span className="text-[11.5px] font-semibold text-[#1e1e1e] leading-tight mt-1 truncate">
            {priority}
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col min-w-0">
          <span className="text-[9.5px] text-[#7D7D7D] leading-none">Status</span>
          <span className="text-[11.5px] font-semibold text-[#1e1e1e] leading-tight mt-1 truncate">
            {status}
          </span>
        </div>

        {/* Right Action Button */}
        <div className="shrink-0 pl-1">
          {actionType === 'notes' && (
            <button
              type="button"
              onClick={() => onActionClick?.('notes')}
              className="bg-[#806A9E] hover:bg-[#5f4e85] text-white text-[11px] font-medium px-2.5 py-1 rounded-[5px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PenIcon size={12} />
              <span>Notes</span>
            </button>
          )}

          {actionType === 'evaluate' && (
            <button
              type="button"
              onClick={() => onActionClick?.('evaluate')}
              className="bg-[#A83B00] hover:bg-[#923300] text-white text-[11px] font-medium px-3 py-1 rounded-[5px] transition-colors cursor-pointer"
            >
              Evaluate
            </button>
          )}

          {actionType === 'add-notes' && (
            <button
              type="button"
              onClick={() => onActionClick?.('add-notes')}
              className="border border-[#8A79A9] hover:bg-[#f3edf9] text-[#806A9E] bg-white text-[11px] font-medium px-2.5 py-1 rounded-[5px] transition-colors cursor-pointer"
            >
              Add Notes
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
