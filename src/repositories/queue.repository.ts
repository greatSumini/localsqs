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
  return {
    name,
    messages: [],
  };
};

const push = (name: string, messages: Message | Message[]) =>
  get(name).messages.concat(messages);

const pop = (name: string, _amount?: number) => {
  const queue = get(name);

  const amount = _amount ?? queue.messages.length;

  const result = queue.messages.slice(queue.messages.length - amount);
  queue.messages = queue.messages.slice(0, queue.messages.length - amount);

  return result;
};

export const queueRepository = {
  get,
  push,
  pop,
};
