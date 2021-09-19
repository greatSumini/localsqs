import { getRandomUuid } from '../common/helpers';

export class Message {
  id: string;

  constructor(attributes: unknown) {
    Object.assign(this, attributes);
    this.id = getRandomUuid();
  }
}
