import { faker } from '@faker-js/faker';
import PokedexPokemonDescription from '@pokedex/pokemon/domain/PokedexPokemonDescription';

export default class PokedexPokemonDescriptionMother {
  static random(): PokedexPokemonDescription {
    return PokedexPokemonDescriptionMother.create(faker.lorem.sentence());
  }

  static create(value: string): PokedexPokemonDescription {
    return new PokedexPokemonDescription(value);
  }
}
