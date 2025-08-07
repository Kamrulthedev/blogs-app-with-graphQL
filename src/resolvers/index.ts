import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export const resolvers = {

  Query: {
    Users: async (_parent: any, args: any, content: any) => {
      const users = await prisma.user.findMany({
        include: { posts: true }
      })
      return users;
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
        include: { posts: true }
      });


      const token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email, name: createdUser.name },
        process.env.jwtSecret as string | "kamrul1234567899",
        { expiresIn: "1d" });

      console.log("jwt token:", token)

      // console.log("User Created:", createdUser);
      // Return the user without the password field
      const { password: _, ...safeUser } = createdUser;
      return { token: token, user: safeUser };
    },

    signIn: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email
        }
      })

      const token = jwt.sign(
        { userId: user?.id, email: user?.email, name: user?.name },
        process.env.jwtSecret as string | "jinuk1234567899",
        { expiresIn: "1d" }
      )

      if(!user){
        throw new Error("This Email is not registered")
      }
      console.log('jwt token:', token)
      console.log("users:", user)
      return {
        Token: token,
        user: user
      }

    }

  }

};



