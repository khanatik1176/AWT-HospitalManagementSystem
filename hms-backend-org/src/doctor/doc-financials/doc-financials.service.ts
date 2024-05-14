import { Injectable } from '@nestjs/common';
import { CreateDocFinancialDto } from './dto/create-doc-financial.dto';
import { UpdateDocFinancialDto } from './dto/update-doc-financial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocFinancials } from '../entities/doc-financial.entity';

@Injectable()
export class DocFinancialsService {

  constructor(
    @InjectRepository(DocFinancials)
    private docFinancialsRepository: Repository<DocFinancials>,
  ) {}

  async showDocEarnings(doctorId: number): Promise<DocFinancials[]> {
    return this.docFinancialsRepository.find({ where: { doctor_id: doctorId } });
  }

  async showDocEarningsByDate(doctorId: number, startDate: string, endDate: string): Promise<DocFinancials[]> {
    return this.docFinancialsRepository
      .createQueryBuilder("docFinancials")
      .where("docFinancials.doctor_id = :doctorId", { doctorId })
      .andWhere("docFinancials.date > :startDate", { startDate })
      .andWhere("docFinancials.date < :endDate", { endDate })
      .getMany();
  }

  async findCommissions(doctorId: number): Promise<{ todaysCommission: number, last7DaysCommission: number }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
  
    const todaysCommission = await this.docFinancialsRepository
      .createQueryBuilder("docFinancials")
      .select("SUM(docFinancials.doctors_commision)", "sum")
      .where("docFinancials.doctor_id = :doctorId", { doctorId })
      .andWhere("docFinancials.date = :today", { today: today.toISOString() })
      .getRawOne();
  
    const last7DaysCommission = await this.docFinancialsRepository
      .createQueryBuilder("docFinancials")
      .select("SUM(docFinancials.doctors_commision)", "sum")
      .where("docFinancials.doctor_id = :doctorId", { doctorId })
      .andWhere("docFinancials.date BETWEEN :sevenDaysAgo AND :today", { sevenDaysAgo: sevenDaysAgo.toISOString(), today: today.toISOString() })
      .getRawOne();
  
    return { 
      todaysCommission: todaysCommission.sum  || "0", 
      last7DaysCommission: last7DaysCommission.sum || "0"
    };
  }
}
