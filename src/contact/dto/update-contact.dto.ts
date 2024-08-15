import { PartialType } from '@nestjs/swagger';
import { CreateContactInputDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactInputDto) {}
