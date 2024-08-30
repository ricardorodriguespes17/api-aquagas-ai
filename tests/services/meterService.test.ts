import { generateContent } from '../../src/services/meterService'
import { GoogleGenerativeAI } from '@google/generative-ai'

jest.mock('@google/generative-ai')

describe('generateContent', () => {
  const apiKey = 'test-api-key'
  process.env.GEMINI_API_KEY = apiKey

  const mockGenerateContent = jest.fn()

  beforeEach(() => {
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerateContent,
      }),
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call generateContent with correct parameters', async () => {
    const imageBase64 = 'data:image/png;base64,test'
    const meterType = 'WATER'
    const prompt = `Analyze the attached image and extract the numerical reading displayed on the meter. The meter is for ${meterType}`
    const inlineData = {
      mimeType: 'image/png',
      data: imageBase64.replace('data:image/png;base64,', ''),
    }

    mockGenerateContent.mockResolvedValue({ response: { text: () => '123' } })

    const result = await generateContent(imageBase64, meterType)

    expect(result).toBe('123')
    expect(GoogleGenerativeAI).toHaveBeenCalledWith(apiKey)
    expect(mockGenerateContent).toHaveBeenCalledWith([{ inlineData }, prompt])
  })

  it('should handle model errors gracefully', async () => {
    const imageBase64 = 'data:image/png;base64,test'
    const meterType = 'GAS'

    mockGenerateContent.mockRejectedValue(new Error('Model error'))

    await expect(generateContent(imageBase64, meterType))
      .rejects
      .toThrow('Model error')
  })

  it('should throw an error if API key is missing', async () => {
    delete process.env.GEMINI_API_KEY

    await expect(generateContent('data:image/png;base64,test', 'WATER'))
      .rejects
      .toThrow('GEMINI_API_KEY not found in .env')
  })
})
