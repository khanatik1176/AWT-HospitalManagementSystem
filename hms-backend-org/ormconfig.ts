import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


// List of Entities
// ----------------
// Common Entities
import { Auth } from 'src/entities/auth.entity';
// ----------------
// // Doctor Entities
// import { ScheduleMgt } from 'src/doctor/entities/schedule-mgt.entity';
// import { PatientPrescription } from 'src/doctor/entities/patient-prescription.entity';
// import { AppointmentList } from 'src/doctor/entities/doctor-appointment-list.entity';
// import { DocFinancials } from 'src/doctor/entities/doc-financial.entity';
// import { RepList } from 'src/doctor/entities/rep-list.entity';
// import { RepAppoitment } from 'src/doctor/entities/rep-appointment.entity';
// import { MedicineList } from 'src/doctor/entities/medicine-list.entity';
// // ----------------
// // Patient Entities
// import { Appointment } from 'src/entities/appointment.entity';
// import { Feedback } from 'src/entities/feedback.entity';
// import { HealthTracker } from 'src/entities/healthtracker.entity';
// import { SymptomChecker } from 'src/entities/symptomChecker.entity';
// import { User } from 'src/entities/user.entity';
// import { MedicalRecord } from 'src/entities/medicalrecord.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'HSM03464',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  entities: [Auth //,
            //  ScheduleMgt,
            //  PatientPrescription,
            //  AppointmentList,
            //  DocFinancials,
            //  RepList,
            //  RepAppoitment,
            //  MedicineList,
            //  Appointment,
            //  Feedback,
            //  HealthTracker,
            //  SymptomChecker,
            //  User,
            //  MedicalRecord
            ],
  synchronize: true,
};

export default config;