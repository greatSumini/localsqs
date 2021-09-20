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
}
