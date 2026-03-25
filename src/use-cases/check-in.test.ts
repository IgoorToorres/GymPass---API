import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Create Check-in', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it.only('should be able to create a check-ind ', async () => {
    const { checkIn } = await sut.execute({
      gymId: '123',
      userId: '123',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
