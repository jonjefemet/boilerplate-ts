import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import { UuidMother } from '@test/contexts/shared/domain/UuidMother';

export default class PokemonIdMother {
  static random(): PokemonId {
    return PokemonIdMother.create(UuidMother.random());
  }

  static create(value: string): PokemonId {
    return new PokemonId(value);
  }
}
