import fastify from 'fastify'
import { PrismaClient } from '../generated/prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Igor Torres',
    email: 'igorevangelista121@gmail.com',
  },
})
