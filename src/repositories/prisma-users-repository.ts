import type { UserCreateInput } from '@/../generated/prisma/models/User'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
