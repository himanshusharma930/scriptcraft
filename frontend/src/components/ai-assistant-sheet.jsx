"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { sendMessage } from "@/lib/ai-service"

export function AiAssistantSheet({ open, onOpenChange }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
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
      const response = await sendMessage(currentMessage)
      
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="px-0 pt-0 pb-0 h-[85vh] rounded-t-[32px] border-t-0"
      >
        {/* Header */}
        <div className="sticky top-0 z-50 px-6 pt-3 pb-4 border-b">
          <div className="w-[36px] h-[5px] bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">YouTube Assistant</h3>
              <p className="text-sm text-gray-500">Powered by AI</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  msg.role === 'user' 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100"
                )}>
                  <p className="text-[15px]">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 px-6 py-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message YouTube Assistant..."
              className="rounded-full"
            />
            <Button
              size="icon"
              className="rounded-full"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}