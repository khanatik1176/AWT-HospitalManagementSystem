import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { MedicalRecord } from '../entities/medicalrecord.entity';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from '../middleware/logging-middleware';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord])],
  providers: [MedicalRecordService],
  controllers: [MedicalRecordController],
})
export class MedicalRecordModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(MedicalRecordController);
  }
}