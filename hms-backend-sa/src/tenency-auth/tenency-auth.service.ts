import { Injectable } from '@nestjs/common';
import { CreateTenencyAuthDto } from './dto/create-tenency-auth.dto';
import { UpdateTenencyAuthDto } from './dto/update-tenency-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TenancyDataEntity } from 'src/entities/tenency-auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenencyAuthService {

  constructor(
    @InjectRepository(TenancyDataEntity)
    private tenancyAuthRepository: Repository<TenancyDataEntity>,
  ) {}

  async findTenentId(email: string) {
    const tenentExistance = await this.tenancyAuthRepository.findOne({ where: { TenancyEmail: email } });
    if (tenentExistance) {
      return tenentExistance.OrgRegistrationNumber;
    } else {
      return null;
    }
  }
}
