export const User = {
    posts: async (parent: any, args: any, {prisma, decodedToken}: any) =>{
        console.log("User Posts:", parent);
    }
};