import { PrismaClient } from '@prisma/client'
import { USERS } from './data/users'
import { MOVIES } from './data/movies'

const prisma = new PrismaClient()

async function main() {
    const users = await Promise.all(USERS.map(async (user) => prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })))

    const movies = await Promise.all(MOVIES.map(async (movie) => prisma.movie.create({
        data: movie,
    })))

    console.log({ users, movies })
}

// Run the `main` function
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })