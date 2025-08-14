import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const Query = {
    // Query to get all users
    Users: async (_parent: any, args: any, content: any) => {
        const users = await prisma.user.findMany({
            include: { posts: true }
        })
        return users;
    },


    // Query to get all profiles
    Profiles: async (_parent: any, args: { userId: number }) => {
        const profile = await prisma.profile.findUnique({
            where: { userId: args.userId },
            include: { user: true }
        });
        return profile;
    },


    // Query to get all posts
    Posts: async (parent: any, args: any, content: any) => {
        const posts = await prisma.post.findMany({
            include: {
                author: true
            }
        })
        return posts;
    }

};