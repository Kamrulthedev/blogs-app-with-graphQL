export const Post = {
    author: async (parent: any, args: any, { prisma }: any) => {
        const author = await prisma.user.findUnique({
            where: { id: parent.authorId }
        })
        return author;
    }
};