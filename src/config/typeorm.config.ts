import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmconfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'developer01',
    password: 'Develop01',
    database: 'nest_admin',
    domain: 'ACADEMYDEV',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}
