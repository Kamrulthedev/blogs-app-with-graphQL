import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const resolvers = {

  Query :{
     Users: async(_parent:any, args: any, content: any)=>{
        const users = await prisma.user.findMany({
          include: {posts: true}
        })
     }
  },



  Mutation: {
    signUp: async (_parent: any, args: { name: string; email: string; password: string }) => {
      const { name, email, password } = args;


      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        throw new Error("Email already registered");
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
        include : {posts: true}
      });

      console.log("User Created:", createdUser);
      // Return the user without the password field
      const { password: _, ...safeUser } = createdUser;
      return safeUser;
    }
  }
};



