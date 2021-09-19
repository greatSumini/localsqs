const SqsActions = ['SendMessage', 'SendMessageBatch'] as const;
export type SqsAction = typeof SqsActions[number];
