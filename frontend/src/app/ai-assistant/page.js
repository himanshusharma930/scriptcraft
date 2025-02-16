"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { QuickActions } from "@/components/quick-actions"
import { sendChatMessage } from "@/lib/ai-service"

export default function AiAssistantPage() {
  const router = useRouter()
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
    <div className="fixed inset-0 flex flex-col bg-black">
      {/* Enhanced Header */}
      <div className="flex-none">
        <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl">
          <div className="flex items-center px-4 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 text-white hover:bg-white/10 rounded-full 
                        transition-colors duration-200"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            {/* Enhanced AI Assistant Identity */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 
                              rounded-full blur-md opacity-75 group-hover:opacity-100 
                              transition-opacity duration-200" />
                <div className="relative h-11 w-11 rounded-full bg-gradient-to-r 
                              from-blue-500 to-blue-600 p-[2px]">
                  <div className="h-full w-full rounded-full bg-black flex items-center 
                                justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-white tracking-tight">
                  YouTube Assistant
                </h1>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm text-gray-400">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages with increased bottom padding */}
      <div className="flex-1 overflow-y-auto pb-40">
        <div className="max-w-[85%] mx-auto py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex animate-in fade-in slide-in-from-bottom-2",
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                msg.role === 'user' 
                  ? "bg-blue-500 text-white" 
                  : "bg-[#1C1C1E] text-white"
              )}>
                <p className="text-[15px] leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Lifted Input Area */}
      <div className="fixed bottom-8 left-0 right-0">
        {/* Quick Actions with gradient fade */}
        <div className="bg-gradient-to-t from-black via-black/95 to-transparent pt-16">
          <QuickActions 
            onSelect={(action) => setInputMessage(`Help me with ${action.toLowerCase()}`)}
          />
        </div>

        {/* Enhanced Message Input */}
        <div className="bg-black/95 backdrop-blur-xl px-4 py-4 
                       border-t border-[#1C1C1E]">
          <div className="max-w-[85%] mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message YouTube Assistant..."
                  className="h-[50px] pl-4 pr-12 rounded-2xl bg-[#1C1C1E] 
                            border-[#2C2C2E] text-white placeholder:text-gray-500
                            focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <Button
                size="icon"
                className={cn(
                  "h-[50px] w-[50px] rounded-full transition-all duration-200",
                  inputMessage.trim()
                    ? "bg-blue-500 hover:bg-blue-600 shadow-lg"
                    : "bg-[#1C1C1E] text-gray-500"
                )}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-current border-t-transparent 
                                rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}