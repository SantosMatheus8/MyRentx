import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const emailProviders = [
  {
    provide: 'UserRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
