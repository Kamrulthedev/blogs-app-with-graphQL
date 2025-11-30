import { authResolvers } from "./auth";

export const Mutation = {
  ...authResolvers,

  createPost: async (parent: any, args: any, { prisma, decodedToken }: any) => {
    if (!decodedToken || !decodedToken.userId) {
      return {
        userError: "Forbidden Access!",
        post: null,
      };
    }

    const { title, content } = args;

    if (!title || !content) {
      return {
        userError: "Title And Content Must Be Provided!",
        post: null,
      };
    }

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

    return {
      userError: null,
      post,
    };
  },
};
