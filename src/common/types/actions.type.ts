const SqsActions = [
  'SendMessage',
  'SendMessageBatch',
  'ReceiveMessage',
] as const;
export type SqsAction = typeof SqsActions[number];
