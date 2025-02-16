import axios from 'axios'

class AIService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://167.71.198.52:15432',
      headers: {
        'Authorization': 'Bearer anything',
        'Content-Type': 'application/json',
      },
      timeout: 30000
    })
  }

  async sendMessage(content) {
    try {
      console.log('Sending request:', {
        url: '/chat/completions',
        content
      })

      const response = await this.api.post('/chat/completions', {
        model: 'o1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful YouTube content creation assistant. Help users create better content.'
          },
          {
            role: 'user',
            content
          }
        ]
      })

      console.log('Response received:', response.data)
      return response.data
    } catch (error) {
      console.error('API Error:', {
        message: error.message,
        data: error.response?.data,
        status: error.response?.status
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