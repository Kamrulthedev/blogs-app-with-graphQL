import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
  
  },

  Mutation : {
    signUp : async(parent: any, args: any, content: any) => {
      
      console.log("Sign Up Mutation called with args : ", args);

    }
  }

};

