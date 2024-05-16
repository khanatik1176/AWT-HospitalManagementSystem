import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from '../../entities/admin.entity';

@Controller('admin/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') email: string): Promise<Admin> { // Fix the parameter name to 'id'
    return this.adminsService.findOne(email);
  }

  @Put(':id')
  async update(@Param('id') email: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.adminsService.update(email, updateAdminDto);
  }

  @Delete(':deletingAdminEmail/:adminEmail')
  async remove(
    @Param('deletingAdminEmail') deletingAdminEmail: string,
    @Param('adminEmail') adminEmail: string,
  ): Promise<void> {
    return this.adminsService.remove(deletingAdminEmail, adminEmail);
  }

}
