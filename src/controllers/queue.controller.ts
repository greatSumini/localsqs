import { FastifyInstance, FastifyReply } from 'fastify';

import { responseSerializer } from '../common/serializers';

export const queueController = async (fastify: FastifyInstance) => {
  // GET /
  fastify.get<{ Params: { accountNumber: string; queueName: string } }>(
    '/:accountNumber/:queueName',
    { schema: { querystring: { Action: { type: 'string' } } } },
    async ({ params }, reply: FastifyReply) => {
      reply.send(
        responseSerializer('Sumin', {
          Account: params.accountNumber,
          Name: params.queueName,
        })
      );
    }
  );
};
