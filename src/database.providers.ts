import { DataSource } from 'typeorm';
import { CourseRefactoringTest1674754014845 } from './migrations/1674754014845-CourseRefactoringTest';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '@admin123',
        database: 'devtraining',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@admin123',
  database: 'devtraining',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
  migrations:[CourseRefactoringTest1674754014845]
});