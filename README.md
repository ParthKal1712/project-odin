# Project Odin

I will be updating the documentation abd my Database Structure as I develop it. Keep an eye out on the DB Structure here:
https://dbdiagram.io/d/Project-Odin-669d781c8b4bb5230eef49d5

## Steps

1. Install a new Nest JS Project using the following command:

```bash
nest new project-odin
```

2. In the root folder of the project, create a folder called "postgres" that contains a "docker-compose.yaml" file:

```yaml
version: '3'
services:
  db:
    image: postgres
    restart: always
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB=odin_db
      - POSTGRES_USER=parthkal
      - POSTGRES_PASSWORD=yolo1712

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

3. We can start our project using:

```bash
pnpm run start:dev
```

4. Create a .env file in the root of the project:

```bash
NODE_ENV=dev

DEV_POSTGRES_USER=parthkal
DEV_POSTGRES_PASSWORD=yolo1712
DEV_POSTGRES_DB=odin_db
DEV_POSTGRES_HOST=localhost
DEV_POSTGRES_PORT=5432

PROD_POSTGRES_USER=""
PROD_POSTGRES_PASSWORD=""
PROD_POSTGRES_DB=""
PROD_POSTGRES_HOST=""
PROD_POSTGRES_PORT=1
```

5. Install the Nest JS Config Module to access the Env file using Nest:

```bash
pnpm i @nestjs/config
```

6. Configure the ConfigModule in the main App Module like this:

```node
...
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })]
})
...
```

7. In order to make the Environment Variables Type-safe and validate them at the start, we will create an Env Module using:

```bash
nest g module env
```

8. We will create a service for this module to handle our Environment Variables using:

```bash
nest g service env --no-spec
```

9. Install Zod using:

```bash
pnpm i zod
```

10. Inside the env module, create a new file called "env.z.ts" that contains the Zod Schema for our Env vars:

```node
import { z } from 'zod';

const z_env_dbPort = z.coerce.number().int().min(1).max(65535);

export const z_env = z
  .object({
    NODE_ENV: z.enum(['dev', 'prod']),
    DEV_POSTGRES_USER: z.string(),
    DEV_POSTGRES_PASSWORD: z.string().min(5).max(255),
    DEV_POSTGRES_DB: z.string(),
    DEV_POSTGRES_HOST: z.string(),
    DEV_POSTGRES_PORT: z_env_dbPort,
    PROD_POSTGRES_USER: z.string(),
    PROD_POSTGRES_PASSWORD: z.string(),
    PROD_POSTGRES_DB: z.string(),
    PROD_POSTGRES_HOST: z.string(),
    PROD_POSTGRES_PORT: z_env_dbPort,
  })
  .transform((input) => {
    switch (input.NODE_ENV) {
      case 'dev':
        return {
          NODE_ENV: input.NODE_ENV,
          POSTGRES_USER: input.DEV_POSTGRES_USER,
          POSTGRES_PASSWORD: input.DEV_POSTGRES_PASSWORD,
          POSTGRES_DB: input.DEV_POSTGRES_DB,
          POSTGRES_HOST: input.DEV_POSTGRES_HOST,
          POSTGRES_PORT: input.DEV_POSTGRES_PORT,
        };
        break;
      case 'prod':
        return {
          NODE_ENV: input.NODE_ENV,
          POSTGRES_USER: input.PROD_POSTGRES_USER,
          POSTGRES_PASSWORD: input.PROD_POSTGRES_PASSWORD,
          POSTGRES_DB: input.PROD_POSTGRES_DB,
          POSTGRES_HOST: input.PROD_POSTGRES_HOST,
          POSTGRES_PORT: input.PROD_POSTGRES_PORT,
        };
        break;
    }
  });

export type Env = z.infer<typeof z_env>;
```

11. Now that we have defined the Zod Schema for our Env File, let us validate our ConfigModulle by:

```node
...
ConfigModule.forRoot({
      validate: (env) => z_env.parse(env),
      isGlobal: true,
    }),
...
```

12. In "env.service.ts", we need to import ConfigModule to be able to access our Env Variables. Therefore, we will create a constructor for EnvService class so that these resources are loaded automatically when objects of this class are made.

```node
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}
  ...
}
```

13. The EnvService will have 2 functions: get() and getTypeOrmConfig().

- get() function will return our Environment variables in a Type-Safe way:

```node
...
get<T extends keyof Env>(key: T) {
  return this.configService.get(key, { infer: true });
}
...
```

- getTypeOrmConfig() function will return the Configuration object required for TypeOrmModule.forRoot() initialization function:

```node
...
getTypeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: this.get('POSTGRES_HOST'),
    port: this.get('POSTGRES_PORT'),
    username: this.get('POSTGRES_USER'),
    password: this.get('POSTGRES_PASSWORD'),
    database: this.get('POSTGRES_DB'),
    autoLoadEntities: true,
    synchronize: this.get('NODE_ENV') === 'dev',
    migrations: ['src/migrations/*{.ts,.js}'],
    ssl: this.get('NODE_ENV') === 'prod',
  };
}
...
```

14. We will use TypeORM to access and query our Database. Install TypeORM using:

```bash
pnpm i -- save @nestjs/typeorm typeorm pg
```

15. Now, we will initialize TypeORM in the Nest App by calling the TypeOrmModule.forRoot() under "imports". After this, "app.module.ts" looks like:

```node
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
```

16. Now, we will create a new Module that represents a Table in the database (ie. a resource). To create a new User Resource Module:

```bash
nest g resource user

? What transport layer do you use? (Use arrow keys)
❯ REST API
  GraphQL (code first)
  GraphQL (schema first)
  Microservice (non-HTTP)
  WebSockets

? Would you like to generate CRUD entry points? (y/N) y
```

- This will create a new User Module with the neccessary CRUD points, DTOs and Entity (Table) Schemas

17.
