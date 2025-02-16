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
      {/* Header */}
      <div className="flex-none">
        <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl">
          <div className="flex items-center px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 text-white hover:bg-white/10 rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600
                            flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">YouTube Assistant</h1>
                <p className="text-sm text-gray-400">Powered by AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
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
                "max-w-[85%] rounded-2xl px-4 py-3",
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

      {/* Input Area */}
      <div className="flex-none">
        <div className="fixed bottom-0 left-0 right-0">
          {/* Quick Actions */}
          <div className="bg-gradient-to-t from-black via-black to-transparent pt-16">
            <QuickActions 
              onSelect={(action) => setInputMessage(`Help me with ${action.toLowerCase()}`)}
            />
          </div>

          {/* Message Input */}
          <div className="bg-black/90 backdrop-blur-xl border-t border-[#1C1C1E] pb-safe">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Message YouTube Assistant..."
                    className="h-[46px] pl-4 pr-12 rounded-2xl bg-[#1C1C1E] 
                              border-[#2C2C2E] text-white placeholder:text-gray-500
                              focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  size="icon"
                  className={cn(
                    "h-[46px] w-[46px] rounded-full transition-all duration-200",
                    inputMessage.trim()
                      ? "bg-blue-500 hover:bg-blue-600"
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
    </div>
  )
}