import { Module } from '@nestjs/common';
import { HealthTrackerService } from './health-tracker.service';
import { HealthTrackerController } from './health-tracker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthTracker } from '../entities/healthTracker.entity';


@Module({
  imports: [TypeOrmModule.forFeature([HealthTracker])],
  controllers: [HealthTrackerController],
  providers: [HealthTrackerService],
})
export class HealthTrackerModule {}
