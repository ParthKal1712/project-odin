import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { z } from 'zod';

@Entity('master_contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 15, array: true })
  phone: string[];

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 16 })
  aadhaarNo: string;

  @CreateDateColumn()
  createdAt: Date;
}

// Zod Validations for Primary Columns

export const z_contacts_id = z.string().uuid();

export const z_contacts_name = z.string().min(1).max(255);

export const z_contacts_email = z.string().email();

export const z_contacts_phone = z.array(z.string().length(15));

export const z_contacts_imageUrl = z.string().url();

export const z_contacts_aadhaarNo = z
  .string()
  .length(16)
  .regex(/^\d{16}$/);
