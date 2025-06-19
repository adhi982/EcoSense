'use client'

import { useState, useRef, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

interface Message {
  role: 'user' | 'assistant'
  content: string
  type?: 'error' | 'success'
}

const SUGGESTED_TOPICS = [
  '🌳 What is a carbon footprint?',
  '🍃 How can I reduce my household emissions?',
  '☀️ What are renewable energy sources?',
  '🌍 Tips for sustainable living',
  '🔬 Understanding climate change',
  '🌡️ What are the environmental conditions in my city?',
  '⚠️ How is the air quality in my area?',
  '💧 What are the water quality issues in my region?'
]

export default function ClimateMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hello! I\'m your AI Climate Mentor, here to help you explore climate change, carbon footprints, renewable energy, and sustainable living. Ask me anything about our planet! 🌎🌱',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      if (data.error) {
        setMessages(prev => [...prev, { 
          role: 'assistant',
          content: data.error,
          type: 'error'
        }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant',
          content: data.response,
          type: 'success'
        }])
      }
    } catch (error) {
      toast.error('Failed to get response. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTopicClick = (topic: string) => {
    // Remove leading emoji and space before setting input
    // Simple check for common starting emojis
    let cleanedTopic = topic;
    const emojiMatch = topic.match(/^(\S+)\s/);
    if (emojiMatch && emojiMatch[1] && SUGGESTED_TOPICS.some(t => t.startsWith(emojiMatch[1])) ) {
        cleanedTopic = topic.substring(emojiMatch[0].length);
    }

    if (cleanedTopic.includes('my city') || cleanedTopic.includes('my area') || cleanedTopic.includes('my region')) {
      setInput('What are the environmental conditions in [Your City]?')
    } else {
      setInput(cleanedTopic)
    }
  }

  const formatMessage = (content: string) => {
    // Split content into lines and format bullet points and section headers
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return <div key={index} className="ml-4 text-gray-700">{line}</div>
      }
      // Add special styling for section headers
      if (line.startsWith('🌡️') || line.startsWith('⚠️') || line.startsWith('💡') || line.startsWith('✨') || line.startsWith('🌫️') || line.startsWith('💧')) {
        return <div key={index} className="font-semibold mt-2 text-green-800">{line}</div>
      }
      return <div key={index} className="text-gray-700">{line}</div>
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans h-screen flex flex-col">
      <Toaster />
      <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl shadow-lg overflow-hidden flex flex-col flex-1">
        
        {/* Header */}
        <div className="bg-green-100 p-4 sm:p-6 border-b border-green-200 flex items-center">
          <span className="text-3xl sm:text-4xl mr-3">🌍</span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">AI Climate Mentor</h2>
            <p className="text-xs sm:text-sm text-green-700 mt-1">
              Ask me anything about climate, carbon, and saving our beautiful planet!
            </p>
          </div>
        </div>
        
        {/* Suggested Topics */}
        <div className="p-4 sm:p-6 border-b border-green-200 overflow-x-auto">
          <h3 className="text-sm font-medium text-green-800 mb-3">Suggested Topics:</h3>
          <div className="flex gap-3 pb-2">
            {SUGGESTED_TOPICS.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="flex-shrink-0 text-sm bg-white bg-opacity-70 text-green-700 px-4 py-2 rounded-full hover:bg-green-50 transition-colors shadow-sm border border-green-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-4 shadow-md overflow-hidden word-break ${
                  message.role === 'user'
                    ? 'bg-green-600 text-white rounded-br-none'
                    : message.type === 'error'
                    ? 'bg-red-100 text-red-800 border border-red-300 rounded-tl-none'
                    : 'bg-white text-gray-800 border border-green-100 rounded-tl-none'
                }`}
              >
                {message.role === 'assistant' ? formatMessage(message.content) : message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 rounded-xl p-4 border border-green-200 shadow-md rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-150" />
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 border-t border-green-200 bg-green-50 flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about climate or environment..."
            className="flex-1 input-field bg-white bg-opacity-80 border border-green-200 focus:ring-green-500 focus:border-green-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn-primary bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Sending... 🌱' : 'Send 🌍'}
          </button>
        </form>
      </div>
    </div>
  )
} 