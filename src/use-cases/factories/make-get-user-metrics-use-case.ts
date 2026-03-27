import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)

  return getUserMetricsUseCase
}
