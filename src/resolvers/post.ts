export const Post = {
    author: async (parent: any, args: any, { prisma }: any) => {
        console.log("Post Author Resolver Called With Parent:", parent);
        const author = await prisma.user.findUnique({
            where: { id: parent.authorId }
        })

        console.log("Author Found:", author)

        return author;
    }
}