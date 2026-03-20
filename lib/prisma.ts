import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url) {
    // During build time, DATABASE_URL may not be available
    // Return a proxy that throws on actual database usage
    return new Proxy({} as PrismaClient, {
      get(target, prop) {
        if (prop === 'then' || prop === 'catch' || typeof prop === 'symbol') {
          return undefined
        }
        throw new Error('DATABASE_URL is not set. Cannot connect to database.')
      },
    })
  }
  return new PrismaClient({ datasourceUrl: url })
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
