import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym use case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register a gym ', async () => {
    const { gym } = await sut.execute({
      title: 'academia teste',
      description: null,
      phone: null,
      latitude: -15.8665877,
      longitude: -47.9713124,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
