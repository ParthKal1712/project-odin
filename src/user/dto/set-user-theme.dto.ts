import { z } from 'zod';
import { z_users_theme } from '../entities/user.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const z_SetUserThemeInputDto = z.object({
  theme: z_users_theme,
});

export const z_SetUserThemeOutputDto = z.object({
  theme: z_users_theme,
  success: z.boolean(),
});

export class SetUserThemeInputDto extends createZodDto(
  z_SetUserThemeInputDto
) {}

export class SetUserThemeOutputDto extends createZodDto(
  z_SetUserThemeOutputDto
) {}
