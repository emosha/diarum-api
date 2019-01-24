import '@babel/polyfill/noConflict';
import { GraphQLServer } from 'graphql-yoga';
import { MutationValidationError, FieldValidationError, yupMiddleware } from 'graphql-yup-middleware';
import resolvers from 'resolvers/index';
import prisma from './prisma';
import typeDefs from './typeDefs';

const options = {
  resolvers,
  typeDefs: [
    typeDefs,
    MutationValidationError,
    FieldValidationError
  ],
  context(request) {
    return {
      prisma,
      request
    };
  },
  middlewares: [yupMiddleware()]
};

const server = new GraphQLServer(options);

export default server;
