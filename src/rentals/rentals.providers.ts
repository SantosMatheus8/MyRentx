import { DataSource } from 'typeorm';
import { Rental } from './entities/rental.entity';

export const rentalProviders = [
  {
    provide: 'RentalRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rental),
    inject: ['DATA_SOURCE'],
  },
];
