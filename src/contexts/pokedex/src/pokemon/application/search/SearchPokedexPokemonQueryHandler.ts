import { QueryHandler } from '@shared/domain/bus/query/QueryHandler';
import SearchPokedexPokemonQuery from './SearchPokedexPokemonQuery';
import { Query } from '@shared/domain/bus/query/Query';
import PokedexPokemonSearcher from './PokedexPokemonSearcher';
import PokedexPokemonResponse from '../PokedexPokemonResponse';
import Log from '@utils/decorators/Log';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';

export default class SearchPokedexPokemonQueryHandler
  implements QueryHandler<SearchPokedexPokemonQuery, PokedexPokemonResponse>
{
  constructor(
    private readonly pokedexPokemonSearcher: PokedexPokemonSearcher,
  ) {}

  subscribedTo(): Query {
    return SearchPokedexPokemonQuery;
  }

  @Log()
  async handle(
    query: SearchPokedexPokemonQuery,
  ): Promise<PokedexPokemonResponse> {
    const pokedexPokemon = await this.pokedexPokemonSearcher.search({
      pokemonId: new PokemonId(query.pokemonId),
    });

    if (!pokedexPokemon) {
      throw new Error('Pokemon not found');
    }

    return PokedexPokemonResponse.create(pokedexPokemon.toPrimitive());
  }
}
