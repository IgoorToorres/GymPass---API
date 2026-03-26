import { CheckIn } from 'generated/prisma/client'
import { CheckInUncheckedCreateInput } from 'generated/prisma/models'

export interface CheckInRepository {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
