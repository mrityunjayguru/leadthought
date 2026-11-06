import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-4xl font-extrabold text-[#a83b00]">404</p>
      <h2 className="text-xl font-bold text-[#1e1e1e] mt-2">Page Not Found</h2>
      <p className="text-xs text-[#7D7D7D] max-w-sm mt-1 mb-6">
        The requested page does not exist or has been moved to another section.
      </p>
      <Link
        to="/event-universe"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#a83b00] text-white text-xs font-semibold hover:bg-[#8f3200] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Event Universe
      </Link>
    </div>
  )
}
