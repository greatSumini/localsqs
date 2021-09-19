import { FastifyInstance, FastifyReply } from 'fastify';

import { responseSerializer } from '../common/serializers';
import { SqsAction } from '../common/types';

import { queueService } from '../services';

export const queueController = async (fastify: FastifyInstance) => {
  // GET /
  fastify.get<{
    Params: { accountNumber: string; queueName: string };
    Querystring: { Action: SqsAction };
  }>(
    '/:accountNumber/:queueName',
    async ({ params, query }, reply: FastifyReply) => {
      const { queueName } = params;
      const { Action: action } = query;

      let result: unknown;
      if (['SendMessage', 'SendMessageBatch'].includes(action)) {
        result = queueService.send(queueName, query);
      }

      if (result) {
        reply.send(responseSerializer(action, result));
      } else {
      }
    }
  );
};
