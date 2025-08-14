import { writeFile, readFile, access } from 'fs/promises'
import { join } from 'path'

const STORAGE_FILE = join(process.cwd(), 'data', 'image-store.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await access(join(process.cwd(), 'data'))
  } catch {
    // Directory doesn't exist, create it
    const { mkdir } = await import('fs/promises')
    await mkdir(join(process.cwd(), 'data'), { recursive: true })
  }
}

// Read the current storage
async function readStorage() {
  try {
    await ensureDataDir()
    const data = await readFile(STORAGE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    // File doesn't exist or is invalid, return empty store
    return {}
  }
}

// Write to storage
async function writeStorage(data: any) {
  await ensureDataDir()
  await writeFile(STORAGE_FILE, JSON.stringify(data, null, 2))
}

export async function storeImageMetadata(userId: string, imageUrl: string) {
  const storage = await readStorage()
  storage[userId] = {
    imageUrl,
    createdAt: new Date().toISOString(),
  }
  await writeStorage(storage)
}

export async function getImageMetadata(userId: string) {
  const storage = await readStorage()
  return storage[userId] || null
}
