"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { QuickActions } from "@/components/quick-actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sendChatMessage } from "@/lib/ai-service"

const AssistantAvatar = () => (
  <div className="relative group">
    {/* Glow Effect */}
    <div className="absolute -inset-[2px] rounded-full 
                    bg-gradient-to-r from-blue-500/40 to-blue-600/40 
                    blur-md opacity-0 group-hover:opacity-100
                    transition-opacity duration-300" />
    
    {/* Avatar Container */}
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full 
                      bg-gradient-to-br from-blue-500 to-blue-600" />
      <div className="absolute inset-[1px] rounded-full 
                      bg-[hsl(var(--ios-system-background))]
                      flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
      </div>
    </div>
  </div>
)

export default function AiAssistantPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickAction = (action) => {
    setInputMessage(`Help me with ${action.toLowerCase()}`)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: inputMessage 
      }])
      
      const currentMessage = inputMessage
      setInputMessage("")

      const response = await sendChatMessage(currentMessage)
      
      if (response.choices && response.choices[0]?.message) {
        setMessages(prev => [...prev, response.choices[0].message])
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[hsl(var(--ios-system-background))]">
      <div className="relative h-full max-w-2xl mx-auto 
                      bg-[hsl(var(--ios-system-background))]
                      border-x border-[hsl(var(--ios-separator))]">
        {/* Content Container */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex-none">
            <div className="sticky top-0 z-50 
                          bg-[hsl(var(--ios-system-background))]/90 
                          backdrop-blur-xl
                          border-b border-[hsl(var(--ios-separator))]">
              <div className="flex items-center px-4 h-[52px]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-3 text-[hsl(var(--ios-label-primary))] 
                            hover:bg-[hsl(var(--ios-system-fill))]
                            rounded-full transition-colors duration-200"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                
                {/* Assistant Identity */}
                <div className="flex items-center gap-3.5">
                  <AssistantAvatar />
                  <div>
                    <h1 className="text-[17px] font-semibold 
                                 text-[hsl(var(--ios-label-primary))]">
                      YouTube Assistant
                    </h1>
                    <div className="flex items-center gap-1.5">
                      <div className="h-[6px] w-[6px] rounded-full bg-green-500 
                                    animate-pulse" />
                      <p className="text-[13px] text-[hsl(var(--ios-label-secondary))]">
                        AI Assistant
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4">
            <div className="max-w-[85%] mx-auto py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex animate-in fade-in slide-in-from-bottom-2 duration-200",
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    "shadow-sm",
                    msg.role === 'user' 
                      ? "bg-[hsl(var(--ios-blue))] text-white" 
                      : "bg-[hsl(var(--ios-system-fill))] text-[hsl(var(--ios-label-primary))]"
                  )}>
                    <p className="text-[15px] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Enhanced Input Area */}
          <div className="fixed bottom-8 left-0 right-0 max-w-2xl mx-auto">
            {/* Gradient Fade */}
            <div className="h-20 bg-gradient-to-t 
                            from-[hsl(var(--ios-system-background))] 
                            via-[hsl(var(--ios-system-background))] 
                            to-transparent" />
            
            {/* Quick Actions */}
            <div className="bg-[hsl(var(--ios-system-background))]/95 
                            backdrop-blur-xl">
              <QuickActions onSelect={handleQuickAction} />
            </div>

            {/* Message Input */}
            <div className="bg-[hsl(var(--ios-system-background))]/95 
                            backdrop-blur-xl px-4 py-4
                            border-t border-[hsl(var(--ios-separator))]">
              <div className="max-w-[90%] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder="Message YouTube Assistant..."
                      className={cn(
                        "h-[46px] pl-4 pr-12 rounded-2xl",
                        "bg-[hsl(var(--ios-system-fill))]",
                        "border-[hsl(var(--ios-separator))]",
                        "text-[hsl(var(--ios-label-primary))]",
                        "placeholder:text-[hsl(var(--ios-label-secondary))]",
                        "focus:ring-2 focus:ring-[hsl(var(--ios-blue))]",
                        "shadow-sm",
                        "transition-all duration-200"
                      )}
                    />
                    
                    {/* Send Button - Positioned inside input */}
                    <Button
                      size="icon"
                      className={cn(
                        "absolute right-1 top-1/2 -translate-y-1/2",
                        "h-[38px] w-[38px] rounded-full",
                        "transition-all duration-200",
                        inputMessage.trim()
                          ? "bg-[hsl(var(--ios-blue))] text-white"
                          : "bg-[hsl(var(--ios-system-fill))] text-[hsl(var(--ios-label-secondary))]"
                      )}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 border-2 border-current 
                                        border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}