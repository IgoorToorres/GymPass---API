import { Gym } from 'generated/prisma/client'
import { GymCreateInput } from 'generated/prisma/models'

export interface findManyNearByParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: findManyNearByParams): Promise<Gym[]>
}
