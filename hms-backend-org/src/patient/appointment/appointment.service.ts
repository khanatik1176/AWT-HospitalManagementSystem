import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Session } from 'express-session';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private Appointmentrepo: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    console.log("Appointment Created Successful");
    const appointment_data =
      await this.Appointmentrepo.create(createAppointmentDto);
    return await this.Appointmentrepo.save(appointment_data);
  }

  async findAll() {
    return this.Appointmentrepo.find({});
  }

  async findAllByEmail(email: string) {
    return await this.Appointmentrepo.find({ where: { patient_email: email } });
  }

  async findById(id: number): Promise<Appointment | undefined> {
    const idInfo = this.Appointmentrepo.findOne({ where: { id: id } });

    if (idInfo === null) {
    }

    return idInfo;
  }

  async cancel(id: number) {
    const appointment_Remover = await this.Appointmentrepo.findOne({
      where: { id: id },
    });

    console.log("Appointment Canceled Successful");
    return await this.Appointmentrepo.remove(appointment_Remover);
  }
}