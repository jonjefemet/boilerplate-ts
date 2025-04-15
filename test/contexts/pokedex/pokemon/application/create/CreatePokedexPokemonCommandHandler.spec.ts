import MockPokedexPokemonRepository from '../../__mocks__/MockPokedexPokemonRepository';
import CreatePokedexPokemonCommandMother from './CreatePokedexPokemonCommandMother';
import PokedexPokemonMother from '../../domain/PokedexPokemonMother';
import CreatePokedexPokemonCommandHandler from '@pokedex/pokemon/application/create/CreatePokedexPokemonCommandHandler';
import PokedexPokemonCreator from '@pokedex/pokemon/application/create/PokedexPokemonCreator';
import PokedexPokemonInvalidHeightException from '@pokedex/pokemon/domain/exceptions/PokedexPokemonInvalidHeightException';
import PokedexPokemonInvalidWeightException from '@pokedex/pokemon/domain/exceptions/PokedexPokemonInvalidWeightException';
import InvalidPokemonTypeException from '@pokemon/pokemon/domain/exceptions/InvalidPokemonTypeException';
import PokemonTypesCannotBeRepeatedException from '@pokemon/pokemon/domain/exceptions/PokemonTypesCannotBeRepeatedException';

describe('CreatePokedexPokemonCommandHandler', () => {
  let handler: CreatePokedexPokemonCommandHandler;
  let mockPokedexPokemonRepository: MockPokedexPokemonRepository;
  let pokedexPokemonCreator: PokedexPokemonCreator;

  beforeEach(() => {
    mockPokedexPokemonRepository = new MockPokedexPokemonRepository();
    pokedexPokemonCreator = new PokedexPokemonCreator(
      mockPokedexPokemonRepository,
    );
    handler = new CreatePokedexPokemonCommandHandler(pokedexPokemonCreator);
  });
  it('should create a pokedex pokemon', async () => {
    const command = CreatePokedexPokemonCommandMother.random();
    const pokedexPokemon = PokedexPokemonMother.fromCommand(command);
    await handler.handle(command);
    mockPokedexPokemonRepository.assureSaveHasBeenCalledWith(pokedexPokemon);
  });
  it('should throw an error if the pokemon weight is invalid', async () => {
    await expect(async () => {
      const command = CreatePokedexPokemonCommandMother.invalidWeight();
      const pokedexPokemon = PokedexPokemonMother.fromCommand(command);
      await handler.handle(command);
      mockPokedexPokemonRepository.assureSaveHasBeenCalledWith(pokedexPokemon);
    }).rejects.toThrow(PokedexPokemonInvalidWeightException);
  });
  it('should throw an error if the pokemon height is invalid', async () => {
    await expect(async () => {
      const command = CreatePokedexPokemonCommandMother.invalidHeight();
      const pokedexPokemon = PokedexPokemonMother.fromCommand(command);
      await handler.handle(command);
      mockPokedexPokemonRepository.assureSaveHasBeenCalledWith(pokedexPokemon);
    }).rejects.toThrow(PokedexPokemonInvalidHeightException);
  });
  it('should throw an error if types are invalid', async () => {
    await expect(async () => {
      const command = CreatePokedexPokemonCommandMother.invalidTypes();
      const pokedexPokemon = PokedexPokemonMother.fromCommand(command);
      await handler.handle(command);
      mockPokedexPokemonRepository.assureSaveHasBeenCalledWith(pokedexPokemon);
    }).rejects.toThrow(InvalidPokemonTypeException);
  });
  it('should throw an error if types are repeated', async () => {
    await expect(async () => {
      const command = CreatePokedexPokemonCommandMother.repeatedTypes();
      const pokedexPokemon = PokedexPokemonMother.fromCommand(command);
      await handler.handle(command);
      mockPokedexPokemonRepository.assureSaveHasBeenCalledWith(pokedexPokemon);
    }).rejects.toThrow(PokemonTypesCannotBeRepeatedException);
  });
});
