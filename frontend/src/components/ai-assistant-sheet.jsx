"use client"

import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, Send, Sparkles, Image, Link, Video } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { cn } from "@/lib/utils"

const INITIAL_MESSAGE = {
  type: 'assistant',
  content: "Hello! I'm your YouTube content assistant. How can I help you create amazing videos today?",
  showSuggestions: true
}

export function AiAssistantSheet({ open, onOpenChange }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [isRecording, setIsRecording] = useState(false)
  const scrollRef = useRef(null)

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  const handleSend = async () => {
    if (!message.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }])
    setMessage("")
    
    // Add loading message
    setMessages(prev => [...prev, {
      type: 'assistant',
      content: "",
      isLoading: true
    }])

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          type: 'assistant',
          content: "I'll help you create engaging content! Let's explore some options:",
          showSuggestions: true
        }
      ])
    }, 1500)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className={cn(
          "px-0 pt-0 pb-0 h-[85vh] rounded-t-[32px] border-t-0",
          "bg-brand-light-bg dark:bg-brand-dark-bg"
        )}
      >
        {/* Quick Actions */}
        <div className="px-6 py-2 border-b border-brand-light-border dark:border-brand-dark-border">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <QuickAction icon={<Image />} label="Thumbnail" />
            <QuickAction icon={<Video />} label="Script" />
            <QuickAction icon={<Link />} label="Research" />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="h-[calc(85vh-220px)] px-6 py-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble 
                key={i}
                message={msg}
                onSuggestionSelect={(suggestion) => setMessage(suggestion)}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="sticky bottom-0 px-6 py-4 bg-brand-light-bg dark:bg-brand-dark-bg
                        border-t border-brand-light-border dark:border-brand-dark-border">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full shrink-0",
                "text-brand-gray-300 dark:text-brand-gray-dark",
                "hover:bg-brand-gray-100 dark:hover:bg-brand-dark-secondary",
                isRecording && "text-brand-blue-start dark:text-brand-blue-dark"
              )}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="h-5 w-5" />
            </Button>
            
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message YouTube Assistant..."
              className={cn(
                "h-10 px-4",
                "bg-brand-gray-100 dark:bg-brand-dark-secondary",
                "border-0 rounded-2xl",
                "placeholder:text-brand-gray-300 dark:placeholder:text-brand-gray-dark",
                "focus-visible:ring-2 focus-visible:ring-brand-blue-start dark:focus-visible:ring-brand-blue-dark"
              )}
            />
            
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className={cn(
                "h-10 w-10 rounded-full shrink-0",
                "bg-brand-blue-start dark:bg-brand-blue-dark",
                "hover:bg-brand-blue-start/90 dark:hover:bg-brand-blue-dark/90",
                "disabled:opacity-50",
                "transition-all duration-200"
              )}
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function QuickAction({ icon, label }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-9 px-4 rounded-full shrink-0",
        "text-brand-gray-300 dark:text-brand-gray-dark",
        "hover:bg-brand-gray-100 dark:hover:bg-brand-dark-secondary",
        "transition-all duration-200"
      )}
    >
      {icon}
      <span className="ml-2 text-sm">{label}</span>
    </Button>
  )
}