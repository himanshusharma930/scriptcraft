"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ProjectCard({ status, title, description, date, progress }) {
  return (
    <Card className={cn(
      "p-5 rounded-2xl transition-all duration-200",
      "bg-white dark:bg-brand-dark-card",
      "border-brand-light-border dark:border-brand-dark-border",
      "shadow-sm dark:shadow-none"
    )}>
      <div className="flex justify-between items-start mb-4">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={cn(
            "rounded-full px-4 py-1.5 text-[13px] font-medium",
            status === "In-Progress" 
              ? "bg-brand-blue-start text-white" 
              : "bg-brand-gray-100 dark:bg-brand-dark-secondary text-brand-gray-300 dark:text-brand-gray-dark"
          )}
        >
          {status}
        </Badge>
        <span className="text-[13px] text-brand-gray-300 dark:text-brand-gray-dark">
          {date}
        </span>
      </div>
      
      <h3 className="text-[17px] font-semibold mb-2 text-brand-light-text-primary dark:text-brand-dark-text-primary">
        {title}
      </h3>
      <p className="text-[15px] mb-5 text-brand-gray-300 dark:text-brand-gray-dark">
        {description}
      </p>
      
      <div className="w-full h-2 bg-brand-gray-100 dark:bg-brand-dark-secondary rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300 bg-brand-success-light dark:bg-brand-success-dark"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}