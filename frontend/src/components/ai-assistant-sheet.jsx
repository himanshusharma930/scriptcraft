"use client"

import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, Send, Sparkles } from "lucide-react"
import { aiService } from "@/lib/ai-service"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function AiAssistantSheet({ open, onOpenChange }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)
  const { toast } = useToast()

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      console.log('Sending message:', inputMessage)

      // Add user message
      const newMessage = { role: 'user', content: inputMessage }
      setMessages(prev => [...prev, newMessage])
      setInputMessage("")

      // Get AI response
      const response = await aiService.sendMessage(inputMessage)
      console.log('AI Response:', response)

      if (response.choices && response.choices[0]?.message) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.choices[0].message.content
        }])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Message error:', error)
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="px-0 pt-0 pb-0 h-[85vh] rounded-t-[32px] border-t-0
                   bg-brand-light-bg dark:bg-brand-dark-bg"
      >
        <SheetTitle className="sr-only">AI Assistant</SheetTitle>

        {/* Header */}
        <div className="sticky top-0 z-50 px-6 pt-3 pb-4 
                       bg-brand-light-bg dark:bg-brand-dark-bg 
                       border-b border-brand-light-border dark:border-brand-dark-border">
          <div className="w-[36px] h-[5px] bg-brand-gray-100 dark:bg-brand-dark-secondary 
                         rounded-full mx-auto mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r 
                          from-brand-blue-start to-brand-blue-end 
                          flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold 
                           text-brand-light-text-primary dark:text-brand-dark-text-primary">
                YouTube Assistant
              </h3>
              <p className="text-[13px] text-brand-gray-300 dark:text-brand-gray-dark">
                Powered by AI
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea 
          ref={scrollRef}
          className="h-[calc(85vh-180px)] px-6 py-4"
        >
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
                    ? "bg-brand-blue-start text-white" 
                    : "bg-brand-gray-100 dark:bg-brand-dark-secondary"
                )}>
                  <p className="text-[15px] leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="sticky bottom-0 px-6 py-4 
                       bg-brand-light-bg dark:bg-brand-dark-bg 
                       border-t border-brand-light-border dark:border-brand-dark-border">
          <div className="flex items-center gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Message YouTube Assistant..."
              disabled={isLoading}
              className="h-10 px-4 bg-brand-gray-100 dark:bg-brand-dark-secondary
                        border-0 rounded-2xl"
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="h-10 w-10 rounded-full bg-brand-blue-start dark:bg-brand-blue-dark"
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
      </SheetContent>
    </Sheet>
  )
}