import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env/env.service';
import { DataSource } from 'typeorm';
import { z_env } from './env/env.z';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => z_env.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    TypeOrmModule.forRoot(
      new EnvService(new ConfigService()).getTypeOrmConfig(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private envService: EnvService,
    private dataSource: DataSource,
  ) {}
}
