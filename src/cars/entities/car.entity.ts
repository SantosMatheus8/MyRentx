import { CarsImage } from '../../cars-image/entities/cars-image.entity';
import { Category } from '../../categories/entities/category.entity';
import { Rental } from '../../rentals/entities/rental.entity';
import { SpecificationsCar } from '../../specifications-cars/entities/specifications-car.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'daily_rate' })
  dailyRate: number;

  @Column()
  available: boolean;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({ name: 'fine_amount' })
  fineAmount: number;

  @Column()
  brand: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.car)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => SpecificationsCar,
    (specificationsCar) => specificationsCar.car,
  )
  specificationsCar: SpecificationsCar[];

  @OneToMany(() => Rental, (rental) => rental.user)
  rental: Rental;

  @OneToMany(() => CarsImage, (carsImage) => carsImage.car)
  carsImage: CarsImage;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.available) {
      this.available = true;
    }
  }
}
