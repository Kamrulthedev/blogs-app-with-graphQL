

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
            },
            orderBy: [
                { createdAt: "desc" }
            ]
        })
        return posts;
    },

    // Query to get the current authenticated user
    me: async (parent: any, args: any, { prisma, decodedToken }: any) => {
        // Check if the user is authenticated
        if (!decodedToken || !decodedToken.userId) {
            return null;
        }
        
    }


    // add more queries here as needed


};
