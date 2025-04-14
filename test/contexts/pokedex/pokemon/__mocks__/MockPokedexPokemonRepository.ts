import { PokedexPokemon } from '@pokedex/pokemon/domain/PokedexPokemon';
import PokedexPokemonRepository from '@pokedex/pokemon/domain/PokedexPokemonRepository';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import Criteria from '@shared/domain/criteria/Criteria';

export default class MockPokedexPokemonRepository
  implements PokedexPokemonRepository
{
  private readonly mockSearch = jest.fn();

  private readonly mockMatching = jest.fn();

  private readonly mockSave = jest.fn();

  async search(id: PokemonId): Promise<PokedexPokemon> {
    return this.mockSearch(id) as Promise<PokedexPokemon>;
  }

  returnOnSearch(value: PokedexPokemon | null): void {
    this.mockSearch.mockReturnValue(value);
  }

  async matching(criteria: Criteria): Promise<PokedexPokemon[]> {
    return (await this.mockMatching(criteria)) as Promise<PokedexPokemon[]>;
  }

  returnOnMatching(value: PokedexPokemon[]): void {
    this.mockMatching.mockReturnValue(value);
  }

  async save(pokemon: PokedexPokemon): Promise<void> {
    return this.mockSave(pokemon) as Promise<void>;
  }

  assureSaveHasBeenCalledWith(pokemon: PokedexPokemon): void {
    expect(this.mockSave).toHaveBeenCalledWith(pokemon);
  }
}
