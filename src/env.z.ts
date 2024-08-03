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
    DEV_JWT_SECRET: z.string(),
    PROD_POSTGRES_USER: z.string(),
    PROD_POSTGRES_PASSWORD: z.string(),
    PROD_POSTGRES_DB: z.string(),
    PROD_POSTGRES_HOST: z.string(),
    PROD_POSTGRES_PORT: z_env_dbPort,
    PROD_JWT_SECRET: z.string(),
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
          JWT_SECRET: input.DEV_JWT_SECRET,
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
          JWT_SECRET: input.PROD_JWT_SECRET,
        };
        break;
    }
  });

export type Env = z.infer<typeof z_env>;
