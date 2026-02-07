export const User = {
    posts: async (parent: any, args: any, {prisma, decodedToken}: any) =>{
        const posts =  await prisma.post.findMany({
            where: {
                authorId: parent.id
            }
        })
        return posts;
    }
};


