import { Prisma, User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../lib/prisma.js";

const batchUsers = async (ids: number[]): Promise<User[]> => {
    const users = await prisma.user.findMany({
        where: {
            id: { in: ids }
        }
    });

    const userData: Record<number, User> = {};

    users.forEach((user: { name: string; id: number; email: string; password: string; createdAt: Date; updatedAt: Date; }) => {
        userData[user.id] = user;
    });

    return ids.map(id => userData[id]);
};

export const usersLoader = new DataLoader<number, User>(batchUsers);




