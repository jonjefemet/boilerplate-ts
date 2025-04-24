import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import pokedexConfig from './config/pokedex.config';
import {
  PokemonSchema,
  Pokemon,
} from './pokemon/infrastructure/mongo/pokemon.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(pokedexConfig),
    SharedModule.register(['pokedex']),
    MongooseModule.forFeature(
      [{ name: Pokemon.name, schema: PokemonSchema }],
      'pokedex',
    ),
  ],
})
export class PokedexModule {}
