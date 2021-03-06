/*----------------------------------------------------------------------------------------------------
                                           Server
----------------------------------------------------------------------------------------------------*/

import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import { Http2Server } from 'http2';
import { applyMiddleware } from 'graphql-middleware';
import { createServer as createHttpServer } from 'http';
import express from 'express';
import { importSchema } from 'graphql-import';

import { allResolvers } from './resolvers';
import { createApp } from './app';
import { createContext } from './context';
import { Logger } from './utils';
import { formatError } from './middleware';

/*--------------------------------------------------------------------------------------------------*/


const typeDefs = importSchema('schemas/schema.graphql');
const { PORT = 4000 } = process.env;

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: allResolvers as IResolvers[],
  }),
);

const createApolloServer = (): ApolloServer => new ApolloServer({
  typeDefs: importSchema('schemas/schema.graphql'),
  schema,
  context: createContext,
  introspection: true,
  playground: true,
  extensions: process.env.NODE_ENV === 'test' ? [] : [() => new Logger()],
  formatError,
  subscriptions: {
    onConnect: (): void => {
      process.stdout.write('Connected to websocket\n');
    },
  },
});

const initializeApolloServer = (apollo: ApolloServer, app: express.Application): () => void => {
  apollo.applyMiddleware({ app });

  return (): void => {
    process.stdout.write(
      `Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

export const startServer = async (app: express.Application): Promise<Http2Server> => {
  const httpServer = createHttpServer(app);

  const apollo = createApolloServer();
  apollo.installSubscriptionHandlers(httpServer);
  const handleApolloServerInitilized = initializeApolloServer(apollo, app);

  return httpServer.listen({ port: PORT }, () => {
    handleApolloServerInitilized();
  });
};

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  startServer(app).catch(console.error);
}
