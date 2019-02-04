import '@babel/polyfill/noConflict';
import { GraphQLServer } from 'graphql-yoga';
import resolvers from 'resolvers/index';
import prisma from './prisma';
import typeDefs from './typeDefs';

const options = {
  resolvers,
  typeDefs,
  context(request) {
    return {
      prisma,
      request
    };
  }
};

const server = new GraphQLServer(options);

export default server;
