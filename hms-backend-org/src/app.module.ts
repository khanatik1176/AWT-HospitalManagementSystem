import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import Ormconfig from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { OrgNameStoreMiddleware } from './middleware/org-name-store';
import { DoctorsModule } from './admin/doctors/doctors.module';
import { AdminsModule } from './admin/admins/admins.module';
import { PatientsModule } from './admin/patients/patients.module';
import { NotificationsModule } from './admin/notifications/notifications.module';
import { DocFinancialsModule } from './doctor/doc-financials/doc-financials.module';
import { MedicineListModule } from './doctor/medicine-list/medicine-list.module';
import { PatientMgtSysModule } from './doctor/patient-mgt-sys/patient-mgt-sys.module';
import { RepMgtModule } from './doctor/rep-mgt/rep-mgt.module';
import { ScheduleMgtModule } from './doctor/schedule-mgt/schedule-mgt.module';
import { Appointment } from './patient/entities/appointment.entity';
import { Feedback } from './patient/entities/feedback.entity';
import { HealthTracker } from './patient/entities/healthTracker.entity';
import { MedicalRecord } from './patient/entities/medicalrecord.entity';
import { SymptomChecker } from './patient/entities/symptomChecker.entity';
import { User } from './patient/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forRoot(Ormconfig),
            AuthModule,
            DoctorsModule,
            AdminsModule,
            PatientsModule,
            NotificationsModule,
            AuthModule,
            ScheduleMgtModule,
            PatientMgtSysModule,
            DocFinancialsModule,
            RepMgtModule,
            MedicineListModule,
            Appointment,
            Feedback,
            HealthTracker,
            MedicalRecord,
            SymptomChecker,
            User

          ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(OrgNameStoreMiddleware)
//       .forRoutes('auth/signin');
//   }
// }

export class AppModule { }
