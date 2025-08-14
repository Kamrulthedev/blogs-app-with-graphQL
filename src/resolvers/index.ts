import { PrismaClient } from "@prisma/client";
import { Query } from "./Querys/index.js";
import { Mutation } from "./Mutations/index.js";

const prisma = new PrismaClient();



export const resolvers = {
  Query,
  Mutation
  
};



