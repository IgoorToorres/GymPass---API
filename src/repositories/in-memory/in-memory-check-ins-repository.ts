import { CheckInUncheckedCreateInput } from 'generated/prisma/models'
import { CheckInRepository } from '../check-ins-repository'
import { CheckIn } from 'generated/prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      gym_id: data.gym_id,
      user_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }
}
