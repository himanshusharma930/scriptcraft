"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Sparkles, Lightbulb, Video } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { sendChatMessage } from "@/lib/ai-service"

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: "Content Ideas" },
  { icon: Video, label: "Script Writing" }
]

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

  const handleQuickAction = (action) => {
    setInputMessage(`Help me with ${action.toLowerCase()}`)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      
      // Add user message
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: inputMessage 
      }])
      
      const currentMessage = inputMessage
      setInputMessage("")

      // Get AI response
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
    <div className="fixed inset-0 flex flex-col bg-[#000000]">
      {/* Header */}
      <div className="flex-none">
        <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-[#1C1C1E]">
          <div className="flex items-center px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              className="mr-3 text-white hover:bg-white/10"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 
                            flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">YouTube Assistant</h1>
                <p className="text-sm text-gray-400">Powered by AI</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-3">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {QUICK_ACTIONS.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="flex-none rounded-full bg-[#1C1C1E] border-[#2C2C2E] 
                            text-white hover:bg-[#2C2C2E] transition-colors"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="space-y-4 max-w-[85%] mx-auto">
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

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl 
                      border-t border-[#1C1C1E] pb-safe">
        <div className="px-4 py-4 max-w-[85%] mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message YouTube Assistant..."
              className="rounded-full bg-[#1C1C1E] border-[#2C2C2E] text-white 
                        placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500"
            />
            <Button
              size="icon"
              className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent 
                               rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}