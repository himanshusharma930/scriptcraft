"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const FILTER_OPTIONS = ["All", "Draft", "In-Progress", "Completed"]

export function FilterPopover({ activeFilter, onFilterChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-9 w-9 rounded-full",
            "hover:bg-brand-gray-100 dark:hover:bg-brand-dark-secondary",
            "transition-colors duration-200",
            activeFilter !== "All" && "text-brand-blue-start dark:text-brand-blue-dark"
          )}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-[200px] p-2",
          "bg-white dark:bg-brand-dark-card",
          "border-brand-light-border dark:border-brand-dark-border",
          "shadow-lg rounded-2xl"
        )}
        align="end"
      >
        <div className="space-y-1">
          {FILTER_OPTIONS.map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 rounded-xl px-3",
                "text-[15px] font-normal",
                activeFilter === filter
                  ? "bg-brand-blue-start/10 dark:bg-brand-blue-dark/10 text-brand-blue-start dark:text-brand-blue-dark"
                  : "text-brand-light-text-primary dark:text-brand-dark-text-primary",
                "hover:bg-brand-gray-100 dark:hover:bg-brand-dark-secondary"
              )}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}