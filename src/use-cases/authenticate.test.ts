import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate ', async () => {
    await usersRepository.create({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'fulano@gmail.com',
      password: '123456',
    })

    expect(user)
    console.log(user)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'Fulano',
      email: 'fulano2@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'fulano@gmail.com',
        password: '123456',
      })
    }).rejects.instanceof(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'fulano@gmail.com',
        password: '1234567',
      })
    }).rejects.instanceof(InvalidCredentialsError)
  })
})
