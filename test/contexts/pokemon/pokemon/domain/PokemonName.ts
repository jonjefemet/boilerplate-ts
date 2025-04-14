import { faker } from '@faker-js/faker';
import PokemonName from '@pokemon/pokemon/domain/PokemonName';

export default class PokemonNameMother {
  static random(): PokemonName {
    return PokemonNameMother.create(faker.animal.type());
  }

  static create(value: string): PokemonName {
    return new PokemonName(value);
  }
}
