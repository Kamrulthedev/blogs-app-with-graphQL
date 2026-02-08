import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library.js';
import { JwtHelper } from './utils/tokenHelper.js';
import jwt from "jsonwebtoken";
import config from './config/index.js';



const prisma = new PrismaClient({ adapter: { url: process.env.DATABASE_URL } as any } as any);

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  decodedToken: {
    userId: number
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function bootstrap() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
    context: async ({ req }): Promise<Context> => {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        try {
          const decodedToken = jwt.verify(
            authHeader,
            "kamrul1234567899"
          ) as { userId: number };

          return {
            prisma,
            decodedToken,
          };
        } catch (error: any) {
          // Token invalid → treat as no user, but don't stop whole server
          return {
            prisma,
            decodedToken: null as any,
          };
        }
      }

      // No token provided → public access allowed
      return {
        prisma,
        decodedToken: null as any,
      };
    }


  });

  console.log(`🚀 Server Ready At: ${url}`);
}

bootstrap();
