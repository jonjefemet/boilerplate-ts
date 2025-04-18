import MockPokedexPokemonRepository from '../../__mocks__/MockPokedexPokemonRepository';
import PokedexPokemonMother from '../../domain/PokedexPokemonMother';
import SearchPokedexPokemonQueryMother from './SearchPokedexPokemonQueryMother';
import PokedexPokemonResponseMother from './PokedexPokemonResponseMother';
import SearchPokedexPokemonQueryHandler from '@pokedex/pokemon/application/search/SearchPokedexPokemonQueryHandler';
import PokedexPokemonSearcher from '@pokedex/pokemon/application/search/PokedexPokemonSearcher';
import PokemonIdMother from '@test/contexts/pokemon/pokemon/domain/PokemonIdMother';

describe('SearchPokedexPokemonQueryHandler', () => {
  let handler: SearchPokedexPokemonQueryHandler;
  let mockPokedexPokemonRepository: MockPokedexPokemonRepository;
  let pokedexPokemonSearcher: PokedexPokemonSearcher;

  beforeEach(() => {
    mockPokedexPokemonRepository = new MockPokedexPokemonRepository();
    pokedexPokemonSearcher = new PokedexPokemonSearcher(
      mockPokedexPokemonRepository,
    );
    handler = new SearchPokedexPokemonQueryHandler(pokedexPokemonSearcher);
  });
  it('should search a pokedex pokemon', async () => {
    const pokemon = PokedexPokemonMother.random();

    const query = SearchPokedexPokemonQueryMother.create(pokemon.id.valueOf());
    mockPokedexPokemonRepository.returnOnSearch(pokemon);
    const result = await handler.handle(query);
    const expected = PokedexPokemonResponseMother.create(pokemon);

    expect(expected).toEqual(result);
  });
  it('should return null if the pokemon is not found', async () => {
    const command = SearchPokedexPokemonQueryMother.create(
      PokemonIdMother.random().valueOf(),
    );

    mockPokedexPokemonRepository.returnOnSearch(null);
    const result = await handler.handle(command);
    expect(result).toBeNull();
  });
});
