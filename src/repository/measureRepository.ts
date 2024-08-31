import { MeasureCreateType, MeasureFindByCustomerCode, MeasureFindByUuid, MeasureUpdateType } from "../@types/measureRepositoryTypes"
import { prismaClient } from "../services/prismaClient"

const findAll = async () => {
  return await prismaClient.measure.findMany()
}

const findByUuid = async (data: MeasureFindByUuid) => {
  return await prismaClient.measure.findUnique({ where: { uuid: data.uuid } })
}

const findByCustomerCode = async (data: MeasureFindByCustomerCode) => {
  return await prismaClient.measure.findFirst({ where: { customer_code: data.customer_code } })
}

const create = async (data: MeasureCreateType) => {
  return await prismaClient.measure.create({ data })
}

const update = async (data: MeasureUpdateType) => {
  return await prismaClient.measure.update({ data, where: { uuid: data.uuid } })
}

export default {
  findAll,
  findByCustomerCode,
  findByUuid,
  create,
  update
}