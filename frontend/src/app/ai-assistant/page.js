"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send, Sparkles, ArrowLeft, Image, Link, Video } from "lucide-react"
import { MessageBubble } from "@/components/message-bubble"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const INITIAL_MESSAGE = {
  type: 'assistant',
  content: "Hello! I'm your YouTube content assistant. How can I help you create amazing videos today?",
  showSuggestions: true
}

export default function AiAssistantPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [isRecording, setIsRecording] = useState(false)
  const scrollRef = useRef(null)

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages])

  const handleSend = async () => {
    if (!message.trim()) return
    
    setMessages(prev => [...prev, { type: 'user', content: message }])
    setMessage("")
    
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
    <div className="fixed inset-0 bg-brand-light-bg dark:bg-brand-dark-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-brand-light-bg/90 dark:bg-brand-dark-bg/90 
                      backdrop-blur-xl border-b 
                      border-brand-light-border dark:border-brand-dark-border">
        <div className="flex items-center px-4 h-14 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-3 h-10 w-10 rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r 
                          from-brand-blue-start to-brand-blue-end 
                          flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-[17px] font-semibold 
                           text-brand-light-text-primary dark:text-brand-dark-text-primary">
                YouTube Assistant
              </h1>
              <p className="text-[13px] text-brand-gray-300 dark:text-brand-gray-dark">
                Powered by AI
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <QuickAction icon={<Image />} label="Thumbnail" />
            <QuickAction icon={<Video />} label="Script" />
            <QuickAction icon={<Link />} label="Research" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="h-[calc(100vh-180px)] overflow-y-auto px-4 py-4"
      >
        <div className="space-y-4 max-w-md mx-auto">
          {messages.map((msg, i) => (
            <MessageBubble 
              key={i}
              message={msg}
              onSuggestionSelect={(suggestion) => setMessage(suggestion)}
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-light-bg/90 
                      dark:bg-brand-dark-bg/90 backdrop-blur-xl border-t 
                      border-brand-light-border dark:border-brand-dark-border">
        <div className="max-w-md mx-auto px-4 py-4">
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
      </div>
    </div>
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