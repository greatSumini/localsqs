import { formatBatchMessage } from '../common';
import { Message } from '../models';
import { queueRepository } from '../repositories';

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
  queueRepository.push(queueName, message);

  return message.toResponse();
};

const sendBatch = (queueName: string, query: Record<string, string>) => {
  checkMessageContent(query);

  const messages = formatBatchMessage(query).map(
    (message) => new Message(message)
  );
  queueRepository.push(queueName, messages);

  return {
    SendMessageBatchResultEntry: messages.map((message) =>
      message.toResponse()
    ),
  };
};

const receive = async (queueName: string, query: Record<string, string>) => {
  const { MaxNumberOfMessages = '1', WaitTimeSeconds = '20' } = query;

  await new Promise((resolve) =>
    setTimeout(resolve, Number(WaitTimeSeconds) * 1000)
  );

  const messages = queueRepository
    .get(queueName)
    .messages.slice(0, Number(MaxNumberOfMessages));

  return {
    Message: messages.map((message) => message.toOutput()),
  };
};

const deleteMessage = (queueName: string, body: Record<string, string>) => {
  const { ReceiptHandle } = body;
  if (!ReceiptHandle) {
    throw new Error('ReceiptHandle must be provided');
  }
  queueRepository.deleteMessage(queueName, ReceiptHandle);
};

const deleteMessageBatch = (
  queueName: string,
  body: Record<string, string>
) => {
  const entries = formatBatchMessage(body);
  entries.forEach((entry) => {
    queueRepository.deleteMessage(queueName, entry.ReceiptHandle as string);
  });

  return {
    DeleteMessageBatchResultEntry: entries.map((entry) => ({ Id: entry.Id })),
  };
};

export const queueService = {
  send,
  sendBatch,
  receive,
  deleteMessage,
  deleteMessageBatch,
};
