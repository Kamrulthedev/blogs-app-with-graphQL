export const User = {
    posts: async (parent: any, args: any, { prisma, decodedToken }: any) => {
        console.log(parent, decodedToken)

        // Check if the user is trying to access their own profile
        const ifMyProfile = parent.id === decodedToken.userId;
        console.log("Is My Profile:", ifMyProfile)

        // If it`s their own profile, return all posts (including unpublished)
        if (ifMyProfile) {
            return await prisma.post.findMany({
                where: {
                    authorId: parent.id
                }
            })
        }
        else {
            return await prisma.post.findMany({
                where: {
                    authorId: parent.id,
                    published: true
                }
            })
        }

    }
};


