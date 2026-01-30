const CheckUserAccess = async () => {
    
    // Check if the author exists
    if (!decodedToken || !decodedToken.userId) {
        return {
            userError: "Unauthorized Access!",
            post: null
        }
    };

    // Check token Auth Id Exists Post Author Id 
    const user = await prisma.user.findUnique({
        where: { id: decodedToken.userId }
    });

    if (!user) {
        return {
            userError: "User Not Found!"
        }
    }

    // Check Post ID Exists
    const existsPost = await prisma.post.findUnique({
        where: { id: Number(postId) }
    })
    if (!existsPost) {
        return {
            userError: "Post Not Found!",
            post: null
        }
    }

    // Check Author Id and User Id Match
    if (existsPost.authorId !== user.id) {
        return {
            userError: "Post Not Wound By User!"
        }
    }

}