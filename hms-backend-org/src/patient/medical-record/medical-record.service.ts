import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../entities/medicalrecord.entity';
import { Session } from 'express-session';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private medicalRecordRepo: Repository<MedicalRecord>,
  ) {}

  async saveFile(file: Express.Multer.File,session: Session): Promise<MedicalRecord> {

    const medicalRecord = new MedicalRecord();
    medicalRecord.originalname = file.originalname;
    medicalRecord.filename = file.filename;
    medicalRecord.patient_email = session['email'];

    if (!medicalRecord.filename) {
      throw new Error('Filename is required');
    }

    console.log("File Uploaded Successfully");
    return this.medicalRecordRepo.save(medicalRecord);
  }
  async getFile(filename: string): Promise<MedicalRecord> {
    return this.medicalRecordRepo.findOne({ where: { filename } });
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordRepo.find();
  }
}