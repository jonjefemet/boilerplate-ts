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
    CreatePokedexPokemonCommandHandler,
    PokedexPokemonCreator,
    {
      provide: 'PokedexPokemonRepository',
      useClass: MongoPokedexPokemonRepository,
    },
  ],
  exports: [InMemoryCommandBus],
})
export class PokedexModule {}
