'use client'

import { useState, useEffect, Suspense } from 'react'
import ImageViewer from '../components/ImageViewer'
import { useSearchParams } from 'next/navigation'

function DisplayPageContent() {
  const searchParams = useSearchParams()
  const urlUserId = searchParams.get('userId') || ''
  const [userId, setUserId] = useState<string>('')
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Set userId from URL if provided
  useEffect(() => {
    if (urlUserId) {
      setUserId(urlUserId)
    }
  }, [urlUserId])

  // Fetch the latest image when userId is available
  useEffect(() => {
    if (userId) {
      fetchLatestImage()
    }
  }, [userId])

  const fetchLatestImage = async () => {
    try {
      const response = await fetch(`/api/get-latest-image?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.imageUrl) {
          setCurrentImageUrl(data.imageUrl)
        }
      }
    } catch (error) {
      console.error('Error fetching latest image:', error)
    }
  }

  const handleUserIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userId.trim()) {
      // Update URL without page reload
      window.history.pushState({}, '', `/display?userId=${userId.trim()}`)
    }
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">View Your Images</h1>
          <form onSubmit={handleUserIdSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="displayUserId" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your User ID to view images
              </label>
              <input
                type="password"
                id="displayUserId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your user ID"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Images
            </button>
          </form>
          <div className="mt-4">
            <a href="/" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Generator
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <ImageViewer 
        imageUrl={currentImageUrl} 
        userId={userId}
        isLoading={isLoading}
      />
      
      {/* Floating back button */}
      <div className="absolute top-4 left-4 z-30">
        <a 
          href="/"
          className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
        >
          ← Back to Generator
        </a>
      </div>
    </main>
  )
}

export default function DisplayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <DisplayPageContent />
    </Suspense>
  )
}
