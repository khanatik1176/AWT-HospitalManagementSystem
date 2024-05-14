import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PatientMgtSysService } from './patient-mgt-sys.service';
import { PatientMgtSysController } from './patient-mgt-sys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingMiddleware } from 'src/middleware/logging-middleware';
import { AppointmentList } from '../entities/doctor-appointment-list.entity';
import { PatientPrescription } from '../entities/patient-prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientPrescription]),
            TypeOrmModule.forFeature([AppointmentList])],
  controllers: [PatientMgtSysController],
  providers: [PatientMgtSysService],
})

export class PatientMgtSysModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(PatientMgtSysController);
  }
}
