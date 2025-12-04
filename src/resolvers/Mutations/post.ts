
export const PostResolvers = {
      // Create Post Mutation
  createPost: async (parent: any, args: any, { prisma, decodedToken }: any) => {
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
    const { title, content } = args;
    if (!title || !content) {
      return {
        userError: "Title And Content Must Be Provided!",
        post: null,
      };
    }

    // Create the Post
    const post = await prisma.post.create({
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
      post: post
    };
  }
};