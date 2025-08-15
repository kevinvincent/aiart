'use client'

import { useState, useEffect } from 'react'

interface ImageViewerProps {
  imageUrl: string
  userId: string
  isLoading: boolean
}

export default function ImageViewer({ imageUrl, userId, isLoading }: ImageViewerProps) {
  const [currentImage, setCurrentImage] = useState<string>('')
  const [imageTimestamp, setImageTimestamp] = useState<number>(0)

  // Update current image when imageUrl prop changes
  useEffect(() => {
    if (imageUrl && imageUrl !== currentImage) {
      setCurrentImage(imageUrl)
      setImageTimestamp(Date.now())
    }
  }, [imageUrl, currentImage])

  // Poll for new images every minute
  useEffect(() => {
    if (!userId) return

    const pollForUpdates = async () => {
      try {
        const response = await fetch(`/api/get-latest-image?userId=${userId}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        if (response.ok) {
          const data = await response.json()
          if (data.imageUrl && data.imageUrl !== currentImage) {
            setCurrentImage(data.imageUrl)
            setImageTimestamp(Date.now())
          }
        }
      } catch (error) {
        console.error('Error polling for updates:', error)
      }
    }

    const interval = setInterval(pollForUpdates, 60000) // Poll every minute
    return () => clearInterval(interval)
  }, [userId, currentImage])

  return (
    <div className="image-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Generating your image...</p>
          </div>
        </div>
      )}
      
      {currentImage && (
        <img
          src={`${currentImage}?t=${imageTimestamp}`}
          alt="Generated"
          className="image"
        />
      )}
      
      {!currentImage && !isLoading && (
        <div className="flex items-center justify-center h-full text-gray-500 text-xl">
          <p>No image generated yet. Use the form to create your first image!</p>
        </div>
      )}
    </div>
  )
}
