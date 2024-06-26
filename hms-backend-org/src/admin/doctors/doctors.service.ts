import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { Auth } from '../../entities/auth.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(createDoctorDto);

    // Create Auth entity
    const auth = new Auth();
    auth.email = createDoctorDto.doctorEmail;
    auth.password = 'Password123'; // You should hash the password in a real application
    auth.role = 'doctor';
    auth.active = true;

    await this.authRepository.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(auth);
      await transactionalEntityManager.save(doctor);
    });

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findOne(email: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { doctorEmail: email } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with email ${email} not found`);
    }
    return doctor;
  }

  async update(email: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { doctorEmail: email } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with email ${email} not found`);
    }
    await this.doctorRepository.update({ doctorEmail: email }, updateDoctorDto);
    return this.doctorRepository.findOne({ where: { doctorEmail: email } });
  }

  async remove(email: string): Promise<void> {
    const doctor = await this.doctorRepository.findOne({ where: { doctorEmail: email } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with email ${email} not found`);
    }
    await this.doctorRepository.delete({ doctorEmail: email });
  }
}
