import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PatientMgtSysService } from './patient-mgt-sys.service';
import { CreatePatientPrescriptionDto } from './dto/create-patient-prescription.dto';
import { AuthGuard } from 'src/auth/gurard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('patient-mgt-sys')
export class PatientMgtSysController {
  constructor(private readonly patientMgtSysService: PatientMgtSysService) {}

  @UseGuards(AuthGuard)
  @Roles('Doctor')
  @Post('CreatePrescription')
  createPrescription(@Body(ValidationPipe) createPatientPrescriptionDto: CreatePatientPrescriptionDto) {
    return this.patientMgtSysService.createPrescription(createPatientPrescriptionDto);
  }

  @UseGuards(AuthGuard)
  @Roles('Doctor, Staff')
  @Get('ViewAppointments/:doctor_id')
  async getAppointments(@Param('doctor_id', ParseIntPipe) doctorId: number) {
    const appointments = await this.patientMgtSysService.getAppointments(doctorId);
    return appointments;
  }
}
