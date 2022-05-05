import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './constants/role.enum';
import { IsActive } from './constants/isactive.enum';
import { Subscription } from './constants/subscription.enum';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: true })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: IsActive,
    default: IsActive.TRUE,
  })
  is_active: IsActive;

  @Column({
    type: 'enum',
    enum: Subscription,
    default: Subscription.SUBSCRIBED,
  })
  subscription: Subscription;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
