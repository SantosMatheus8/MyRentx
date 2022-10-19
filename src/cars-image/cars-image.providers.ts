import { DataSource } from 'typeorm';
import { CarsImage } from './entities/cars-image.entity';

export const carsImageProviders = [
  {
    provide: 'CarsImageRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CarsImage),
    inject: ['DATA_SOURCE'],
  },
];
