import { Module, Global } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';

@Global()
@Module({
  imports: [SharedModule.register(['pokedex'])],
})
export class PokedexModule {}
