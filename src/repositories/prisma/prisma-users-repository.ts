import type {
  UserCreateInput,
  UserModel,
} from '@/../generated/prisma/models/User'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  findById(userId: string): Promise<UserModel | null> {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
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
