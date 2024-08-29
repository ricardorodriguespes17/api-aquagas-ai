import { GoogleAIFileManager } from '@google/generative-ai/server'

export const uploadImage = async (imageBase64: string, displayName: string) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env")
    return null
  }

  try {
    const fileManager = new GoogleAIFileManager(apiKey)
    return await fileManager.uploadFile(imageBase64, {
      mimeType: "image/jpeg",
      displayName,
    })
  } catch (err) {
    console.error("Erro on upload image:", err)
    return null
  }
}