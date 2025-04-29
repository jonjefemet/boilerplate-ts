import CreatePokedexPokemonCommand from './CreatePokedexPokemonCommand';
import PokedexPokemonCreator from './PokedexPokemonCreator';

import PokedexPokemonNumberPokedex from '../../domain/PokedexPokemonNumberPokedex';
import PokedexPokemonDescription from '../../domain/PokedexPokemonDescription';
import PokedexPokemonHeight from '../../domain/PokedexPokemonHeight';
import PokedexPokemonWeight from '../../domain/PokedexPokemonWeight';
import Log from '@utils/decorators/Log';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import PokemonName from '@pokemon/pokemon/domain/PokemonName';
import PokemonTypes from '@pokemon/pokemon/domain/PokemonTypes';
import PokemonType from '@pokemon/pokemon/domain/PokemonType';

import { DecoratorCommandHandler } from '@shared/infrastructure/decorators/command-handler.decorator';
import { CommandHandler } from '@shared/domain/bus/command/CommandHandler';

@DecoratorCommandHandler(CreatePokedexPokemonCommand)
export default class CreatePokedexPokemonCommandHandler
  implements CommandHandler<CreatePokedexPokemonCommand>
{
  constructor(private readonly pokedexPokemonCreator: PokedexPokemonCreator) {}

  subscribedTo = () => CreatePokedexPokemonCommand;

  @Log()
  async handle(command: CreatePokedexPokemonCommand): Promise<void> {
    const { id, name, types, numberPokedex, description, height, weight } =
      command;

    const props = {
      id: new PokemonId(id),
      name: new PokemonName(name),
      types: new PokemonTypes(...types.map((type) => PokemonType.from(type))),
      numberPokedex: new PokedexPokemonNumberPokedex(numberPokedex),
      description: new PokedexPokemonDescription(description),
      height: new PokedexPokemonHeight(height),
      weight: new PokedexPokemonWeight(weight),
    };

    await this.pokedexPokemonCreator.create(props);
  }
}
