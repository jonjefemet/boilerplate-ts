import { IntegerMother } from './IntegerMother';
export class Repeater {
  static random<T>(callable: () => T, iterations: number): T[] {
    return Array(iterations || IntegerMother.random(20))
      .fill(null)
      .map(() => callable());
  }
}
