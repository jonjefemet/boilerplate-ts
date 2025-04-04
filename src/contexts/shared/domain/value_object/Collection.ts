export abstract class Collection<T> extends Array<T> {
  constructor(...items: T[]) {
    super(...items);
  }
}
