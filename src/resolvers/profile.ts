export const Profile = {
    user: async (parent: any, args: any, { prisma }: any) => {
        const user = await prisma.user.findUnique({
            where: { id: parent.userId }
        });
        return user;
    }
};