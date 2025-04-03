import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './apps/auth/src/auth.module';
import { PokemonModule } from './apps/pokemon/src/pokemon.module';

@Module({
  imports: [ConfigModule, AuthModule, PokemonModule],
})
export class AppModule {}
