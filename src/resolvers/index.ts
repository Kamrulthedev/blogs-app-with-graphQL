import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tokenHelper } from "../utils/tokenHelper";

const prisma = new PrismaClient();

type argsType = {
  name: string;
  email: string;
  password: string;
  bio?: string;
};


export const resolvers = {

  Query: {
    // Query to get all users
    Users: async (_parent: any, args: any, content: any) => {
      const users = await prisma.user.findMany({
        include: { posts: true }
      })
      return users;
    },


    // Query to get all profiles
    Profiles: async (_parent: any, args: { userId: number }) => {
      const profile = await prisma.profile.findUnique({
        where: { userId: args.userId },
        include: { user: true }
      });
      return profile;
    },



  },


  Mutation: {

    // User Sign Up Mutation
    signUp: async (_parent: any, args: argsType) => {
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

      // Create Profile
      if (args?.bio) {
        await prisma.profile.create({
          data: {
            userId: createdUser.id,
            bio: args.bio
          }
        })
      }

      // generate jwt token
      const token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email, name: createdUser.name },
        process.env.jwtSecret as string | "kamrul1234567899",
        { expiresIn: "1d" });

      // const token = await tokenHelper({userId: createdUser.id})
      // console.log("Token", token);

      // console.log("User Created:", createdUser);
      // Return the user without the password field
      const { password: _, ...safeUser } = createdUser;
      return { token: token, user: safeUser };
    },


    // User Sign In Mutation
    signIn: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email
        }
      })

      if (!user) {
        throw new Error("This Email is not registered")
      }

      const inPasswordMatch = await bcrypt.compare(args?.password, user?.password);
      if (!inPasswordMatch) {
        throw new Error("Password is not matched")
      }


      const token = jwt.sign(
        { userId: user?.id, email: user?.email, name: user?.name },
        process.env.jwtSecret as string | "jinuk1234567899",
        { expiresIn: "1d" }
      )
      return { token: token, user: user };

    },


    // Create Post Mutation
    createPost: async (parent: any, args: any, context: any) => {
      const { title, content, authorId } = args;
      // Check if the author exists
      const author = await prisma.user.findUnique({
        where: { id: authorId }
      });
      if (!author) {
        throw new Error("User is Not Registered")
      }
      
      // Create The Post
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId
        },
        include: {
          author: true
        }
      })
      console.log("Post Created:", post);
      return post;
    }


  }
};



