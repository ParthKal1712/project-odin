import { z } from 'zod';
import {
  z_users_password,
  z_users_username,
} from '../../user/entities/user.entity';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z_auth_authenticateOutput } from '../auth.z';

export const z_loginInputDto = z.object({
  username: extendApi(z_users_username, {
    description: 'Username of the user',
    example: 'parthkal',
  }),
  password: extendApi(z_users_password, {
    description: 'Password of the user',
    example: 'password',
  }),
});

export const z_loginOutputDto = z_auth_authenticateOutput;

export class LoginInputDto extends createZodDto(z_loginInputDto) {}
