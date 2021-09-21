import { FastifyInstance } from 'fastify';

import { responseSerializer } from '../common';
import { queueService } from '../services';

export const appController = async (fastify: FastifyInstance) => {
  // HEALTH CHECK, GREETING //
  fastify.get('/', async (_request, reply) => {
    reply.send('Hello World!');
  });

  // controlls all sqs requests //
  fastify.post<{
    Body: { Action: string; QueueUrl: string };
  }>('/', async ({ body }, reply) => {
    const { Action: action, QueueUrl } = body;

    const queueName = QueueUrl.split('/').reverse()[0];

    let result: any;
    if (action === 'SendMessage') {
      result = queueService.send(queueName, body);
    }
    if (action === 'SendMessageBatch') {
      result = queueService.sendBatch(queueName, body);
    }
    if (action === 'ReceiveMessage') {
      result = await queueService.receive(queueName, body);
    }

    if (action === 'ReceiveMessage') {
      if (result.Message?.length > 0) {
        fastify.log.info(
          `ReceiveMessage to ${queueName} (${result.Message?.length})`
        );
      }
    }
    if (action !== 'ReceiveMessage') {
      fastify.log.info(action + ' to ' + queueName);
    }

    if (result) {
      reply
        .type('text/html; charset=utf-8')
        .send(responseSerializer(action, result));
    } else {
    }
  });
};
