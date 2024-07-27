import { z } from 'zod';
import {
  z_users_name,
  z_users_password,
  z_users_username,
} from '../entities/user.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const z_CreateUserDto = z.object({
  name: z_users_name,
  username: z_users_username,
  password: z_users_password,
});

export class CreateUserDto extends createZodDto(z_CreateUserDto) {}
