import axios from 'axios'
import { debugLogger, DEBUG_LEVELS } from './debug-utils'

const api = axios.create({
  baseURL: 'http://167.71.198.52:15432',
  headers: {
    'Authorization': 'Bearer anything',
    'Content-Type': 'application/json'
  }
})

export async function sendMessage(content) {
  const requestId = Math.random().toString(36).substring(7)
  
  try {
    debugLogger.log(DEBUG_LEVELS.INFO, 'AI_REQUEST', `Starting request ${requestId}`, {
      content,
      model: 'o1-mini'
    })

    const startTime = performance.now()

    const response = await api.post('/chat/completions', {
      model: 'o1-mini',
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

    const endTime = performance.now()
    const responseTime = endTime - startTime

    debugLogger.log(DEBUG_LEVELS.INFO, 'AI_RESPONSE', `Request ${requestId} completed`, {
      responseTime: `${responseTime.toFixed(2)}ms`,
      status: response.status,
      data: response.data
    })

    return response.data
  } catch (error) {
    debugLogger.log(DEBUG_LEVELS.ERROR, 'AI_ERROR', `Request ${requestId} failed`, {
      error: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const CONTENT_PROMPTS = {
  scriptWriting: "Create a YouTube script outline for:",
  thumbnailIdeas: "Generate thumbnail ideas for:",
  titleSuggestions: "Suggest engaging titles for:",
  hookWriting: "Write an attention-grabbing hook for:",
  seoOptimization: "Provide SEO optimization suggestions for:"
}