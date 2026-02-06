

export const Query = {
    // Query to get all users
    Users: async (_parent: any, args: any, { prisma }: any) => {
        const users = await prisma.user.findMany({
            include: { posts: true }
        })
        return users;
    },


    // Query to get all profiles
    Profiles: async (_parent: any, args: { userId: number }, { prisma }: any) => {
        const profile = await prisma.profile.findUnique({
            where: { userId: args.userId },
            include: { user: true }
        });
        return profile;
    },


    // Query to get all posts
    Posts: async (parent: any, args: any, { prisma }: any) => {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            include: {
                author: true
            }
        })
        return posts;
    },



    // add more queries here as needed


};
