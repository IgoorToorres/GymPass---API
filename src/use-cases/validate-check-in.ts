import { CheckInRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from 'generated/prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseReponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseReponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    checkIn.validated_at = new Date()
    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
