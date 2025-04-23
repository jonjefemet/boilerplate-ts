import { Global, Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({})
export class SharedModule {
  static register(connectionNames: readonly string[]): DynamicModule {
    return {
      module: SharedModule,
      imports: [
        ConfigModule,
        ...connectionNames.map((name) =>
          MongooseModule.forRootAsync({
            connectionName: name,
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
              uri: cfg.get<string>(`database.${name}.uri`),
              dbName: cfg.get<string>(`database.${name}.dbName`),
            }),
          }),
        ),
      ],
      exports: [MongooseModule],
    };
  }
}
