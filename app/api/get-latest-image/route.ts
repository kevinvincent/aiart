import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    console.log('GET /api/get-latest-image - userId:', userId)

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Construct the image URL using the blob storage URL and images/ path
    const imageUrl = `https://7cdwn1fzya4iumzs.public.blob.vercel-storage.com/images/${userId}.png`
    
    console.log('Constructed image URL for user:', userId, 'URL:', imageUrl)
    
    return NextResponse.json({
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(), // Since we don't have the actual creation time
    })

  } catch (error) {
    console.error('Error getting latest image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
