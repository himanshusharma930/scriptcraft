"use client"

import { useState, useRef, useEffect } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Send, Sparkles, Settings } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { QuickActions } from "./quick-actions"
import { aiService } from "@/lib/ai-service"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function AiAssistantSheet({ open, onOpenChange }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('o1-mini')
  const scrollRef = useRef(null)
  const { toast } = useToast()

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      
      // Add user message
      const userMessage = { role: 'user', content: inputMessage }
      setMessages(prev => [...prev, userMessage])
      setInputMessage("")

      // Get AI response
      const response = await aiService.chat([...messages, userMessage], selectedModel)
      
      if (response.choices && response.choices[0]?.message) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.choices[0].message.content
        }])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive"
      })
      
      // Remove the last user message if there was an error
      setMessages(prev => prev.slice(0, -1))
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
        className={cn(
          "px-0 pt-0 pb-0 h-[85vh] rounded-t-[32px] border-t-0",
          "bg-brand-light-bg dark:bg-brand-dark-bg"
        )}
      >
        <SheetTitle className="sr-only">AI Assistant</SheetTitle>

        {/* Header with Model Selection */}
        <div className="sticky top-0 z-50 px-6 pt-3 pb-4 
                       bg-brand-light-bg dark:bg-brand-dark-bg 
                       border-b border-brand-light-border dark:border-brand-dark-border">
          <div className="w-[36px] h-[5px] bg-brand-gray-100 dark:bg-brand-dark-secondary 
                         rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
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
            
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aiService.getAvailableModels().map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea 
          ref={scrollRef}
          className="h-[calc(85vh-180px)] px-6 py-4"
        >
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble 
                key={i}
                message={msg}
                isLoading={isLoading && i === messages.length - 1}
              />
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
              className={cn(
                "h-10 px-4",
                "bg-brand-gray-100 dark:bg-brand-dark-secondary",
                "border-0 rounded-2xl",
                "placeholder:text-brand-gray-300 dark:placeholder:text-brand-gray-dark",
                "focus-visible:ring-2 focus-visible:ring-brand-blue-start dark:focus-visible:ring-brand-blue-dark"
              )}
            />
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={cn(
                "h-10 w-10 rounded-full",
                "bg-brand-blue-start dark:bg-brand-blue-dark",
                "hover:bg-brand-blue-start/90 dark:hover:bg-brand-blue-dark/90",
                "disabled:opacity-50",
                "transition-all duration-200"
              )}
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