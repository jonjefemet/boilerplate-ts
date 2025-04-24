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
    /* ① Hace visible (y tipada) su config particular */
    ConfigModule.forFeature(pokedexConfig),

    /* ② Conecta SOLO a la DB ‘pokedex’ */
    SharedModule.register(['pokedex']),

    /* ③ Registra los modelos a esa conexión */
    MongooseModule.forFeature(
      [{ name: Pokemon.name, schema: PokemonSchema }],
      'pokedex',
    ),
  ],
})
export class PokedexModule {}
