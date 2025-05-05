import { QueryHandler } from '@shared/domain/bus/query/QueryHandler';
import SearchPokedexPokemonQuery from './SearchPokedexPokemonQuery';
import PokedexPokemonSearcher from './PokedexPokemonSearcher';
import PokedexPokemonResponse from '../PokedexPokemonResponse';
import Log from '@utils/decorators/Log';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import { Maybe } from '@utils/helper/Type';

import { DecoratorQueryHandler } from '@shared/infrastructure/decorators/query-handler.decorator';

@DecoratorQueryHandler(SearchPokedexPokemonQuery)
export default class SearchPokedexPokemonQueryHandler
  implements
    QueryHandler<SearchPokedexPokemonQuery, Maybe<PokedexPokemonResponse>>
{
  constructor(
    private readonly pokedexPokemonSearcher: PokedexPokemonSearcher,
  ) {}

  subscribedTo = () => SearchPokedexPokemonQuery;

  @Log()
  async handle(
    query: SearchPokedexPokemonQuery,
  ): Promise<Maybe<PokedexPokemonResponse>> {
    const pokedexPokemon = await this.pokedexPokemonSearcher.search({
      pokemonId: new PokemonId(query.pokemonId),
    });

    if (!pokedexPokemon) {
      return null;
    }

    return PokedexPokemonResponse.create(pokedexPokemon.toPrimitive());
  }
}
