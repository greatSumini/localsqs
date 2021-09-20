import * as faker from 'faker';

import { formatMessage } from './format-message.helper';

describe('formatMessage', () => {
  const setUp = () => {
    const Names = [faker.lorem.word(), faker.lorem.word()];
    const Values = [faker.lorem.word(), faker.lorem.word()];

    return {
      Names,
      Values,
    };
  };

  it('should format', () => {
    const {
      Names: [Name1, Name2],
      Values: [Value1, Value2],
    } = setUp();

    expect(
      formatMessage({
        'MessageAttribute.1.Name': Name1,
        'MessageAttribute.1.Value.StringValue': Value1,
        'MessageAttribute.1.Value.DataType': 'String',
        'MessageAttribute.2.Name': Name2,
        'MessageAttribute.2.Value.StringValue': Value2,
        'MessageAttribute.2.Value.DataType': 'String',
      })
    ).toEqual({
      attributes: [
        { Name: Name1, Value: Value1 },
        { Name: Name2, Value: Value2 },
      ],
    });
  });

  it('should ignore attributes not having Name', () => {
    const {
      Names: [Name1],
      Values: [Value1, Value2],
    } = setUp();

    expect(
      formatMessage({
        'MessageAttribute.1.Name': Name1,
        'MessageAttribute.1.Value.StringValue': Value1,
        'MessageAttribute.1.Value.DataType': 'String',
        'MessageAttribute.2.Value.StringValue': Value2,
        'MessageAttribute.2.Value.DataType': 'String',
      })
    ).toEqual({
      attributes: [{ Name: Name1, Value: Value1 }],
    });
  });

  it('should treat undefined as white space', () => {
    const {
      Names: [Name1, Name2],
    } = setUp();

    expect(
      formatMessage({
        'MessageAttribute.1.Name': Name1,
        'MessageAttribute.1.Value.DataType': 'String',
        'MessageAttribute.2.Name': Name2,
        'MessageAttribute.2.Value.DataType': 'String',
      })
    ).toEqual({
      attributes: [
        { Name: Name1, Value: '' },
        { Name: Name2, Value: '' },
      ],
    });
  });
});
