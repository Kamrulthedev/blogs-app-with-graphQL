import { Prisma, User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchUsers = async (Ids: number[]): Promise<User[]> => {

    // Batch load users by their Ids
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: Ids
            }
        }
    });


    const userData: { [key: string]: User } = {};

    // use data loader
    users.forEach(user => {
        userData[user.id] = user;
    });
    return Ids.map((id) => userData[id]);


};

// @ts-ignore
export const usersLoader = new DataLoader<number, User>(batchUsers); 



