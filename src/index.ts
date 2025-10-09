import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library.js';
import { JwtHelper } from './utils/tokenHelper.js';


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
    context: async({req}): Promise<Context> =>{
      console.log(req.headers.authorization)
      const decodedToken = await JwtHelper.DecodeToken(req.headers.authorization as string); 
      console.log(decodedToken)
      return {
        prisma
      }
    }
  });

  console.log(`🚀 Server ready at: ${url}`);
}

bootstrap();
