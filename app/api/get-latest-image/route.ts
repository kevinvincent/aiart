import { NextRequest, NextResponse } from 'next/server'
import { getImageMetadata } from '../../lib/imageStore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Get the latest image for this user
    const userImage = getImageMetadata(userId)
    
    if (!userImage) {
      return NextResponse.json(
        { error: 'No image found for this user' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      imageUrl: userImage.imageUrl,
      createdAt: userImage.createdAt,
    })

  } catch (error) {
    console.error('Error getting latest image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
