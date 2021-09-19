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

const popAll = (name: string) => {
  const queue = get(name);
  const result = [...queue?.messages];
  queue.messages = [];

  return result;
};

export const queueRepositories = {
  get,
  push,
  popAll,
};
