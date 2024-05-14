import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../patient/entities/user.entity';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientValidationMiddleware } from './create-patient-validation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PatientValidationMiddleware)
      .forRoutes({ path: 'patients', method: RequestMethod.POST });
  }
}
