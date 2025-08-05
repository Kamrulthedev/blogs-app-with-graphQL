import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
  
  },

  Mutation : {
    signUp : async(parent: any, args: any, content: any) => {
      return await prisma.user.create({
      // data : {
      //   name :args.name,
      //   email: args.email,
      //   password: args.password,
      //   createdAt: new Date().toISOString()
      // }
      data : args
      })
    }
  }

};

