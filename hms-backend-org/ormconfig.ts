import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


// List of Entities
// ----------------
// Admin Entities
import { Admin } from 'src/entities/admin.entity';
// ----------------
// Common Entities
import { Auth } from 'src/entities/auth.entity';
// ----------------
// // Doctor Entities
import { Doctor } from 'src/entities/doctor.entity'
import { DocFinancials } from 'src/doctor/entities/doc-financial.entity';
import { AppointmentList } from 'src/doctor/entities/doctor-appointment-list.entity';
import { MedicineList } from 'src/doctor/entities/medicine-list.entity';
import { PatientPrescription } from 'src/doctor/entities/patient-prescription.entity';
import { RepAppoitment } from 'src/doctor/entities/rep-appointment.entity';
import { RepList } from 'src/doctor/entities/rep-list.entity';
import { ScheduleMgt } from 'src/doctor/entities/schedule-mgt.entity';
// // ----------------
// // Patient Entities
import { Appointment } from 'src/patient/entities/appointment.entity';
import { Feedback } from 'src/patient/entities/feedback.entity';
import { HealthTracker } from 'src/patient/entities/healthTracker.entity';
import { MedicalRecord } from 'src/patient/entities/medicalrecord.entity';
import { SymptomChecker } from 'src/patient/entities/symptomChecker.entity';
import { User } from 'src/patient/entities/user.entity';
// // ----------------


const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'DB_HMS',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  entities: [Auth,
             Admin,
             Doctor,
             ScheduleMgt,
             PatientPrescription,
             AppointmentList,
             DocFinancials,
             RepList,
             RepAppoitment,
             MedicineList,
             Appointment,
             Feedback,
             HealthTracker,
             SymptomChecker,
             User,
             MedicalRecord
            ],
  synchronize: true,
};

export default config;