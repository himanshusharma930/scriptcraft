"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Lightbulb, Video, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { debugLogger, DEBUG_LEVELS } from '@/lib/debug-utils'
import { aiService } from "@/lib/ai-service"
import { toast } from "@/components/ui/toast"

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: "Content Ideas" },
  { icon: Video, label: "Script Writing" },
  { icon: Sparkles, label: "Optimization" }
]

export default function AiAssistantPage() {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [networkStatus, setNetworkStatus] = useState('online')

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus('online')
      debugLogger.log(DEBUG_LEVELS.INFO, 'NETWORK', 'Connection restored')
    }

    const handleOffline = () => {
      setNetworkStatus('offline')
      debugLogger.log(DEBUG_LEVELS.WARN, 'NETWORK', 'Connection lost')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleQuickAction = (action) => {
    setInputMessage(`Help me with ${action.toLowerCase()}`)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      setError(null)

      debugLogger.log(DEBUG_LEVELS.INFO, 'USER_ACTION', 'Sending message', {
        content: inputMessage
      })

      // Add user message
      const userMessage = { content: inputMessage, type: 'user' }
      setMessages(prev => [...prev, userMessage])
      setInputMessage("")

      // Check network status
      if (networkStatus === 'offline') {
        throw new Error('No internet connection')
      }

      const response = await aiService.sendMessage(inputMessage)

      if (response.choices && response.choices[0]?.message) {
        setMessages(prev => [...prev, {
          content: response.choices[0].message.content,
          type: 'assistant'
        }])

        debugLogger.log(DEBUG_LEVELS.INFO, 'MESSAGE', 'AI response received', {
          response: response.choices[0].message.content
        })
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      debugLogger.log(DEBUG_LEVELS.ERROR, 'MESSAGE_ERROR', 'Failed to send message', {
        error: error.message,
        stack: error.stack
      })

      setError(error.message)
      toast({
        title: "Error",
        description: error.message || "Failed to get AI response",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#F8F8FA] dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#F8F8FA] dark:bg-gray-950">
        <div className="flex items-center px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            className="mr-3"
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
              <h1 className="text-lg font-semibold">YouTube Assistant</h1>
              <p className="text-sm text-gray-500">Powered by AI</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_ACTIONS.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="flex-none rounded-full"
                onClick={() => handleQuickAction(action.label)}
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Help Button */}
        <div className="px-4 py-2">
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12"
            onClick={() => handleQuickAction("content ideas")}
          >
            Help me with content ideas
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "mb-4",
              msg.type === 'user' ? 'flex justify-end' : 'flex justify-start'
            )}
          >
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3",
              msg.type === 'user' 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 dark:bg-gray-800"
            )}>
              <p className="text-[15px]">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 px-4 py-4 bg-[#F8F8FA] dark:bg-gray-950 border-t">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message YouTube Assistant..."
            className="rounded-full"
          />
          <Button
            size="icon"
            className="rounded-full bg-blue-500 hover:bg-blue-600"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}