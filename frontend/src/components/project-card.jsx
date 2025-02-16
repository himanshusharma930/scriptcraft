"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectCard({ status, title, description, date, progress }) {
  return (
    <Card className="p-5 rounded-2xl
                     bg-white dark:bg-brand-dark-card
                     border-brand-light-border dark:border-brand-dark-border
                     shadow-sm dark:shadow-none
                     transition-colors duration-200">
      <div className="flex justify-between items-start mb-4">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={`
            rounded-full px-4 py-1.5 text-[13px] font-medium
            ${status === "In-Progress" 
              ? 'bg-brand-blue-start text-white' 
              : 'bg-brand-gray-100 dark:bg-brand-dark-secondary 
                 text-brand-gray-300 dark:text-brand-gray-dark'
            }
          `}
        >
          {status}
        </Badge>
        <span className="text-[13px] text-brand-gray-300 
                        dark:text-brand-gray-dark">
          {date}
        </span>
      </div>
      
      <h3 className="text-[17px] font-semibold 
                     text-[#1C1C1E] dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-[15px] text-brand-gray-300 
                    dark:text-brand-gray-dark mb-5">
        {description}
      </p>
      
      <div className="w-full h-2 bg-brand-gray-100 
                      dark:bg-brand-dark-secondary rounded-full 
                      overflow-hidden">
        <div 
          className="h-full bg-brand-success transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}