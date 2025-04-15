import PokedexPokemonResponse from '@pokedex/pokemon/application/PokedexPokemonResponse';
import { PokedexPokemon } from '@pokedex/pokemon/domain/PokedexPokemon';

export default class PokedexPokemonResponseMother {
  static create(pokedexPokemon: PokedexPokemon): PokedexPokemonResponse {
    return PokedexPokemonResponse.create(pokedexPokemon.toPrimitive());
  }
}
