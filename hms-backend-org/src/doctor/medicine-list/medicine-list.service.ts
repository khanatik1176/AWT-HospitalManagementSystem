import { Express } from 'express';
import * as Multer from 'multer';
import { Injectable } from '@nestjs/common';
import { CreateMedicineListDto } from './dto/create-medicine-list.dto';
import { UpdateMedicineListDto } from './dto/update-medicine-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineList } from '../entities/medicine-list.entity';

@Injectable()
export class MedicineListService {
  
  constructor(
    @InjectRepository(MedicineList)
    private medicineListRepository: Repository<MedicineList>,
  ) {}

  async createMedicineRepository(createMedicineListDto: CreateMedicineListDto) {
    const medicineListData = await this.medicineListRepository.create(createMedicineListDto);
    return await this.medicineListRepository.save(medicineListData);
  }

  viewAllMedicine() {
    return this.medicineListRepository.find();
  }

  viewSingleMedicine(id: number): Promise<MedicineList | undefined>{
    const medicineListInfo = this.medicineListRepository.findOne({where: { med_id: id }});
    return medicineListInfo;
  }

  async updateMedicineInfo(id: number, updateMedicineListDto: UpdateMedicineListDto) {
    const medicineUpdate = await this.medicineListRepository.findOne({ where: { med_id: id } });
    if (medicineUpdate) {
      await this.medicineListRepository.update(id, updateMedicineListDto);
      return `Medicine ID: ${id} has been updated successfully`;
    } 
    else {
      return `Medicine ID: ${id} not found`;
    }
  }

  async uploadMedicineImg(id: number, file: Express.Multer.File): Promise<MedicineList> {
    const medicineList = await this.medicineListRepository.findOne({ where: { med_id: id } });

    if (!medicineList) {
        throw new Error('Medicine not found');
    }

    medicineList.med_image_original_name = file.originalname;
    medicineList.med_image_file_name = file.filename;

    if (!file.filename) {
        throw new Error('Filename is required');
    }

    return this.medicineListRepository.save(medicineList);
  }


}
