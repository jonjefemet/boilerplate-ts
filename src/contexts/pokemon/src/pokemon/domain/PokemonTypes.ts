import { Collection } from '@shared/domain/value_object/Collection';
import PokemonType from './PokemonType';
import PokemonTypesCannotBeRepeatedException from './exceptions/PokemonTypesCannotBeRepeatedException';

export default class PokemonTypes extends Collection<PokemonType> {
  constructor(...types: PokemonType[]) {
    super(...types);
    this.ensureDoNotHaveRepeatedTypes(...types);
  }

  private ensureDoNotHaveRepeatedTypes(...types: PokemonType[]): void {
    const uniqueTypes = new Set(types.map((item) => item.valueOf()));

    if (uniqueTypes.size !== types.length) {
      throw new PokemonTypesCannotBeRepeatedException();
    }
  }
}
