import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shloud be able to validate a checkIn', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test-1',
        description: 'first test',
        phone: '61123123',
        latitude: -15.8665877,
        longitude: -47.9713124,
      })

    const { id } = gym.body.gym

    const checkIn = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -15.8665877,
        userLongitude: -47.9713124,
      })

    const checkInId = await checkIn.body.checkIn.id

    const response = await request(app.server)
      .patch(`/check-ins/${checkInId}/validate`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(204)
  })
})
