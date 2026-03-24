import { UserCreateInput, UserModel as User } from 'generated/prisma/models'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
