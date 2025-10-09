import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library.js';
import { JwtHelper } from './utils/tokenHelper.js';
import jwt from "jsonwebtoken";
import config from './config/index.js';



const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function bootstrap() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
    context: async ({ req }): Promise<Context> => {
      try {
        console.log(req.headers.authorization)
        // Decoded with function
        // const decodedToken = await JwtHelper.DecodeToken(req.headers.authorization as string); 

        // Decoded Menual
        const decodedToken = jwt.verify(req.headers.authorization as string, "kamrul1234567899");
        console.log("User data", decodedToken)

        return {
          prisma
        }
      }
      catch (error : any) {
        console.error("Error verifying token:", error.message);
        throw new Error("Unauthorized: Invalid or missing token");
      }
    }
  });

  console.log(`🚀 Server ready at: ${url}`);
}

bootstrap();
