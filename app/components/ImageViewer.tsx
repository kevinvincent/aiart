'use client'

import { useState, useEffect } from 'react'

interface ImageViewerProps {
  imageUrl: string
  userId: string
  isLoading: boolean
}

export default function ImageViewer({ imageUrl, userId, isLoading }: ImageViewerProps) {
  const [currentImage, setCurrentImage] = useState<string>('')
  const [previousImage, setPreviousImage] = useState<string>('')
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  // Handle image transitions with fade effect
  useEffect(() => {
    if (imageUrl && imageUrl !== currentImage) {
      setPreviousImage(currentImage)
      setCurrentImage(imageUrl)
      setIsTransitioning(true)
      
      // Trigger fade transition
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }, [imageUrl, currentImage])

  // Poll for new images every 5 seconds
  useEffect(() => {
    if (!userId) return

    const pollForUpdates = async () => {
      try {
        const response = await fetch(`/api/get-latest-image?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.imageUrl && data.imageUrl !== currentImage) {
            setPreviousImage(currentImage)
            setCurrentImage(data.imageUrl)
            setIsTransitioning(true)
            setTimeout(() => {
              setIsTransitioning(false)
            }, 500)
          }
        }
      } catch (error) {
        console.error('Error polling for updates:', error)
      }
    }

    const interval = setInterval(pollForUpdates, 5000)
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
      
      {previousImage && (
        <img
          src={previousImage}
          alt="Previous"
          className={`image ${isTransitioning ? 'fade-out' : 'fade-in'}`}
          style={{ zIndex: 1 }}
        />
      )}
      
      {currentImage && (
        <img
          src={currentImage}
          alt="Current"
          className={`image ${isTransitioning ? 'fade-in' : 'fade-in'}`}
          style={{ zIndex: 2 }}
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
