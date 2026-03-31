import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shloud be able to search a gym, by name', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia longe',
        description: 'first test',
        phone: '61123123',
        latitude: -15.8665877,
        longitude: -47.9713124,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia perto',
        description: 'first test',
        phone: '61123123',
        latitude: -15.8665877,
        longitude: -47.9713124,
      })

    const gyms = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        q: 'perto',
        page: 1,
      })

    expect(gyms.statusCode).toEqual(200)
    expect(gyms.body.gyms).toHaveLength(1)
    expect(gyms.body.gyms).toEqual([
      expect.objectContaining({
        title: 'academia perto',
      }),
    ])
  })
})
