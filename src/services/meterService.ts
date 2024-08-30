import { GenerationConfig, GenerativeContentBlob, GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const genModel = "gemini-1.5-flash"
const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      measure: {
        type: SchemaType.NUMBER
      }
    }
  },
};

export const generateContent = async (imageBase64: string, meterType: "WATER" | "GAS") => {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not found in .env")
  }

  const imageData = imageBase64.replace("data:image/png;base64,", "")
  const prompt = `Analyze the attached image and extract the numerical reading displayed on the meter. The meter is for ${meterType}`
  const inlineData: GenerativeContentBlob = {
    mimeType: "image/png",
    data: imageData
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: genModel, generationConfig })
  const result = await model.generateContent([{ inlineData }, prompt])

  return result.response.text()
}