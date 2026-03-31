import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shloud be able to create a checkIn', async () => {
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

    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -15.8665877,
        userLongitude: -47.9713124,
      })

    expect(response.statusCode).toEqual(201)
  })
})
