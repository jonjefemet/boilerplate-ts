export type Primitives = string | number | boolean | Date | bigint | symbol;

export default interface ValueObject<T extends Primitives> {
  ensureIsValid(value: T): void;
}
