import { Module } from '@nestjs/common';
import { ScheduleMgtService } from './schedule-mgt.service';
import { ScheduleMgtController } from './schedule-mgt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleMgt } from '../entities/schedule-mgt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleMgt])],
  controllers: [ScheduleMgtController],
  providers: [ScheduleMgtService],
})

export class ScheduleMgtModule {}