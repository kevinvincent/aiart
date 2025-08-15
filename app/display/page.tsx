'use client'

import { useState, useEffect, Suspense } from 'react'
import ImageViewer from '../components/ImageViewer'
import { useSearchParams } from 'next/navigation'

function DisplayPageContent() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // If no userId provided, redirect to home
  useEffect(() => {
    if (!userId) {
      window.location.href = '/'
    }
  }, [userId])

  // Fetch the latest image on component mount
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

  const handleImageGenerated = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl)
  }

  const handleGenerationStart = () => {
    setIsLoading(true)
  }

  const handleGenerationComplete = () => {
    setIsLoading(false)
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No User ID Provided</h1>
          <a href="/" className="text-indigo-600 hover:text-indigo-800">
            Go back to home
          </a>
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
      
      {/* User ID display */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-white bg-opacity-90 px-3 py-1 rounded-lg text-sm text-gray-600 backdrop-blur-sm">
          User: {userId}
        </div>
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
