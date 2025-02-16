import axios from 'axios'

const CODESTRAL_API_KEY = 'Vss1soC3SsvEHFHZC02VKpRkiWsUevxl'
const BASE_URL = 'https://codestral.mistral.ai/v1'

class AIService {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${CODESTRAL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    })

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error.response?.data || error.message)
        throw new Error(error.response?.data?.error || 'Failed to connect to AI service')
      }
    )
  }

  async chat(messages, options = {}) {
    try {
      const response = await this.api.post('/chat/completions', {
        model: 'codestral/codestral-latest',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful YouTube content creation assistant.'
          },
          ...messages
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        stream: options.stream || false
      })

      return response.data
    } catch (error) {
      console.error('Chat completion error:', error)
      throw error
    }
  }

  async generateSuggestions(prompt, type) {
    try {
      const response = await this.api.post('/fim/completions', {
        model: 'codestral/codestral-latest',
        prompt,
        temperature: 0.8,
        max_tokens: 500,
        stream: false
      })

      return response.data
    } catch (error) {
      console.error('Suggestion generation error:', error)
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