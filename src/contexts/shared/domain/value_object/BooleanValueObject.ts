import ValueObject from './ValueObject';

export default abstract class BooleanValueObject
  extends Boolean
  implements ValueObject<boolean>
{
  constructor(value: boolean) {
    super(value);
    this.ensureIsValid(value);
  }
  ensureIsValid(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new Error('Invalid boolean value');
    }
  }
}
