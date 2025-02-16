"use client"

import { cn } from "@/lib/utils"

export function MessageBubble({ message, isStreaming }) {
  const isAssistant = message.role === 'assistant'

  return (
    <div
      className={cn(
        "flex animate-in fade-in slide-in-from-bottom-5 duration-300",
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3",
        "transition-all duration-200",
        isAssistant 
          ? "bg-brand-gray-100 dark:bg-brand-dark-secondary" 
          : "bg-brand-blue-start dark:bg-brand-blue-dark",
        "shadow-ios hover:shadow-ios-md"
      )}>
        <p className={cn(
          "text-[15px] leading-relaxed",
          isAssistant
            ? "text-brand-light-text-primary dark:text-brand-dark-text-primary"
            : "text-white"
        )}>
          {message.content}
          {isStreaming && (
            <span className="inline-block animate-pulse">▋</span>
          )}
        </p>
      </div>
    </div>
  )
}