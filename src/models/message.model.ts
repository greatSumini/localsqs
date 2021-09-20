import md5 from 'md5';

import { getRandomUuid } from '../common';

export class Message {
  id: string;

  Id?: string;
  MessageBody?: string;

  attributes?: Array<{ Name: string; Value: string }>;

  constructor(attributes: any) {
    Object.assign(this, attributes);
    this.id = attributes.id ?? getRandomUuid();
  }

  toResponse() {
    return {
      ...(this.Id && { Id: this.Id }),
      ...(this.MessageBody && {
        MD5OfMessageBody: md5(this.MessageBody),
      }),
      ...(this.attributes?.length > 0 && {
        MD5OfMessageAttributes: '3ae8f24a165a8cedc005670c81a27295',
      }),
      MessageId: this.id,
    };
  }

  toOutput() {
    return {
      ...(this.MessageBody && {
        MD5OfBody: 'fafb00f5732ab283681e124bf8747ed1',
        Body: this.MessageBody,
      }),
      ...(this.attributes?.length > 0 && {
        Attribute: this.attributes,
      }),
      MessageId: this.id,
      ReceiptHandle: getRandomUuid(),
    };
  }
}
