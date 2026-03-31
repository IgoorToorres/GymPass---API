import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('History Check-ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shloud be able to get a check-ins history', async () => {
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

    await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -15.8665877,
        userLongitude: -47.9713124,
      })

    const user = await prisma.user.findFirstOrThrow()

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .query({
        userId: user.id,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).length(1)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        user_id: user.id,
      }),
    ])
  })
})
