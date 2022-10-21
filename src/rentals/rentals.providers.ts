import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Rental } from './entities/rental.entity';

export const rentalProviders = [
  {
    provide: 'RentalRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rental),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CarRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Car),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'UserRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
