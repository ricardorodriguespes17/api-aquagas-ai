import {
  MeasureCreateType,
  MeasureFindByCustomerCode,
  MeasureFindByCustomerCodeAndMonth,
  MeasureFindByUuid,
  MeasureUpdateType
} from "../@types/measureRepositoryTypes"
import { prismaClient } from "../services/prismaClient"

const findAll = async () => {
  return await prismaClient.measure.findMany()
}

const findByUuid = async (data: MeasureFindByUuid) => {
  return await prismaClient.measure.findUnique({ where: { uuid: data.uuid } })
}

const findByCustomerCode = async (data: MeasureFindByCustomerCode) => {
  return await prismaClient.measure.findFirst({
    where: {
      customer_code: data.customer_code
    }
  })
}

const findByCustomerCodeAndMonth = async (data: MeasureFindByCustomerCodeAndMonth) => {
  return await prismaClient.measure.findFirst({
    where: {
      customer_code: data.customer_code,
      AND: [
        {
          datetime: {
            gte: new Date(data.datetime.getFullYear(), data.datetime.getMonth(), 1)
          }
        },
        {
          datetime: {
            lt: new Date(data.datetime.getFullYear(), data.datetime.getMonth() + 1, 1)
          }
        }
      ]
    }
  })
}

const create = async (data: MeasureCreateType) => {
  return await prismaClient.measure.create({ data })
}

const update = async (data: MeasureUpdateType) => {
  return await prismaClient.measure.update({ data, where: { uuid: data.uuid } })
}

export default {
  findAll,
  findByUuid,
  findByCustomerCode,
  findByCustomerCodeAndMonth,
  create,
  update
}