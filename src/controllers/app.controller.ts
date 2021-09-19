import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export const appController = async (fastify: FastifyInstance) => {
  // GET /
  fastify.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send('Hello World!');
  });
};
