import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    auth.role = 'admin';
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

  async findOne(email: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { adminEmail: email } });
  }

  async update(email: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminRepository.update({ adminEmail: email }, updateAdminDto); // Update by email
    return this.adminRepository.findOne({ where: { adminEmail: email } });
  }

  async remove(deletingAdminEmail: string, email: string): Promise<void> {
    const deletingAdmin = await this.adminRepository.findOne({ where: { adminEmail: deletingAdminEmail } });
    const adminToDelete = await this.adminRepository.findOne({ where: { adminEmail: email } });

    if (!deletingAdmin || !adminToDelete) {
      throw new NotFoundException('Admin not found');
    }

    if (deletingAdmin.adminRole === 'SuperAdmin' || (deletingAdmin.adminRole === 'Admin' && adminToDelete.adminRole !== 'Admin')) {
      await this.adminRepository.delete({ adminEmail: email });
    } else {
      throw new UnauthorizedException('You do not have permission to delete this admin');
    }
  }
}
