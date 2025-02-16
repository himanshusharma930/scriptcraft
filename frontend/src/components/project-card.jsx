"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectCard({ status, title, description, date, progress }) {
  return (
    <Card className="p-5 bg-white rounded-2xl border-[#E5E5EA] shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={`
            rounded-full px-4 py-1.5 text-[13px] font-medium
            ${status === "In-Progress" 
              ? 'bg-[#007AFF] hover:bg-[#007AFF]/90' 
              : 'bg-[#E5E5EA] text-[#8E8E93]'
            }
          `}
        >
          {status}
        </Badge>
        <span className="text-[13px] text-[#8E8E93]">{date}</span>
      </div>
      <h3 className="text-[17px] font-semibold text-[#1C1C1E] mb-2">{title}</h3>
      <p className="text-[15px] text-[#8E8E93] mb-5">{description}</p>
      <div className="w-full h-2 bg-[#E5E5EA] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#34C759] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}