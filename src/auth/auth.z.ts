import { z } from 'zod';
import {
  z_users_id,
  z_users_name,
  z_users_password,
  z_users_username,
} from 'src/user/entities/user.entity';

const z_auth_validateUserInput = z.object({
  username: z_users_username,
  password: z_users_password,
});

const z_auth_validateUserOutput = z.object({
  id: z_users_id,
  username: z_users_username,
  name: z_users_name,
});

const z_auth_authenticateInput = z_auth_validateUserInput;

export const z_auth_authenticateOutput = z.object({
  accessToken: z.string(),
  id: z_users_id,
  username: z_users_username,
  name: z_users_name,
});

export type type_auth_validateUserInput = z.infer<
  typeof z_auth_validateUserInput
>;

export type type_auth_validateUserOutput = z.infer<
  typeof z_auth_validateUserOutput
>;

export type type_auth_authenticateInput = z.infer<
  typeof z_auth_authenticateInput
>;

export type type_auth_authenticateOutput = z.infer<
  typeof z_auth_authenticateOutput
>;
