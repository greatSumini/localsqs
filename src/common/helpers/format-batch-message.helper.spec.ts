import * as faker from 'faker';

import { formatBatchMessage } from './format-batch-message.helper';

describe('formatBatchMessage', () => {
  const setUp = () => {
    const Ids = [faker.lorem.word(), faker.lorem.word()];
    const Bodies = [faker.lorem.word(), faker.lorem.word()];

    const Names = [faker.lorem.word(), faker.lorem.word()];
    const Values = [faker.lorem.word(), faker.lorem.word()];

    return { Ids, Bodies, Names, Values };
  };

  it('should format', () => {
    const {
      Ids: [Id1],
      Bodies: [Body1],
    } = setUp();

    expect(
      formatBatchMessage({
        'SendMessageBatchRequestEntry.1.Id': Id1,
        'SendMessageBatchRequestEntry.1.MessageBody': Body1,
      })
    ).toEqual([
      {
        Id: Id1,
        MessageBody: Body1,
        attributes: [],
      },
    ]);
  });

  it('should format multiple entries', () => {
    const {
      Ids: [Id1, Id2],
      Bodies: [Body1, Body2],
    } = setUp();

    expect(
      formatBatchMessage({
        'SendMessageBatchRequestEntry.1.Id': Id1,
        'SendMessageBatchRequestEntry.1.MessageBody': Body1,
        'SendMessageBatchRequestEntry.2.Id': Id2,
        'SendMessageBatchRequestEntry.2.MessageBody': Body2,
        'SendMessageBatchRequestEntry.2.DelaySeconds': '60',
      })
    ).toEqual([
      {
        Id: Id1,
        MessageBody: Body1,
        attributes: [],
      },
      {
        Id: Id2,
        MessageBody: Body2,
        DelaySeconds: '60',
        attributes: [],
      },
    ]);
  });

  it('should format attributes', () => {
    const {
      Ids: [Id1, Id2],
      Bodies: [Body1, Body2],
      Names: [Name1],
      Values: [Value1],
    } = setUp();

    expect(
      formatBatchMessage({
        'SendMessageBatchRequestEntry.1.Id': Id1,
        'SendMessageBatchRequestEntry.1.MessageBody': Body1,
        'SendMessageBatchRequestEntry.2.Id': Id2,
        'SendMessageBatchRequestEntry.2.MessageBody': Body2,
        'SendMessageBatchRequestEntry.2.DelaySeconds': '60',
        'SendMessageBatchRequestEntry.2.MessageAttribute.1.Name': Name1,
        'SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.StringValue':
          Value1,
        'SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.DataType':
          'String',
      })
    ).toEqual([
      {
        Id: Id1,
        MessageBody: Body1,
        attributes: [],
      },
      {
        Id: Id2,
        MessageBody: Body2,
        DelaySeconds: '60',
        attributes: [{ Name: Name1, Value: Value1 }],
      },
    ]);
  });
});
