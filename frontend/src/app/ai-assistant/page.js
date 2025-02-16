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
    <div className="fixed inset-0 bg-[hsl(var(--ios-background))]">
      <div className="relative h-full max-w-2xl mx-auto 
                      bg-[hsl(var(--ios-card))] 
                      shadow-[0_0_0_1px_rgba(var(--ios-border),0.05)]">
        {/* Subtle System Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b 
                       from-primary/[0.03] to-transparent" />

        <div className="relative h-full flex flex-col">
          {/* iOS Header */}
          <div className="flex-none">
            <div className="sticky top-0 z-50 
                          bg-[hsl(var(--ios-card))]/90 backdrop-blur-xl 
                          border-b border-[hsl(var(--ios-border))]">
              <div className="flex items-center justify-between px-4 h-[52px]">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-full text-white/90 hover:text-white
                              hover:bg-white/10 transition-colors duration-200"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  
                  {/* Enhanced Assistant Identity */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-br 
                                    from-blue-500 to-blue-600 rounded-full blur-md 
                                    opacity-70" />
                      <div className="relative h-10 w-10 rounded-full 
                                    bg-gradient-to-br from-blue-500 to-blue-600 p-[1.5px]">
                        <div className="h-full w-full rounded-full bg-[hsl(var(--ios-card))] 
                                      flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-[17px] font-semibold text-white/90">
                        YouTube Assistant
                      </h1>
                      <div className="flex items-center gap-1.5">
                        <div className="h-[6px] w-[6px] rounded-full bg-green-500 
                                      animate-pulse" />
                        <p className="text-[13px] text-white/50">AI Assistant</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
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
                    "shadow-sm backdrop-blur-sm",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-[hsl(var(--ios-secondary))] text-[hsl(var(--ios-text-primary))]"
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
            {/* Quick Actions with iOS-style Gradient */}
            <div className="bg-gradient-to-t from-[hsl(var(--ios-background))] 
                          via-[hsl(var(--ios-background))]/95 
                          to-transparent pt-16">
              <QuickActions 
                onSelect={handleQuickAction}
              />
            </div>

            {/* iOS-style Input */}
            <div className="bg-[hsl(var(--ios-card))]/95 backdrop-blur-xl px-4 py-4 
                           border-t border-[hsl(var(--ios-border))]">
              <div className="max-w-[90%] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Message YouTube Assistant..."
                      className="h-[44px] pl-4 pr-4 rounded-2xl bg-[hsl(var(--ios-secondary))] 
                                border-[hsl(var(--ios-border))] text-[hsl(var(--ios-text-primary))] 
                                placeholder:text-[hsl(var(--ios-text-secondary))]
                                focus:ring-2 focus:ring-primary/50 
                                shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                                transition-all duration-200"
                    />
                  </div>
                  <Button
                    size="icon"
                    className={cn(
                      "h-[44px] w-[44px] rounded-full transition-all duration-200",
                      "shadow-[0_2px_8px_rgba(0,0,0,0.12)]",
                      inputMessage.trim()
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-[hsl(var(--ios-secondary))] text-[hsl(var(--ios-text-secondary))]"
                    )}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-current 
                                    border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}