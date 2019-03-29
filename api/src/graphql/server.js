// @flow

import config from 'config';
import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './typeDefinitions.graphql';
import resolvers from './resolvers';
import { getDataLoaders } from './dataLoaders';
const logger = require('pino')();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: true,
  tracing: true,
  engine: false,
  introspection: config.get('apollo.introspection'),
  playground: config.get('apollo.playground')
    ? {
        settings: {
          'editor.cursorShape': 'block',
        },
      }
    : false,
  context: async ({ ctx }) => ({
      log: ctx.log,
      dataLoaders: getDataLoaders(),
  }),
  formatError: error => {
    logger.error(error);
    return error;
  },
});

export default server;
