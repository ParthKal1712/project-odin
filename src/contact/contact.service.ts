import { Injectable } from '@nestjs/common';
import { CreateContactInputDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>
  ) {}

  async create(CreateContactInputDto: CreateContactInputDto) {
    const contact = new Contact();
    // contact.name = CreateContactInputDto.name;
    // if (contact.email) contact.email = CreateContactInputDto.email;
    // if (contact.phone) contact.phone = CreateContactInputDto.phone;
    // if (contact.imageUrl) contact.imageUrl = CreateContactInputDto.imageUrl;
    // if (contact.aadhaarNo) contact.aadhaarNo = CreateContactInputDto.aadhaarNo;
    return await this.contactRepository.save(contact);
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
