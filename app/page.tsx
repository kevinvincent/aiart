'use client'

import { useState, useEffect } from 'react'
import ImageGenerator from './components/ImageGenerator'

export default function Home() {
  const [userId, setUserId] = useState<string>('')

  // Generate a unique user ID on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('aiart_user_id')
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('aiart_user_id', newUserId)
      setUserId(newUserId)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Art Generator</h1>
          <p className="text-gray-600">Create stunning AI-generated images with OpenAI</p>
        </div>
        
        <ImageGenerator userId={userId} />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Want to view your images?</p>
          <a 
            href={`/display?userId=${userId}`}
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            View Images
          </a>
        </div>
      </div>
    </main>
  )
}
