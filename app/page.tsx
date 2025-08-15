'use client'

import ImageGenerator from './components/ImageGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Art Generator</h1>
          <p className="text-gray-600">Create stunning AI-generated images with OpenAI</p>
        </div>
        
        <ImageGenerator />
      </div>
    </main>
  )
}

