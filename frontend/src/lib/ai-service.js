import axios from 'axios'

const BASE_URL = 'http://167.71.198.52:15432'
const AVAILABLE_MODELS = ['gpt-4o', 'claude-3.5-sonnet', 'o1', 'o1-mini', 'o3-mini']

class AIService {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': 'Bearer anything',
        'Content-Type': 'application/json',
      },
      // Add CORS headers
      withCredentials: false,
      timeout: 30000
    })

    // Add request interceptor for debugging
    this.api.interceptors.request.use(request => {
      console.log('API Request:', request)
      return request
    })

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => {
        console.log('API Response:', response)
        return response
      },
      error => {
        console.error('API Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        })
        throw new Error(error.response?.data?.error || 'Failed to connect to AI service')
      }
    )
  }

  async chat(messages, model = 'o1-mini') {
    try {
      if (!AVAILABLE_MODELS.includes(model)) {
        throw new Error('Invalid model selected')
      }

      const response = await this.api.post('/chat/completions', {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful YouTube content creation assistant. Provide concise, practical advice for content creators.'
          },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 800
      })

      if (!response.data || !response.data.choices) {
        throw new Error('Invalid response format')
      }

      return response.data
    } catch (error) {
      console.error('Chat completion error:', error)
      throw error
    }
  }

  getAvailableModels() {
    return AVAILABLE_MODELS
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