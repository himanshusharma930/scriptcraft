"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const STATIC_CLASSES = {
  projectCard: "p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
}

export function ProjectCard({ status, title, description, date, progress }) {
  return (
    <Card className={STATIC_CLASSES.projectCard}>
      <div className="flex justify-between items-start mb-3">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={`
            rounded-full px-4 py-1 text-xs font-medium
            ${status === "In-Progress" 
              ? 'bg-[#007AFF] hover:bg-[#007AFF]/90' 
              : 'bg-[#E5E5EA] text-[#8E8E93]'
            }
          `}
        >
          {status}
        </Badge>
        <span className="text-sm text-[#8E8E93]">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-[#1C1C1E] mb-1">{title}</h3>
      <p className="text-sm text-[#8E8E93] mb-4">{description}</p>
      <div className="w-full h-2 bg-[#E5E5EA] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#34C759] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}