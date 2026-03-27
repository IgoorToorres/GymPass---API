import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )

  try {
    const checkInUseCase = makeCheckInUseCase()

    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude,
      userLongitude,
    })

    return reply.status(201).send({ checkIn })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof MaxDistanceError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof MaxNumberOfCheckInsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
