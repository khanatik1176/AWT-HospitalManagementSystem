import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as pgPromise from 'pg-promise';
import * as bcrypt from 'bcryptjs';

import { CreateOrgMgtDto } from './dto/create-org-mgt.dto';
import { UpdateOrgMgtDto } from './dto/update-org-mgt.dto';
import { CreateTenencyAuthDto } from '../tenency-auth/dto/create-tenency-auth.dto';

import { OrgDataEntity } from 'src/entities/org-mgt.entity';
import { TenancyDataEntity } from 'src/entities/tenency-auth.entity';

@Injectable()
export class OrgMgtService {

  constructor(
    @InjectRepository(OrgDataEntity)
    private orgMgtRepository: Repository<OrgDataEntity>,
    @InjectRepository(TenancyDataEntity)
    private tenancyAuthRepository: Repository<TenancyDataEntity>,
  ) {}
  
  async searchAllOrgData(): Promise<OrgDataEntity[]> {
    const orgData = await this.orgMgtRepository.find();
    return orgData;
  }
  
  searchOrgData(OrgRegistrationNumber: string): Promise<OrgDataEntity | undefined> {
    const orgData = this.orgMgtRepository.findOne({where : {OrgRegistrationNumber: OrgRegistrationNumber}});
    return orgData;
  }

  // async addOrgData(createOrgMgtDto: CreateOrgMgtDto) {
  //   const orgDataExists = await this.orgMgtRepository.findOne({ where: { OrgRegistrationNumber: createOrgMgtDto.OrgRegistrationNumber } });
  //   if (orgDataExists) {
  //     console.log('Organization already exists');
  //   } else {
  //     const orgData = this.orgMgtRepository.create(createOrgMgtDto);
  //     const tenancyData = this.tenancyAuthRepository.create({
  //       TenancyEmail: createOrgMgtDto.OrgEmail,
  //       OrgRegistrationNumber: createOrgMgtDto.OrgRegistrationNumber,
  //     });
  //     await this.orgMgtRepository.save(orgData);
  //     await this.tenancyAuthRepository.save(tenancyData);
  //   }
  // }

  private pgp = pgPromise();

  async addOrgData(createOrgMgtDto: CreateOrgMgtDto) {
    const orgDataExists = await this.orgMgtRepository.findOne({ where: { OrgRegistrationNumber: createOrgMgtDto.OrgRegistrationNumber } });
    if (orgDataExists) {
      console.log('Organization already exists!');
    } else {
      createOrgMgtDto.OrgProductPurchaseDate = new Date(createOrgMgtDto.OrgProductPurchaseDate);
      createOrgMgtDto.OrgProductExpiryDate = new Date(createOrgMgtDto.OrgProductExpiryDate);

      const orgData = this.orgMgtRepository.create(createOrgMgtDto);
      const tenancyData = this.tenancyAuthRepository.create({
        TenancyEmail: createOrgMgtDto.OrgEmail,
        OrgRegistrationNumber: createOrgMgtDto.OrgRegistrationNumber,
      });
      await this.orgMgtRepository.save(orgData);
      console.log('Organization Data added successfully');
      await this.tenancyAuthRepository.save(tenancyData);
      console.log('Tenency Data added successfully');

      // Connect to PostgreSQL server
      const cn = 'postgres://postgres:root@localhost:5432/DB_HMS';
      const db = this.pgp(cn);

      // Create new database
      await db.none('CREATE DATABASE $1~', createOrgMgtDto.OrgRegistrationNumber);

      // Connect to the new database
      const newDbCn = `postgres://postgres:root@localhost:5432/${createOrgMgtDto.OrgRegistrationNumber}`;
      const newDb = this.pgp(newDbCn);

      // Create tables
      await newDb.none(`
        CREATE TABLE auth (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL,
          active BOOLEAN NOT NULL DEFAULT TRUE
        )
      `);

      // Hash the password
      const saltRounds = 10;
      const password = 'Admin@123';
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      // Insert data into the table
      await newDb.none(`
        INSERT INTO auth (email, password, role)
        VALUES ($1, $2, $3)
      `, [createOrgMgtDto.OrgEmail, hashedPassword, 'admin']);

      // Close connections
      this.pgp.end();

      console.log('Organizational Admin Auth Data added successfully');
    }
  }

}
