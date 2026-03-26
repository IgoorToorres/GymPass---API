import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch user check-in history use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInRepository.create({
      gym_id: 'academia-1',
      user_id: 'usuario-1',
    })

    await checkInRepository.create({
      gym_id: 'academia-2',
      user_id: 'usuario-1',
    })

    const { checkIns } = await sut.execute({ userId: 'usuario-1', page: 1 })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'academia-1' }),
      expect.objectContaining({ gym_id: 'academia-2' }),
    ])
  })

  it('should be able to fetch check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `academia-${i}`,
        user_id: 'usuario-1',
      })
    }

    const { checkIns } = await sut.execute({ userId: 'usuario-1', page: 2 })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'academia-21' }),
      expect.objectContaining({ gym_id: 'academia-22' }),
    ])
  })
})
