import { Prisma, User } from "@prisma/client";
import { prisma } from "..";

const batchUsers = async (Ids: number[]): Promise<User[]> => {

    // Batch load users by their Ids
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: Ids
            }
        }
    })



};

