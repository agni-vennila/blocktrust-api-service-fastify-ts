// @ts-ignore
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData: Prisma.CategoryCreateInput[] = [
    {
        name: 'Gaming',
    },
    {
        name: 'Art',
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const c of categoryData) {
        const category = await prisma.category.create({
            data: c,
        })
        console.log(`Created user with id: ${category.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })