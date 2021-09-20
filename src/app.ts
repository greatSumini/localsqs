import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyFormBody from 'fastify-formbody';
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
  fastify.register(fastifyFormBody);

  // Middleware: Router
  fastify.register(router);

  next();
};
