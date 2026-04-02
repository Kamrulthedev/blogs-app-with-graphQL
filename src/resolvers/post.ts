import { usersLoader } from "../dataLoaders/usersLoader.js";


export const Post = {
    author: async (parent: any, args: any, { prisma }: any) => {
        console.log("User Id:", parent.authorId)
        // const author = await prisma.user.findUnique({
        //     where: { id: parent.authorId }
        // })
        return usersLoader.load(parent.authorId);
    }
};