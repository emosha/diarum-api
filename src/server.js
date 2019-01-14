import { GraphQLServer, PubSub } from 'graphql-yoga';
import resolvers, { fragmentReplacements } from 'resolvers/index';
import prisma from './prisma';

const pubsub = new PubSub();
const options = {
  resolvers,
  typeDefs: './src/schema.graphql',
  context(request) {
    return {
      pubsub,
      prisma,
      request
    };
  },
  fragmentReplacements
};

const server = new GraphQLServer(options);

export default server;
