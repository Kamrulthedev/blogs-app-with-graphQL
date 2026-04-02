import { Prisma, User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../index.js";


const batchUsers = async (ids: number[]): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            id: { in: ids }
        }
    });

    const userData: Record<number, User> = {};

    users.forEach(user => {
        userData[user.id] = user;
    });

    return ids.map(id => userData[id]);
};


// @ts-ignore
export const usersLoader = new DataLoader<number, User>(batchUsers);