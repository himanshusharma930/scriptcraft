"use client"

import { cn } from "@/lib/utils"
import { YoutubeSuggestions } from "./youtube-suggestions"

export function MessageBubble({ message, onSuggestionSelect }) {
  const isAssistant = message.type === 'assistant'

  return (
    <div className={cn(
      "flex",
      isAssistant ? 'justify-start' : 'justify-end'
    )}>
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3",
        isAssistant 
          ? "bg-brand-gray-100 dark:bg-brand-dark-secondary" 
          : "bg-brand-blue-start dark:bg-brand-blue-dark"
      )}>
        {/* Message Content */}
        <p className={cn(
          "text-[15px] leading-relaxed",
          isAssistant
            ? "text-brand-light-text-primary dark:text-brand-dark-text-primary"
            : "text-white"
        )}>
          {message.content}
        </p>

        {/* YouTube Suggestions */}
        {isAssistant && message.showSuggestions && (
          <div className="mt-4">
            <YoutubeSuggestions onSelect={onSuggestionSelect} />
          </div>
        )}

        {/* Loading Indicator */}
        {message.isLoading && (
          <div className="flex gap-1.5 mt-2">
            <div className="w-2 h-2 rounded-full bg-brand-gray-300 dark:bg-brand-gray-dark animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-brand-gray-300 dark:bg-brand-gray-dark animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-brand-gray-300 dark:bg-brand-gray-dark animate-bounce delay-200" />
          </div>
        )}
      </div>
    </div>
  )
}