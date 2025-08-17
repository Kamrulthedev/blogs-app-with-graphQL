import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function bootstrap() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async() =>{
      return {
        prisma
      }
    }
  });

  console.log(`🚀 Server ready at: ${url}`);
}

bootstrap();
