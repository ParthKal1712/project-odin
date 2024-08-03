import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env, z_env } from './env.z';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { z } from 'zod';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }

  getAll(): z.infer<typeof z_env> {
    return {
      NODE_ENV: this.get('NODE_ENV'),
      POSTGRES_USER: this.get('POSTGRES_USER'),
      POSTGRES_PASSWORD: this.get('POSTGRES_PASSWORD'),
      POSTGRES_DB: this.get('POSTGRES_DB'),
      POSTGRES_HOST: this.get('POSTGRES_HOST'),
      POSTGRES_PORT: this.get('POSTGRES_PORT'),
      JWT_SECRET: this.get('JWT_SECRET'),
    };
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: this.get('POSTGRES_PORT'),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DB'),
      // entities: ['**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: this.get('NODE_ENV') === 'dev',
      migrations: ['src/migrations/*{.ts,.js}'],
      ssl: this.get('NODE_ENV') === 'prod',
    };
  }
}
