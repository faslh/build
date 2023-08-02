
      import { DataSource } from 'typeorm';
      import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
      import entites from '../features/entites';
      const options: PostgresConnectionOptions = {
        type: 'postgres',
        useUTC: true,
        url: process.env.CONNECTION_STRING,
        migrationsRun: true,
        entities: [...entites],
        logging: true, // process.env.NODE_ENV !== 'production'
        synchronize: true, // process.env.NODE_ENV !== 'production'
        ssl: process.env.NODE_ENV === 'production',
      };
      export default new DataSource(options);
    