
export const PostResolvers = {
    // Create Post Mutation
    createPost: async (parent: any, { post }: any, { prisma, decodedToken }: any) => {
        // console.log("Data:", args);
        // console.log("Decoded Token:", decodedToken);

        // Check if the author exists
        if (!decodedToken || !decodedToken.userId) {
            return {
                userError: "Forbidden Access!",
                post: null,
            };
        }

        // Check title and content
        const { title, content } = post;
        if (!title || !content) {
            return {
                userError: "Title And Content Must Be Provided!",
                post: null,
            };
        }

        // Create the Post
        const Createpost = await prisma.post.create({
            data: {
                title,
                content,
                authorId: decodedToken.userId,
            },
            include: {
                author: true,
            },
        });

        // console.log("Post Created:", post);
        return {
            userError: null,
            post: Createpost
        };
    },

    // Update Post Mutation
    updatePost: async (parent: any, args: any, { prisma, decodedToken }: any) => {
       console.log({"Args": args, "DecodedToken": decodedToken})
        const { postId, post } = args;

        // Check if the author exists
        if (!decodedToken || !decodedToken.userId) {
            return {
                userError: "Unauthorized Access!",
                post: null
            }
        };

        // Check token Auth Id Exists Post Author Id 
        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId}
        });
       
        if(!user){
            return {
                userError: "User Not Found!"
            }
        }

        // Check Post ID Exists
        const existsPost = await prisma.post.findUnique({
            where: {
                id: postId
            } 
        })
        
    
    }


};