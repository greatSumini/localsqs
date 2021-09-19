import { FastifyInstance } from 'fastify';

import { appController, queueController } from './controllers';

export default async function router(fastify: FastifyInstance) {
  fastify.register(appController);
  fastify.register(queueController);
}
