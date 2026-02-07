

export const Query = {
    // Query to get all users
    Users: async (_parent: any, args: any, { prisma }: any) => {
        const users = await prisma.user.findMany({})
        return users;
    },


    // Query to get all profiles
    Profiles: async (_parent: any, args: { userId: number }, { prisma, decodedToken }: any) => {
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
            },
            orderBy: [
                { createdAt: "desc" }
            ]
        })
        return posts;
    },

    // Query to get the current authenticated user
    me: async (parent: any, args: any, { prisma, decodedToken }: any) => {
        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId },
            include: { posts: { where: {published: true}}}
        })
        return user;
    }


    // add more queries here as needed


};
