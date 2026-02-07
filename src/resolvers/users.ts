export const User = {
    posts: async (parent: any, args: any, {prisma}: any) =>{
        console.log("User Posts:", parent.posts);
    }
};