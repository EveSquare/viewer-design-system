import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllLogs() {
    const logs = await prisma.log.findMany({
        include: {
            tags: {
                include: {
                    tag: true,
                },
            }
        },
        orderBy: {
            id: 'asc',
        },
    });
    return logs;
}

export async function getSortedMostViewLogs() {
    const logs = await prisma.log.findMany({
        include: {
            tags: {
                include: {
                    tag: true,
                },
            }
        },
        orderBy: {
            viewCount: 'desc',
        },
    });
    return logs;
}

export async function incrementViewCount(pk: number) {
    const logs = await prisma.log.update({
        where: {
            id: pk,
        },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    });
    return logs;
}