import { Car } from 'src/cars/entities/car.entity';
import { DataSource } from 'typeorm';
import { CarsImage } from './entities/cars-image.entity';

export const carsImageProviders = [
  {
    provide: 'CarsImageRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CarsImage),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CarRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Car),
    inject: ['DATA_SOURCE'],
  },
];
