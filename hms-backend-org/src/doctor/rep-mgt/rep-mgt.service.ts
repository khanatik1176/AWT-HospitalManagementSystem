import { Injectable } from '@nestjs/common';
import { CreateRepListDto } from './dto/create-rep-list.dto';
import { CreateRepAppDto } from './dto/create-rep-app.dto';
import { UpdateRepListDto } from './dto/update-rep-list.dto';
import { UpdateRepAppDto } from './dto/update-rep-app.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepAppoitment } from '../entities/rep-appointment.entity';
import { RepList } from '../entities/rep-list.entity';


@Injectable()
export class RepMgtService {

  constructor(
    @InjectRepository(RepList)
    private repListRepository: Repository<RepList>,
    @InjectRepository(RepAppoitment)
    private repAppointmentRepository: Repository<RepAppoitment>,
  ) {}

  async addRep(createRepListDto: CreateRepListDto) {
    const repListData = await this.repListRepository.create(createRepListDto);
    return await this.repListRepository.save(repListData);
  }

  findOne(rep_id: number): Promise<RepList | undefined> {
    const repListData = this.repListRepository.findOne({where : {rep_id}});
    return repListData;
  }

  async updateRep(id: number, updateRepListDto: UpdateRepListDto) {
    const repListData = await this.repListRepository.findOne({where : {rep_id : id}});
    if (repListData){
      await this.repListRepository.update(id, updateRepListDto);
      return `Updated Rep #${id} information`;
    }
    else {
      return `Rep #${id} not found in database`;
    }
  }

  async addRepAppointment(createRepAppDto: CreateRepAppDto) {
    const repAppListData = await this.repAppointmentRepository.create(createRepAppDto);
    return await this.repAppointmentRepository.save(repAppListData);
  }

  findAppointment(rep_app_id: number): Promise<RepAppoitment | undefined> {
    const repAppointmentListData = this.repAppointmentRepository.findOne({where : {rep_app_id}});
    return repAppointmentListData;
  }

  async updateRepAppointment(id: number, updateRepAppDto: UpdateRepAppDto) {
    const repAppointmentListData = await this.repAppointmentRepository.findOne({where : {rep_app_id : id}});
    if (repAppointmentListData){
      await this.repAppointmentRepository.update(id, updateRepAppDto);
      return `Updated Rep Appointment #${id} Status`;
    }
    else {
      return `Rep Appointment #${id} not found in database`;
    }
  }

  async getRepAppointments(doc_id: number) {
    const today = new Date().toISOString().split('T')[0];

    const repAppointments = await this.repAppointmentRepository
      .createQueryBuilder('repAppointments')
      .where('repAppointments.doc_id = :doc_id', { doc_id })
      .andWhere('repAppointments.app_date = :today', { today })
      .orderBy('repAppointments.app_time', 'ASC')
      .getMany();

    return repAppointments;
  }

}
