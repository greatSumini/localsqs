import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyCors from 'fastify-cors';
import { Server, IncomingMessage, ServerResponse } from 'http';

import router from './router';

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: FastifyPluginOptions,
  next: (error?: Error) => void
) => {
  fastify.register(fastifyCors, {
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Middleware: Router
  fastify.register(router);

  next();
};
