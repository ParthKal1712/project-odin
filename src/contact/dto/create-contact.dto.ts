import { z } from 'zod';
import {
  z_contacts_name,
  z_contacts_email,
  z_contacts_phone,
  z_contacts_imageUrl,
  z_contacts_aadhaarNo,
} from '../entities/contact.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const z_CreateContactInputDto = z
  .object({
    name: z_contacts_name,
    email: z_contacts_email.optional(),
    phone: z_contacts_phone.optional(),
    imageUrl: z_contacts_imageUrl.optional(),
    aadhaarNo: z_contacts_aadhaarNo.optional(),
  })
  .refine(
    (value) => {
      !value.email && value.phone.length == 0;
    },
    {
      message: 'Either email or phone number must be provided',
      path: ['email', 'phone'],
    }
  );

export class CreateContactInputDto extends createZodDto(
  z_CreateContactInputDto
) {}
