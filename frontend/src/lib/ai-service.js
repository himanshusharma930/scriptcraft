import axios from 'axios'
import { generateSystemPrompt, generateUserPrompt } from './prompt-engineering'

export class AIService {
  constructor(apiKey) {
    this.api = axios.create({
      baseURL: 'https://codestral.mistral.ai/v1',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    this.conversationMemory = []
  }

  async generateResponse(request, context) {
    const systemPrompt = generateSystemPrompt(context)
    const userPrompt = generateUserPrompt(request, context)

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.conversationMemory,
      { role: 'user', content: userPrompt }
    ]

    try {
      const response = await this.api.post('/chat/completions', {
        model: 'codestral/codestral-latest',
        messages,
        temperature: context.creativity || 0.7,
        max_tokens: 1000,
        stream: true
      })

      // Update conversation memory
      this.conversationMemory.push(
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: response.data.choices[0].message.content }
      )

      // Maintain memory size
      if (this.conversationMemory.length > 10) {
        this.conversationMemory = this.conversationMemory.slice(-10)
      }

      return response.data
    } catch (error) {
      console.error('AI response generation error:', error)
      throw error
    }
  }

  async generateContentSuggestions(content, type) {
    const context = {
      type,
      goals: ['Improve engagement', 'Optimize for algorithm'],
      experienceLevel: 'intermediate',
      contentType: 'youtube_video',
      focusAreas: ['hook', 'structure', 'engagement']
    }

    const prompt = generateUserPrompt(content, context)

    try {
      const response = await this.api.post('/fim/completions', {
        model: 'codestral/codestral-latest',
        prompt,
        temperature: 0.8,
        max_tokens: 500
      })

      return response.data
    } catch (error) {
      console.error('Content suggestions error:', error)
      throw error
    }
  }
}

export const aiService = new AIService('Vss1soC3SsvEHFHZC02VKpRkiWsUevxl')

export const CONTENT_PROMPTS = {
  scriptWriting: "Create a YouTube script outline for:",
  thumbnailIdeas: "Generate thumbnail ideas for:",
  titleSuggestions: "Suggest engaging titles for:",
  hookWriting: "Write an attention-grabbing hook for:",
  seoOptimization: "Provide SEO optimization suggestions for:"
}