import { FastifyInstance } from 'fastify';

import { appController } from './controllers';

export default async function router(fastify: FastifyInstance) {
  fastify.register(appController);
}
