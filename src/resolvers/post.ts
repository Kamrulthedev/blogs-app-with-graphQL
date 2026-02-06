export const Post = {
    author: async (parent: any, args: any, { prisma }: any) => {
        console.log("Post Author Resolver Called With Parent:", parent);
    }
}