import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it.only('should be able to get a user by id ', async () => {
    const { id } = await usersRepository.create({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: id })

    expect(user.id).toEqual(id)
  })

  it.only('should not be able to find a user with wrong id ', async () => {
    expect(async () => {
      await sut.execute({ userId: 'teste-id' })
    }).rejects.instanceOf(ResourceNotFoundError)
  })
})
