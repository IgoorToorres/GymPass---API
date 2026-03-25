import { UserCreateInput, UserModel as User } from 'generated/prisma/models'

export interface UsersRepository {
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
