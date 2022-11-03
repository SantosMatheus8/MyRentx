import { Car } from 'src/cars/entities/car.entity';
import { Specification } from 'src/specifications/entities/specification.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('specifications_cars')
export class SpecificationsCar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'car_id' })
  carId: string;

  @PrimaryColumn({ name: 'specification_id' })
  specificationId: string;

  @ManyToOne(() => Car, (car) => car.specificationsCar)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(
    () => Specification,
    (specification) => specification.specificationsCar,
  )
  @JoinColumn({ name: 'specification_id' })
  specification: Specification;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
