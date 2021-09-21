import * as faker from 'faker';

import { queueService } from './queue.service';

describe('queueService', () => {
  const setUp = () => {
    const queueName = faker.lorem.word();
    const body = {
      Action: 'SendMessageBatch',
      QueueUrl: `http://localhost:4413/896943254900/${queueName}`,
      'SendMessageBatchRequestEntry.1.Id':
        '2b6cc4e7-c102-e7eb-ab06-5f73534093b2',
      'SendMessageBatchRequestEntry.1.MessageBody':
        '{"id":11,"nickname":"최수민"}',
      Version: '2012-11-05',
    };

    return { queueName, body };
  };

  it('should receive sent message', async () => {
    const { queueName, body } = setUp();

    queueService.sendBatch(queueName, body);
    const result = await queueService.receive(queueName, {
      WaitTimeSeconds: '0',
    });

    expect(result.Message.length).toEqual(1);
  });

  it('deleteMessage success', async () => {
    const { queueName, body } = setUp();

    queueService.sendBatch(queueName, body);
    const received = await queueService.receive(queueName, {
      WaitTimeSeconds: '0',
    });
    queueService.deleteMessage(queueName, {
      ReceiptHandle: received.Message[0].ReceiptHandle,
    });
    const result = await queueService.receive(queueName, {
      WaitTimeSeconds: '0',
    });

    expect(received.Message.length).toEqual(1);
    expect(result.Message.length).toEqual(0);
  });
});
