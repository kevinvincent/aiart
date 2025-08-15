import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'
import { storeImageMetadata } from '../../lib/imageStore'

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId, key } = await request.json()

    if (!prompt || !userId || !key) {
      return NextResponse.json(
        { error: 'Prompt, userId, and key are required' },
        { status: 400 }
      )
    }

    // Validate the key
    if (key !== 'TEST_KEY') {
      return NextResponse.json(
        { error: 'Invalid key' },
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

    // Upload to Vercel Blob
    const filename = `${userId}_${uuidv4()}.png`
    const blob = await put(filename, imageBuffer, {
      access: 'public',
      addRandomSuffix: false,
    })

    // Store metadata for later retrieval
    console.log('Storing image metadata for user:', userId, 'URL:', blob.url)
    await storeImageMetadata(userId, blob.url)

    return NextResponse.json({
      imageUrl: blob.url,
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
