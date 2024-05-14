import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { User } from '../../patient/entities/user.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<User> {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto): Promise<User> {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.patientsService.remove(id);
  }
}
