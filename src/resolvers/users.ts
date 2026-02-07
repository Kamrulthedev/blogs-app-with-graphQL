export const User = {
    posts: async (parent: any, args: any, {prisma, decodedToken}: any) =>{
        
        // Check if the user is trying to access their own profile
        const ifMyProfile = parent.id === decodedToken.userId;

        const posts =  await prisma.post.findMany({
            where: {
                authorId: parent.id
            }
        })
        return posts;
    }
};


