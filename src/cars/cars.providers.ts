import { DataSource } from 'typeorm';
import { Car } from './entities/car.entity';

export const carProviders = [
  {
    provide: 'CarRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Car),
    inject: ['DATA_SOURCE'],
  },
];
