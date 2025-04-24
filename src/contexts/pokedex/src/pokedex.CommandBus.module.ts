// shared/command-bus.module.ts
import { Module } from '@nestjs/common';
import CreatePokedexPokemonCommandHandler from './pokemon/application/create/CreatePokedexPokemonCommandHandler';
import InMemoryCommandBus from '@shared/infrastructure/bus/command/InMemoryCommandBus';
import { CommandBus } from '@shared/domain/bus/command/CommandBus';
import PokedexPokemonCreator from './pokemon/application/create/PokedexPokemonCreator';

@Module({
  providers: [
    CreatePokedexPokemonCommandHandler,
    PokedexPokemonCreator,
    {
      provide: InMemoryCommandBus,
      useFactory: (
        createPokedexPokemonCommandHandler: CreatePokedexPokemonCommandHandler,
      ) => new InMemoryCommandBus([createPokedexPokemonCommandHandler]),
      inject: [CreatePokedexPokemonCommandHandler],
    },
    {
      provide: CommandBus,
      useExisting: InMemoryCommandBus,
    },
  ],
  exports: [CommandBus],
})
export class CommandBusModule {}
