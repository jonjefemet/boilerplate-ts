import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import pokedexConfig from './config/pokedex.config';
import {
  PokemonSchema,
  Pokemon,
} from './pokemon/infrastructure/mongo/pokemon.schema';
import { InMemoryCommandBus } from '@shared/infrastructure/bus/command/InMemoryCommandBus';
import { DiscoveryModule } from '@nestjs/core';
import CreatePokedexPokemonCommandHandler from './pokemon/application/create/CreatePokedexPokemonCommandHandler';
import PokedexPokemonCreator from './pokemon/application/create/PokedexPokemonCreator';
import MongoPokedexPokemonRepository from './pokemon/infrastructure/mongo/MongoPokedexPokemonRepository';
import { CommandBus } from '@shared/domain/bus/command/CommandBus';
import { InMemoryQueryBus } from '@shared/infrastructure/bus/query/InMemoryQueryBus';
import { QueryBus } from '@shared/domain/bus/query/QueryBus';
import SearchPokedexPokemonQueryHandler from './pokemon/application/search/SearchPokedexPokemonQueryHandler';
import PokedexPokemonSearcher from './pokemon/application/search/PokedexPokemonSearcher';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forFeature(pokedexConfig),
    SharedModule.register(['pokedex']),
    MongooseModule.forFeature(
      [{ name: Pokemon.name, schema: PokemonSchema }],
      'pokedex',
    ),
  ],
  providers: [
    InMemoryCommandBus,
    {
      provide: CommandBus,
      useExisting: InMemoryCommandBus,
    },
    InMemoryQueryBus,
    {
      provide: QueryBus,
      useExisting: InMemoryQueryBus,
    },
    {
      provide: 'PokedexPokemonRepository',
      useClass: MongoPokedexPokemonRepository,
    },
    SearchPokedexPokemonQueryHandler,
    CreatePokedexPokemonCommandHandler,
    PokedexPokemonSearcher,
    PokedexPokemonCreator,
  ],
  exports: [CommandBus, QueryBus],
})
export class PokedexModule {}
