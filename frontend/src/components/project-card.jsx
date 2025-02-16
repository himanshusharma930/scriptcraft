"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectCard({ status, title, description, date, progress }) {
  return (
    <Card className="p-5 bg-white rounded-2xl border-brand-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={`
            rounded-full px-4 py-1.5 text-[13px] font-medium
            ${status === "In-Progress" 
              ? 'bg-brand-blue-start text-white' 
              : 'bg-brand-gray-100 text-brand-gray-300'
            }
          `}
        >
          {status}
        </Badge>
        <span className="text-[13px] text-brand-gray-300">{date}</span>
      </div>
      
      <h3 className="text-[17px] font-semibold text-[#1C1C1E] mb-2">{title}</h3>
      <p className="text-[15px] text-brand-gray-300 mb-5">{description}</p>
      
      {/* Progress Bar with Exact Color */}
      <div className="w-full h-2 bg-brand-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-success transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}