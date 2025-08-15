'use client'

import { useState } from 'react'

interface ImageGeneratorProps {
  userId: string
}

export default function ImageGenerator({ userId }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [key, setKey] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim() || !userId || !key.trim()) return

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          userId: userId,
          key: key.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      const data = await response.json()
      
      if (data.imageUrl) {
        setMessage('Image generated successfully! Click "View Images" to see it.')
        setPrompt('')
      }
    } catch (error) {
      console.error('Error generating image:', error)
      setMessage('Failed to generate image. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Generate New Image</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          rows={3}
          disabled={isSubmitting}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter your key..."
          disabled={isSubmitting}
          required
          className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isSubmitting || !prompt.trim() || !key.trim()}
          className="w-full mt-3 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        User ID: {userId}
      </div>
    </div>
  )
}
