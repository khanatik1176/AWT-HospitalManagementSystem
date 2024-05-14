import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entity';
import { Auth } from '../../entities/auth.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);

    // Create Auth entity
    const auth = new Auth();
    auth.email = createAdminDto.adminEmail;
    auth.password = 'Password123';
    auth.role = 'Admin';
    auth.active = true;

    // Save both entities in a transaction
    await this.authRepository.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(auth);
      await transactionalEntityManager.save(admin);
    });

    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOne({where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    return this.adminRepository.findOne({where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
