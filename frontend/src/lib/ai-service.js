import { debugLogger, DEBUG_LEVELS } from './debug-utils'

class AIService {
  constructor() {
    this.baseUrl = 'http://167.71.198.52:15432'
    this.model = 'o1-mini'
    this.debugLogger = debugLogger
  }

  async sendMessage(content) {
    const requestId = Math.random().toString(36).substring(7)
    
    try {
      this.debugLogger.log(DEBUG_LEVELS.INFO, 'AI_REQUEST', `Starting request ${requestId}`, {
        content,
        model: this.model
      })

      const startTime = performance.now()
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer anything'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful YouTube content creation assistant.'
            },
            {
              role: 'user',
              content
            }
          ]
        })
      })

      const endTime = performance.now()
      const responseTime = endTime - startTime

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      this.debugLogger.log(DEBUG_LEVELS.INFO, 'AI_RESPONSE', `Request ${requestId} completed`, {
        responseTime: `${responseTime.toFixed(2)}ms`,
        status: response.status,
        data
      })

      return data
    } catch (error) {
      this.debugLogger.log(DEBUG_LEVELS.ERROR, 'AI_ERROR', `Request ${requestId} failed`, {
        error: error.message,
        stack: error.stack
      })
      throw error
    }
  }
}

export const aiService = new AIService()

export const CONTENT_PROMPTS = {
  scriptWriting: "Create a YouTube script outline for:",
  thumbnailIdeas: "Generate thumbnail ideas for:",
  titleSuggestions: "Suggest engaging titles for:",
  hookWriting: "Write an attention-grabbing hook for:",
  seoOptimization: "Provide SEO optimization suggestions for:"
}