import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'academia gold 1',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
    await gymRepository.create({
      title: 'academia gold 2',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
    await gymRepository.create({
      title: 'academia teste',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    const { gyms } = await sut.execute({
      page: 1,
      query: 'gold',
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'academia gold 1' }),
      expect.objectContaining({ title: 'academia gold 2' }),
    ])
  })

  it('should be able to fetch pagination gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `gold academia ${i}`,
        latitude: new Decimal(0),
        longitude: new Decimal(0),
      })
    }

    const { gyms } = await sut.execute({
      page: 2,
      query: 'gold',
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gold academia 21' }),
      expect.objectContaining({ title: 'gold academia 22' }),
    ])
  })
})
