import { DataSource } from 'typeorm';
import { CreateUsers1666206104015 } from './migrations/1666206104015-CreateUsers';
import { CreateSpecifications1666206457409 } from './migrations/1666206457409-CreateSpecifications';
import { CreateCategories1666206669959 } from './migrations/1666206669959-CreateCategories';
import { CreateCars1666209695110 } from './migrations/1666209695110-CreateCars';
import { CreateCarsImage1666212001149 } from './migrations/1666212001149-CreateCarsImage';
import { CreateRentals1666212215104 } from './migrations/1666212215104-CreateRentals';
import { CreateSpecificationsCars1667430246688 } from './migrations/1667430246688-CreateSpecificationsCars';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        migrations: [
          CreateUsers1666206104015,
          CreateSpecifications1666206457409,
          CreateCategories1666206669959,
          CreateCars1666209695110,
          CreateCarsImage1666212001149,
          CreateRentals1666212215104,
          CreateSpecificationsCars1667430246688,
        ],
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [
    CreateUsers1666206104015,
    CreateSpecifications1666206457409,
    CreateCategories1666206669959,
    CreateCars1666209695110,
    CreateCarsImage1666212001149,
    CreateRentals1666212215104,
    CreateSpecificationsCars1667430246688,
  ],
});
