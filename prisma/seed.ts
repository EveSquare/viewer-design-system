import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const tagData: Prisma.TagCreateInput = {
    name: "イベント",
}

const logData: Prisma.LogCreateInput = {
    title: "Sample01",
    url: "/viewer",
    eventAt: new Date(),
    updatedAt: new Date(),
    tags: {
        create: [
            { tag: { create: tagData } },
        ]
    }
}

const transfer = async () => {
    const log = prisma.log.create({
        data: logData
    });

    return await prisma.$transaction([log]);
}

const main = async () => {
    console.log(`Start seeding ...`)

    await transfer();

    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })