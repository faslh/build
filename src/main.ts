import cors from '@koa/cors';
import { StatusCodes } from 'http-status-codes';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaQs from 'koa-qs';
import serve from 'koa-static';
import path from 'path';
import { problemDetailsMiddleware } from 'rfc-7807-problem-details';

import dataSource from './core/data-source';
import routes from './features/routes';

const application = koaQs(new Koa().use(cors({ origin: '*' })).use(logger()));

const bp = bodyParser();
application.use(
  problemDetailsMiddleware.koa((options) => {
    // options.rethrow(Error);
    options.mapToStatusCode(Error, StatusCodes.INTERNAL_SERVER_ERROR);
  })
);
application.use((ctx, next) => {
  // Prevent koa-bodyparser from parsing already parsed body
  ctx.request.body = ctx.request.body || (ctx.req as any).body;
  return bp(ctx, next);
});

routes.forEach((route) => {
  application.use(route.routes());
});

application.use((context, next) => {
  if (context.path === '/') {
    context.status = StatusCodes.OK;
    context.body = {
      status: 'UP',
    };
    return;
  }
  if (context.path === '/health') {
    context.status = StatusCodes.OK;
    context.body = {
      status: 'UP',
    };
    return;
  }
  next();
});

application.use(serve(path.join(__dirname, 'assets')));

dataSource
  .initialize()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default application;
