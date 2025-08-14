// Simple in-memory store for image metadata
// In production, you'd use a database like Vercel KV, PostgreSQL, or similar

const imageStore = new Map<string, { imageUrl: string; createdAt: string }>()

export function storeImageMetadata(userId: string, imageUrl: string) {
  imageStore.set(userId, {
    imageUrl,
    createdAt: new Date().toISOString(),
  })
}

export function getImageMetadata(userId: string) {
  return imageStore.get(userId)
}
