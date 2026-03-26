import { Gym } from 'generated/prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
