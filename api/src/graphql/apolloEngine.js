// @flow

import config from 'config';
import { ApolloEngine } from 'apollo-engine';

const engineApiKey = config.get('apollo.engine_api_key');

if (!engineApiKey) {
  console.info(
    'Apollo Engine SaaS is not configured.\nIf you want basic metrics, add your Apollo Engine API key on the APOLLO_ENGINE_API_KEY environment variable.\nYou can still make use of cacheControl directives without it.'
  );
}

const engine = new ApolloEngine({
  apiKey: engineApiKey || undefined,
  sessionAuth: {
    header: 'Authorization',
  },
  origins: [
    {
      supportsBatch: true,
      requestTimeout: '60s',
    },
  ],
  logging: {
    level: 'INFO', // set to DEBUG in order to see if cacheControl directives are correctly set
  },
  reporting: {
    disabled: !engineApiKey || process.env.NODE_ENV === 'development', // we should disable this also in production if it causes performance bottlenecks
  },
});

export const listen = (koaApp: Object, port: number): Promise<void> =>
  new Promise((resolve, reject) => {
    engine.on('error', reject);
    engine.listen(
      {
        port,
        graphqlPaths: ['/graphql'],
        koaApp,
      },
      resolve
    );
  });
