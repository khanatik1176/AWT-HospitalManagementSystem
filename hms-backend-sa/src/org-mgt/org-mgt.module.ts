import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrgDataEntity } from 'src/entities/org-mgt.entity';
import { TenancyDataEntity } from 'src/entities/tenency-auth.entity';

import { OrgMgtService } from './org-mgt.service';
import { OrgMgtController } from './org-mgt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrgDataEntity]),
            TypeOrmModule.forFeature([TenancyDataEntity])],
  controllers: [OrgMgtController],
  providers: [OrgMgtService],
})
export class OrgMgtModule {}
