import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'expeted_return_date' })
  expectedReturnDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => User, (user) => user.rental)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Car, (car) => car.rental)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
