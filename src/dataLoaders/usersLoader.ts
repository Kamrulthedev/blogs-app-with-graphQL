import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../index.js";


const batchUsers = async (ids: number[]): Promise<User[]> => {

    console.log("Batching user IDs:", ids);

    const users = await prisma.user.findMany({
        where: {
            id: { in: ids }
        }
    });

    // console.log("Fetched users:", users);

    const userData: Record<number, User> = {};

    users.forEach(user => {
        userData[user.id] = user;
    });

    console.log("User Data Map:", userData);    
    return ids.map(id => userData[id]);
};


// @ts-ignore
export const usersLoader = new DataLoader<number, User>(batchUsers);



