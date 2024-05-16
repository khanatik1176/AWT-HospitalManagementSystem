import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from '../../entities/doctor.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/gurard/auth.guard';

// @Roles('Admin')
// @UseGuards(AuthGuard)
@Controller('admin/doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Doctor> {
    return this.doctorsService.findOne(email);
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return this.doctorsService.update(email, updateDoctorDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string): Promise<{ message: string }> {
    await this.doctorsService.remove(email);
    return { message: 'Deleted Successfully' };
  }
}
