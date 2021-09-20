import { formatBatchMessage } from '../common';
import { Message } from '../models';
import { queueRepositories } from '../repositories';

const checkMessageContent = (query: Record<string, string>) => {
  const MSG_CONTENT_REGEX =
    /^[\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\U00010000-\U0010FFFF]*$/;

  if (Object.values(query).some((value) => !MSG_CONTENT_REGEX.test(value))) {
    throw new Error('Message contains invalid characters');
  }
};

const send = (queueName: string, query: Record<string, string>) => {
  checkMessageContent(query);

  const message = new Message(query);
  queueRepositories.push(queueName, message);

  return {
    MD5OfMessageBody: 'fafb00f5732ab283681e124bf8747ed1',
    MD5OfMessageAttributes: '3ae8f24a165a8cedc005670c81a27295',
    MessageId: message.id,
  };
};

const sendBatch = (queueName: string, query: Record<string, string>) => {
  checkMessageContent(query);

  const messages = formatBatchMessage(query).map(
    (message) => new Message(message)
  );
  queueRepositories.push(queueName, messages);

  return {
    SendMessageBatchResultEntry: messages.map((message) => ({
      ...(message.Id && { Id: message.Id }),
      ...(message.MessageBody && {
        MD5OfMessageBody: 'fafb00f5732ab283681e124bf8747ed1',
      }),
      ...(message.attributes?.length > 0 && {
        MD5OfMessageAttributes: '3ae8f24a165a8cedc005670c81a27295',
      }),
      MessageId: message.id,
    })),
  };
};

export const queueService = {
  send,
  sendBatch,
};
