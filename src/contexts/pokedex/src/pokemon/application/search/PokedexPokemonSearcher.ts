import PokedexPokemonRepository from '../../domain/PokedexPokemonRepository';
import { PokedexPokemon } from '../../domain/PokedexPokemon';
import Log from '@utils/decorators/Log';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';

export default class PokedexPokemonSearcher {
  constructor(
    private readonly pokedexPokemonRepository: PokedexPokemonRepository,
  ) {}

  @Log()
  async search(
    props: PokedexPokemonSearcherProps,
  ): Promise<PokedexPokemon | null> {
    return await this.pokedexPokemonRepository.search(props.pokemonId);
  }
}

type PokedexPokemonSearcherProps = {
  pokemonId: PokemonId;
};
