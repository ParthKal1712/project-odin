import { z } from 'zod';
import {
  z_users_password,
  z_users_username,
} from '../../user/entities/user.entity';
import { createZodDto } from '@anatine/zod-nestjs';
import { z_auth_authenticateOutput } from '../auth.z';

export const z_loginInputDto = z.object({
  username: z_users_username,
  password: z_users_password,
});

export const z_loginOutputDto = z_auth_authenticateOutput;

export class LoginInputDto extends createZodDto(z_loginInputDto) {}
