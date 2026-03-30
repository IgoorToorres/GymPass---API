import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search near by Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shloud be able to search a nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia perto',
        description: 'first test',
        phone: '61123123',
        latitude: -15.8671201,
        longitude: -47.9719421,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia longe',
        description: 'first test',
        phone: '61123123',
        latitude: -47.9409609,
        longitude: -15.7719377,
      })

    const gyms = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLatitude: -15.8723022,
        userLongitude: -47.9750859,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(gyms.statusCode).toEqual(200)
    expect(gyms.body.gyms).toHaveLength(1)
    expect(gyms.body.gyms).toEqual([
      expect.objectContaining({
        title: 'academia perto',
      }),
    ])
  })
})
