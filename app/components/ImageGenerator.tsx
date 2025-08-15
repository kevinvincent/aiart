'use client'

import { useState } from 'react'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [userId, setUserId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim() || !userId.trim()) return

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
          userId: userId.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate image')
      }

      const data = await response.json()
      
      if (data.imageUrl) {
        setMessage('Image generated successfully!')
        setPrompt('')
        setUserId('') // Clear user ID for security
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
        <div className="mb-3">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="password"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            disabled={isSubmitting}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Image Description
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
            disabled={isSubmitting}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !prompt.trim() || !userId.trim()}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
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
          {message.includes('successfully') && (
            <div className="mt-2">
              <a 
                href="/display"
                className="text-indigo-600 hover:text-indigo-800 underline text-xs"
              >
                View your images
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
