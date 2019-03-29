// @flow

import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';
import logger from 'koa-pino-logger';
import config from 'config';
import initDatabase from './database';
import { graphqlServer, listen } from './graphql';

initDatabase()
  .then(() => {
    const app = new Koa();
    app.use(koaBodyParser());
    app.use(logger());

    const router = new KoaRouter();
    router.get('/', ctx => {
      ctx.status = 200;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    graphqlServer.applyMiddleware({ app });

    const port = config.get('listen_port');
    return listen(app, port).then(() => console.log(`Server is ready at http://localhost:${port}/graphql`));
  })
  .catch(error => console.error('TypeORM or Apollo Engine connection error', error));
