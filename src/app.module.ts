import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env/env.service';
import { DataSource } from 'typeorm';
import { z_env } from './env/env.z';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => z_env.parse(env),
    }),
    EnvModule,
    TypeOrmModule.forRoot(
      new EnvService(new ConfigService()).getTypeOrmConfig()
    ),
    UserModule,
    AuthModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private envService: EnvService,
    private dataSource: DataSource
  ) {}
}
