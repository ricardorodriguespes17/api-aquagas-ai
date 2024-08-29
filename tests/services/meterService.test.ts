import { uploadImage } from '../../src/services/meterService'

jest.mock('@google/generative-ai/server', () => {
  return {
    GoogleAIFileManager: jest.fn().mockImplementation(() => {
      return {
        uploadFile: jest.fn().mockResolvedValue({
          file: {
            displayName: 'Mock Image',
            uri: 'mock-uri',
          },
        }),
      }
    }),
  }
})

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

describe('uploadImage', () => {
  const mockApiKey = 'mock-api-key'
  const mockImageBase64 = 'mock-base64-string'
  const mockDisplayName = 'Mock Image'

  beforeEach(() => {
    process.env.GEMINI_API_KEY = mockApiKey
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should upload an image and return the response', async () => {
    const response = await uploadImage(mockImageBase64, mockDisplayName)

    expect(response).toEqual({
      file: {
        displayName: mockDisplayName,
        uri: 'mock-uri',
      },
    })
    expect(console.error).toHaveBeenCalledTimes(0)
  })

  it('should return null if GEMINI_API_KEY is not set', async () => {
    delete process.env.GEMINI_API_KEY
    const response = await uploadImage(mockImageBase64, mockDisplayName)

    expect(response).toBeNull()
    expect(console.error).toHaveBeenCalledWith('GEMINI_API_KEY not found in .env')
  })
})