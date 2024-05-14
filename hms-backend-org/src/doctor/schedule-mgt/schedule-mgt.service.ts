import { Injectable } from '@nestjs/common';
import { CreateScheduleMgtDto } from './dto/create-schedule-mgt.dto';
import { UpdateScheduleMgtDto } from './dto/update-schedule-mgt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleMgt } from '../entities/schedule-mgt.entity';

@Injectable()
export class ScheduleMgtService {

  constructor(
    @InjectRepository(ScheduleMgt)
    private scheduleMgtRepository: Repository<ScheduleMgt>,
  ) {}

  async createRepository(createScheduleMgtDto: CreateScheduleMgtDto) {
    const scheduleMgtData = await this.scheduleMgtRepository.create(createScheduleMgtDto);
    return await this.scheduleMgtRepository.save(scheduleMgtData);
  }

  findAll() {
    return this.scheduleMgtRepository.find();
  }

  findOne(id: number): Promise<ScheduleMgt | undefined>{
    const scheduleMgtInfo = this.scheduleMgtRepository.findOne({where:{schedule_id:id}});
    return scheduleMgtInfo;
  }

  async update(id: number, updateScheduleMgtDto: UpdateScheduleMgtDto) {
    const scheduleUpdate = await this.scheduleMgtRepository.findOne({ where: { schedule_id: id } });
    if (scheduleUpdate) {
      await this.scheduleMgtRepository.update(id, updateScheduleMgtDto);
      return `${id} Schedule updated successfully`;
    } 
    else {
      return `${id} Schedule not found`;
    }
  }

  async remove(id: number) {
    const scheduleDelete = await this.scheduleMgtRepository.findOne({ where: { schedule_id: id } });
    if (scheduleDelete) {
      await this.scheduleMgtRepository.remove(scheduleDelete);
      return `${id} Schedule deleted successfully`;
    } 
    else {
      return `${id} Schedule not found`;
    }
  }
}
