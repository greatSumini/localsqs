import * as faker from 'faker';

import { queueService } from './queue.service';

describe('queueService', () => {
  const setUp = () => {
    const queueName = faker.lorem.word();
    const sendBatchBody = {
      Action: 'SendMessageBatch',
      QueueUrl: `http://localhost:4413/896943254900/${queueName}`,
      'SendMessageBatchRequestEntry.1.Id':
        '2b6cc4e7-c102-e7eb-ab06-5f73534093b2',
      'SendMessageBatchRequestEntry.1.MessageBody':
        '{"id":11,"nickname":"최수민"}',
      Version: '2012-11-05',
    };

    return { queueName, sendBatchBody };
  };

  const getDeleteBatchBody = (rh1: string, rh2: string) => ({
    Action: 'DeleteMessageBatch',
    'DeleteMessageBatchRequestEntry.1.Id': 'msg1',
    'DeleteMessageBatchRequestEntry.1.ReceiptHandle': rh1,
    'DeleteMessageBatchRequestEntry.2.Id': 'msg2',
    'DeleteMessageBatchRequestEntry.2.ReceiptHandle': rh2,
    Expires: '2020-10-18T22%3A52%3A43PST',
    Version: '2012-11-05',
  });

  it('should receive sent message', async () => {
    const { queueName, sendBatchBody } = setUp();

    queueService.sendBatch(queueName, sendBatchBody);
    const result = await queueService.receive(queueName, {
      WaitTimeSeconds: '0',
    });

    expect(result.Message.length).toEqual(1);
  });

  it('deleteMessage success', async () => {
    const { queueName, sendBatchBody } = setUp();

    queueService.sendBatch(queueName, sendBatchBody);
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

  it('deleteMessageBatch success', async () => {
    const { queueName, sendBatchBody } = setUp();

    queueService.sendBatch(queueName, sendBatchBody);
    queueService.sendBatch(queueName, sendBatchBody);
    const received = await queueService.receive(queueName, {
      MaxNumberOfMessages: '10',
      WaitTimeSeconds: '0',
    });

    expect(received.Message.length).toEqual(2);

    const deleteBatchBody = getDeleteBatchBody(
      received.Message[0].ReceiptHandle,
      received.Message[1].ReceiptHandle
    );

    const deleteBatchResult = queueService.deleteMessageBatch(
      queueName,
      deleteBatchBody
    );
    const result = await queueService.receive(queueName, {
      MaxNumberOfMessages: '10',
      WaitTimeSeconds: '0',
    });

    expect(deleteBatchResult.DeleteMessageBatchResultEntry.length).toEqual(2);
    expect(deleteBatchResult.DeleteMessageBatchResultEntry[0].Id).toEqual(
      deleteBatchBody['DeleteMessageBatchRequestEntry.1.Id']
    );
    expect(deleteBatchResult.DeleteMessageBatchResultEntry[1].Id).toEqual(
      deleteBatchBody['DeleteMessageBatchRequestEntry.2.Id']
    );
    expect(result.Message.length).toEqual(0);
  });
});
