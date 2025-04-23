import { Module, Global } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';

@Global()
@Module({
  imports: [SharedModule],
})
export class PokedexModule {}
