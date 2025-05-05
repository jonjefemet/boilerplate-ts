import { Body, Controller, Get, Injectable, Param, Post } from '@nestjs/common';
import CreatePokedexPokemonCommand, {
  CreatePokedexPokemonCommandProps,
} from '@pokedex/pokemon/application/create/CreatePokedexPokemonCommand';
import SearchPokedexPokemonQuery from '@pokedex/pokemon/application/search/SearchPokedexPokemonQuery';

import { CommandBus } from '@shared/domain/bus/command/CommandBus';
import { QueryBus } from '@shared/domain/bus/query/QueryBus';

@Controller('pokedex')
@Injectable()
export class PokedexController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async post(@Body() body: CreatePokedexPokemonCommandProps) {
    const command = new CreatePokedexPokemonCommand({
      description: body.description,
      height: body.height,
      id: body.id,
      name: body.name,
      numberPokedex: body.numberPokedex,
      types: body.types,
      weight: body.weight,
    });

    await this.commandBus.dispatch(command);

    return { statusCode: 201 };
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    const query = new SearchPokedexPokemonQuery({ pokemonId: id });

    const pokemon = await this.queryBus.ask(query);

    return {
      statusCode: 200,
      data: pokemon,
    };
  }
}
