import { Prisma, User } from "@prisma/client";

const batchUsers = async (userIds: number[]): Promise<User[]> => {

    console.log("Batching user IDs:" , userIds);

    const users= await Prisma.

};


