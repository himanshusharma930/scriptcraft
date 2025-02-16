"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Send, Sparkles, ArrowLeft } from "lucide-react"
import { MessageBubble } from "@/components/message-bubble"
import { QuickActions } from "@/components/quick-actions"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { aiService } from "@/lib/ai-service"
import { useToast } from "@/hooks/use-toast"
import { useAIContext } from "@/components/ai-context-provider"

export default function AiAssistantPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)
  const { toast } = useToast()
  const { context, setContext } = useAIContext()

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages])

  const handleSend = async () => {
    if (!message.trim()) return
    
    // Add user message
    const userMessage = { role: 'user', content: message }
    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    try {
      const response = await aiService.generateResponse(message, context)
      
      // Handle streaming response
      let assistantMessage = ""
      for await (const chunk of response) {
        assistantMessage += chunk.choices[0]?.delta?.content || ""
        setMessages(prev => [
          ...prev.slice(0, -1),
          {
            role: 'assistant',
            content: assistantMessage,
            isStreaming: true
          }
        ])
      }

      // Final message
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content: assistantMessage,
          isStreaming: false,
          context: { ...context } // Store context with message
        }
      ])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action) => {
    setMessage(`Help me with ${action.toLowerCase()}`)
  }

  return (
    <div className="fixed inset-0 bg-brand-light-bg dark:bg-brand-dark-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-brand-light-bg/90 dark:bg-brand-dark-bg/90 
                      backdrop-blur-xl border-b 
                      border-brand-light-border dark:border-brand-dark-border">
        <div className="flex items-center px-4 h-14">
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
        <QuickActions onActionSelect={handleQuickAction} />
      </div>

      {/* Messages */}
      <ScrollArea 
        ref={scrollRef}
        className="h-[calc(100vh-130px)]"
      >
        <div className="px-4 py-4 space-y-4">
          {messages.map((msg, i) => (
            <MessageBubble 
              key={i}
              message={msg}
              isStreaming={msg.isStreaming}
              onSuggestionSelect={(suggestion) => setMessage(suggestion)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-light-bg/90 
                      dark:bg-brand-dark-bg/90 backdrop-blur-xl border-t 
                      border-brand-light-border dark:border-brand-dark-border">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full",
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
              disabled={!message.trim() || isTyping}
              className={cn(
                "h-10 w-10 rounded-full",
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