import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const resolvers = {
  Mutation: {
    signUp: async (_parent: any, args: { name: string; email: string; password: string }) => {
      const { name, email, password } = args;

      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

      const { password: _, ...safeUser } = createdUser;
      return safeUser;
    }
  }
};
