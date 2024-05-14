import { Injectable } from '@nestjs/common';
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
    auth.password = 'Password123';
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

  async findOne(id: number): Promise<Doctor> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.doctorRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
