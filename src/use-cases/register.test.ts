import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

describe('Register Use Case', () => {
  it('should be able to register ', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'emailTest@gmail.com'

    await registerUseCase.execute({
      name: 'Fulano',
      email,
      password: '123456',
    })

    expect(async () => {
      await registerUseCase.execute({
        name: 'Fulano',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlredyExistsError)
  })
})
