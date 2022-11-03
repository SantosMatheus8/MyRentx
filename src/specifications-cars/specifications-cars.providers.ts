import { Car } from 'src/cars/entities/car.entity';
import { Specification } from 'src/specifications/entities/specification.entity';
import { SpecificationsCar } from './entities/specifications-car.entity';
import { DataSource } from 'typeorm';

export const specificationsCarsProviders = [
  {
    provide: 'SpecificationsCarsRepository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SpecificationsCar),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CarRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Car),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SpecificationRepository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Specification),
    inject: ['DATA_SOURCE'],
  },
];
