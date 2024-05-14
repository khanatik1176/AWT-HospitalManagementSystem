import { Injectable } from '@nestjs/common';
import { CreatePatientPrescriptionDto } from './dto/create-patient-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentList } from '../entities/doctor-appointment-list.entity';
import { PatientPrescription } from '../entities/patient-prescription.entity';

@Injectable()
export class PatientMgtSysService {
  
  constructor(
    @InjectRepository(PatientPrescription)
    private patientPrescriptionRepository: Repository<PatientPrescription>,
    @InjectRepository(AppointmentList)
    private appointmentListRepository: Repository<AppointmentList>,
  ) {}

  async createPrescription(createPatientPrescriptionDto: CreatePatientPrescriptionDto) {
    const prescriptionData = await this.patientPrescriptionRepository.create(createPatientPrescriptionDto);
    return await this.patientPrescriptionRepository.save(prescriptionData);
  }

  async getAppointments(doctorId: number) {
    const today = new Date().toISOString().split('T')[0];

    const appointments = await this.appointmentListRepository
      .createQueryBuilder('appointment')
      .where('appointment.doctor_id = :doctorId', { doctorId })
      .andWhere('appointment.appointment_date = :today', { today })
      .orderBy('appointment.appointment_time', 'ASC')
      .getMany();

    return appointments;
  }

}
