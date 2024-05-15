import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from '../../entities/admin.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/gurard/auth.guard';

@Controller('admin/admins')
// @UseGuards(AuthGuard)
// @Roles('Admin')
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
  async findOne(@Param('email') email: string): Promise<Admin> {
    return this.adminsService.findOne(email);
  }

  @Put(':id')
  async update(@Param('email') email: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.adminsService.update(email, updateAdminDto);
  }

  @Delete(':id')
  async remove(@Param('email') email: string): Promise<void> {
    return this.adminsService.remove(email);
  }
}
