import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TenancyDataEntity } from 'src/entities/tenency-auth.entity';
import { OrgDataEntity } from 'src/entities/org-mgt.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'HMS_SUPER_ADMIN',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'faisal',
  entities: [TenancyDataEntity,
             OrgDataEntity],
  synchronize: true,
};

export default config;