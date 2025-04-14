import { QueryHandler } from '@shared/domain/bus/query/QueryHandler';
import SearchPokedexPokemonQuery from './SearchPokedexPokemonQuery';
import { Query } from '@shared/domain/bus/query/Query';
import PokedexPokemonSearcher from './PokedexPokemonSearcher';
import PokedexPokemonResponse from '../PokedexPokemonResponse';
import Log from '@utils/decorators/Log';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';


export default class SearchPokedexPokemonQueryHandler
  implements QueryHandler<SearchPokedexPokemonQuery, PokedexPokemonResponse | null>
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
  ): Promise<PokedexPokemonResponse | null> {
    const pokedexPokemon = await this.pokedexPokemonSearcher.search({
      pokemonId: new PokemonId(query.pokemonId),
    });

    if ( !pokedexPokemon ) {
      return null;
    }

    
    return PokedexPokemonResponse.create(pokedexPokemon.toPrimitive());
  }
}
