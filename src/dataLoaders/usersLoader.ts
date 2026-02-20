import { Prisma, User } from "@prisma/client";
import { prisma } from "..";

const batchUsers = async (Ids: number[]): Promise<User[]> => {

    const users = await prisma.user.findMany({
        where: {
            id: {
                in: Ids
            }
        }
    })

};

