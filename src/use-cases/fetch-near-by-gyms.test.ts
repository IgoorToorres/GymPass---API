import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchNearByGymsUseCase } from './fetch-near-by-gyms'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch near by Gyms use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'far gym',
      latitude: new Decimal(-15.6887474),
      longitude: new Decimal(-47.7044456),
    })
    await gymRepository.create({
      title: 'near gym',
      latitude: -15.8665877,
      longitude: -47.9713124,
    })

    const { gyms } = await sut.execute({
      userLatitude: -15.8665877,
      userLongitude: -47.9713124,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})
