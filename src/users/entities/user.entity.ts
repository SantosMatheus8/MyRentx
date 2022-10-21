import { Rental } from 'src/rentals/entities/rental.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @OneToMany(() => Rental, (rental) => rental.user)
  rental: Rental;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
