import request from 'supertest'
import express from 'express'
import { uploadValidation } from '../../src/validations/uploadValidation'

const app = express()
app.use(express.json())
app.post('/upload', uploadValidation, (req, res) => {
  res.status(200).json({ message: 'Request is valid' })
})

describe('POST /upload validations', () => {
  it('should return 400 if image is missing or invalid', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        measure_type: 'WATER',
        customer_code: '12345',
        measure_datetime: '2024-08-29T10:00:00Z'
      })
    expect(response.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(response.body.error_description).toContain('image é obrigatório')
    
    const invalidResponse = await request(app)
      .post('/upload')
      .send({
        image: 'invalidbase64string',
        measure_type: 'WATER',
        customer_code: '12345',
        measure_datetime: '2024-08-29T10:00:00Z'
      })
    expect(invalidResponse.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(invalidResponse.body.error_description).toContain('image não compativel com o padrão base64')
  })

  it('should return 400 if measure_type is missing or invalid', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/jpeg;base64,validbase64string',
        customer_code: '12345',
        measure_datetime: '2024-08-29T10:00:00Z'
      })
    expect(response.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(response.body.error_description).toContain('measure_type é obrigatório')
    
    const invalidResponse = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/jpeg;base64,validbase64string',
        measure_type: 'INVALID_TYPE',
        customer_code: '12345',
        measure_datetime: '2024-08-29T10:00:00Z'
      })
    expect(invalidResponse.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(invalidResponse.body.error_description).toContain('measure_type deve ser \'WATER\' ou \'GAS\'')
  })

  it('should return 400 if customer_code is missing', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/jpeg;base64,validbase64string',
        measure_type: 'WATER',
        measure_datetime: '2024-08-29T10:00:00Z'
      })
    expect(response.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(response.body.error_description).toContain('customer_code é obrigatório')
  })

  it('should return 400 if measure_datetime is missing or invalid', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/jpeg;base64,validbase64string',
        measure_type: 'WATER',
        customer_code: '12345'
      })
    expect(response.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(response.body.error_description).toContain('measure_datetime é obrigatório')

    const invalidResponse = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/jpeg;base64,validbase64string',
        measure_type: 'WATER',
        customer_code: '12345',
        measure_datetime: 'INVALID_DATE'
      })
    expect(invalidResponse.status).toBe(400)
    expect(response.body.error_code).toEqual('INVALID_DATA')
    expect(invalidResponse.body.error_description).toContain('measure_datetime deve ser uma data e hora válida (YYYY-MM-DD)')
  })

  it('should return 200 if all fields are valid', async () => {
    const response = await request(app)
      .post('/upload')
      .send({
        image: 'data:image/jpeg;base64,validbase64string',
        measure_type: 'WATER',
        customer_code: '12345',
        measure_datetime: '2024-08-29T10:00:00Z'
      })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Request is valid')
  })
})
