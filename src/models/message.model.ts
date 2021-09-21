import md5 from 'md5';

import { getRandomUuid } from '../common';

export class Message {
  id: string;

  Id?: string;
  MessageBody?: string;
  ReceiptHandle?: string;

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
    this.ReceiptHandle = getRandomUuid();

    return {
      MessageId: this.id,
      ReceiptHandle: this.ReceiptHandle,
      ...(this.MessageBody && {
        MD5OfBody: md5(this.MessageBody),
        Body: this.MessageBody,
      }),
      ...(this.attributes?.length > 0 && {
        Attribute: this.attributes,
      }),
    };
  }
}
