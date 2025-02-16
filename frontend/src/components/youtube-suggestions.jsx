"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SUGGESTION_CATEGORIES = {
  "Script Writing": [
    "Create a video outline",
    "Write an engaging hook",
    "Develop talking points",
    "Plan B-roll shots"
  ],
  "Content Strategy": [
    "Analyze trending topics",
    "Research competitors",
    "Plan content series",
    "Optimize for SEO"
  ],
  "Thumbnail Design": [
    "Generate thumbnail ideas",
    "Color scheme suggestions",
    "Text overlay tips",
    "Composition guidelines"
  ],
  "Audience Engagement": [
    "Call-to-action ideas",
    "Community post suggestions",
    "End screen optimization",
    "Comment response templates"
  ]
}

export function YoutubeSuggestions({ onSelect }) {
  return (
    <div className="space-y-4">
      {Object.entries(SUGGESTION_CATEGORIES).map(([category, suggestions]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-[13px] font-medium text-brand-gray-300 dark:text-brand-gray-dark px-1">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => onSelect(suggestion)}
                className={cn(
                  "rounded-full text-[13px] h-8",
                  "bg-white dark:bg-brand-dark-card",
                  "border-brand-light-border dark:border-brand-dark-border",
                  "text-brand-blue-start dark:text-brand-blue-dark",
                  "hover:bg-brand-blue-start/5 dark:hover:bg-brand-blue-dark/10",
                  "transition-all duration-200"
                )}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}