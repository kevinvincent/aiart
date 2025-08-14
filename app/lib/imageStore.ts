// Simple in-memory store for image metadata
// In production, you'd use a database like Vercel KV, PostgreSQL, or similar
// For this demo, we'll use a global variable that persists during the serverless function lifetime

let imageStore: Record<string, { imageUrl: string; createdAt: string }> = {}

export async function storeImageMetadata(userId: string, imageUrl: string) {
  imageStore[userId] = {
    imageUrl,
    createdAt: new Date().toISOString(),
  }
  console.log('Stored image metadata:', { userId, imageUrl, store: imageStore })
}

export async function getImageMetadata(userId: string) {
  const data = imageStore[userId] || null
  console.log('Retrieved image metadata:', { userId, data, store: imageStore })
  return data
}
