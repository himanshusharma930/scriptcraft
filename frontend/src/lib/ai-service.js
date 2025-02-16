import axios from 'axios'

const api = axios.create({
  baseURL: 'https://codestral.mistral.ai/v1',
  headers: {
    'Authorization': `Bearer Vss1soC3SsvEHFHZC02VKpRkiWsUevxl`,
    'Content-Type': 'application/json'
  }
})

export async function generateChatCompletion(messages) {
  try {
    const response = await api.post('/chat/completions', {
      model: 'codestral/codestral-latest',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true
    })
    return response.data
  } catch (error) {
    console.error('Chat completion error:', error)
    throw error
  }
}

export async function generateContentSuggestions(prompt) {
  try {
    const response = await api.post('/fim/completions', {
      model: 'codestral/codestral-latest',
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 500
    })
    return response.data
  } catch (error) {
    console.error('Content suggestions error:', error)
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