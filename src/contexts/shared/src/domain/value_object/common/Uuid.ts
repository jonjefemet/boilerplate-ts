import StringValueObject from '../StringValueObject';
import { v6 as uuid, validate } from 'uuid';

export default class Uuid extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureIsValidUuid(uuid: string): void {
    if (!validate(uuid)) throw new Error('Invalid UUID');
  }
}
