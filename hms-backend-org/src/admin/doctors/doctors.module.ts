import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../../entities/auth.entity';
import { Doctor } from '../../entities/doctor.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { ValidationMiddleware } from './create-doctors-validation.middleware'; // Import the ValidationMiddleware

@Module({
  imports: [
  TypeOrmModule.forFeature([Auth, Doctor])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'doctors', method: RequestMethod.POST }, // Apply middleware to POST /Doctors route
      );
  }
}