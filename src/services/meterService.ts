import { GoogleAIFileManager } from '@google/generative-ai/server'

export const uploadImage = async (imageBase64: string, displayName: string) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return { error: "GEMINI_API_KEY not found in .env" }
  }

  try {
    const fileManager = new GoogleAIFileManager(apiKey)
    const response = await fileManager.uploadFile(imageBase64, {
      mimeType: "image/jpeg",
      displayName,
    })

    return {
      file: response.file,
      error: null
    }
  } catch (err) {
    return { error: "Erro on upload image: " + err }
  }
}