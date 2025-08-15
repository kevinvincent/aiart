import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { put } from '@vercel/blob'

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

// Known valid user IDs
const knownUserIds = ['kevinv', 'aurorag']

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json()

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: 'Prompt and userId are required' },
        { status: 400 }
      )
    }

    // Validate the user ID
    if (!knownUserIds.includes(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID. Only known users can generate images.' },
        { status: 401 }
      )
    }

    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Generate image using OpenAI
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    })

    const imageUrl = response.data?.[0]?.url
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    // Download the image
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()

    // Upload to Vercel Blob with predictable path
    const filename = `images/${userId}.png`
    const { url } = await put(filename, imageBuffer, {
      access: 'public',
      allowOverwrite: true,
    })

    // Store metadata for later retrieval
    console.log('Image uploaded for user:', userId, 'URL:', url)

    return NextResponse.json({
      imageUrl: url,
      prompt,
      userId,
    })

  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
