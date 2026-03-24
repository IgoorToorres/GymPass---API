import type { UserCreateInput } from '@/../generated/prisma/models/User'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
