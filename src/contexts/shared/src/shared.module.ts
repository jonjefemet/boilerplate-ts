import { Global, Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * SharedModule.register(['pokedex', 'billing', …])
 *   -> crea 1 conexión por nombre usando
 *      database.<name>.<campo> del ConfigService
 */
@Global()
@Module({})
export class SharedModule {
  static register(names: readonly string[]): DynamicModule {
    return {
      module: SharedModule,
      imports: [
        /* ConfigModule ya está global, pero lo incluimos por si se testea aislado */
        ConfigModule,
        ...names.map((n) =>
          MongooseModule.forRootAsync({
            connectionName: n,
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
              uri: cfg.get<string>(`database.${n}.uri`),
              dbName: cfg.get<string>(`database.${n}.dbName`),
              user: cfg.get<string>(`database.${n}.user`),
              pass: cfg.get<string>(`database.${n}.pass`),
            }),
          }),
        ),
      ],
      exports: [MongooseModule],
    };
  }
}
