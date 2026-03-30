import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearByGymsUseCase } from '@/use-cases/factories/make-fetch-near-by-gyms-use-case'

export async function nearBy(request: FastifyRequest, reply: FastifyReply) {
  const nearByQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearByQuerySchema.parse(request.query)

  const fetchNearByGyms = makeFetchNearByGymsUseCase()

  const { gyms } = await fetchNearByGyms.execute({
    userLatitude,
    userLongitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
