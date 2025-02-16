import axios from 'axios'

const api = axios.create({
  baseURL: 'http://167.71.198.52:15432',
  headers: {
    'Authorization': 'Bearer anything',
    'Content-Type': 'application/json'
  }
})

export async function sendChatMessage(message) {
  try {
    const response = await api.post('/chat/completions', {
      model: 'o1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful YouTube content creation assistant.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    })
    return response.data
  } catch (error) {
    console.error('Chat error:', error)
    throw error
  }
}