import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get count check-ins', async () => {
    await checkInRepository.create({
      gym_id: `academia-1`,
      user_id: 'usuario-1',
    })

    await checkInRepository.create({
      gym_id: `academia-2`,
      user_id: 'usuario-1',
    })

    const { checkInsCount } = await sut.execute({ userId: 'usuario-1' })

    expect(checkInsCount).toEqual(2)
  })
})
