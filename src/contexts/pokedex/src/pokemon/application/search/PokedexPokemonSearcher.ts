import PokedexPokemonRepository from '../../domain/PokedexPokemonRepository';
import { PokedexPokemon } from '../../domain/PokedexPokemon';
import Log from '@utils/decorators/Log';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class PokedexPokemonSearcher {
  constructor(
    @Inject('PokedexPokemonRepository')
    private readonly repository: PokedexPokemonRepository,
  ) {}

  @Log()
  async search(
    props: PokedexPokemonSearcherProps,
  ): Promise<PokedexPokemon | null> {
    return await this.repository.search(props.pokemonId);
  }
}

type PokedexPokemonSearcherProps = {
  pokemonId: PokemonId;
};
