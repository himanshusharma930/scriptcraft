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
      "shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none",
      "hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:hover:bg-brand-dark-card/80"
    )}>
      <div className="flex justify-between items-start mb-4">
        <Badge 
          variant={status === "In-Progress" ? "default" : "secondary"}
          className={cn(
            "rounded-full px-4 py-1.5 text-[13px] font-medium",
            status === "In-Progress" 
              ? "bg-brand-blue-start text-white dark:bg-brand-blue-dark" 
              : "bg-brand-gray-100 dark:bg-brand-dark-secondary text-brand-gray-300 dark:text-brand-gray-dark"
          )}
        >
          {status}
        </Badge>
        <time className="text-[13px] text-brand-gray-300 dark:text-brand-gray-dark">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
      </div>
      
      <h3 className="text-[17px] font-semibold mb-2 
                     text-brand-light-text-primary dark:text-brand-dark-text-primary">
        {title}
      </h3>
      <p className="text-[15px] mb-5 
                    text-brand-gray-300 dark:text-brand-gray-dark">
        {description}
      </p>
      
      <div className="relative">
        <div className="w-full h-2 bg-brand-gray-100 dark:bg-brand-dark-secondary 
                       rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-300",
              "bg-gradient-to-r from-brand-success-light to-brand-success-light/90",
              "dark:from-brand-success-dark dark:to-brand-success-dark/90"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Progress Glow Effect */}
        <div 
          className="absolute inset-0 bg-brand-success-light/10 dark:bg-brand-success-dark/10 
                     blur-md rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  )
}