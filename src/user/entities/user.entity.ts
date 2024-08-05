import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { z } from 'zod';

@Entity('master_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: 'light' })
  theme: string;

  @CreateDateColumn()
  createdAt: Date;
}

// Zod Validations for Primary Columns

export const z_users_id = z.string().uuid();

export const z_users_name = z.string().min(1).max(255);

export const z_users_username = z.string().min(1).max(255);

export const z_users_password = z.string().min(1).max(255);

export const z_users_theme = z.string().min(1).max(255);

export const z_users_createdAt = z.date();
