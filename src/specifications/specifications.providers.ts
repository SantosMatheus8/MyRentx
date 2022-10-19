import { DataSource } from 'typeorm';
import { Specification } from './entities/specification.entity';

export const specificationProviders = [
  {
    provide: 'SpecificationRepository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Specification),
    inject: ['DATA_SOURCE'],
  },
];
