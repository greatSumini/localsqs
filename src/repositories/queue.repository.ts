import { Message } from '../models';

//////////
// data //
//////////

const queues: Array<{ name: string; messages: Message[] }> = [];

///////////////
// functions //
///////////////

const get = (name: string) => {
  const queue = queues.find((v) => v.name === name);
  if (queue) {
    return queue;
  }

  // throw new Error('queue not found');
  const newQueue = {
    name,
    messages: [] as Message[],
  };
  queues.push(newQueue);

  return newQueue;
};

const push = (name: string, messages: Message | Message[]) => {
  const queue = get(name);
  queue.messages.push(...[].concat(messages));
};

const pop = (name: string, _amount?: number) => {
  const queue = get(name);

  const amount = _amount ?? queue.messages.length;

  return queue.messages.splice(0, amount);
};

const deleteMessage = (name: string, ReceiptHandle: string) => {
  const queue = get(name);
  const index = queue.messages.findIndex(
    (v) => v.ReceiptHandle === ReceiptHandle
  );

  return queue.messages.splice(index, 1);
};

export const queueRepository = {
  get,
  push,
  pop,
  deleteMessage,
};
