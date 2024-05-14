import Ormconfig from 'ormconfig';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgMgtModule } from './org-mgt/org-mgt.module';
import { TenencyAuthModule } from './tenency-auth/tenency-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(Ormconfig),
            OrgMgtModule,
            TenencyAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
