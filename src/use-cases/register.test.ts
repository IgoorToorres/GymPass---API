import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register ', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'emailTest@gmail.com'

    await sut.execute({
      name: 'Fulano',
      email,
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Fulano',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlredyExistsError)
  })
})
