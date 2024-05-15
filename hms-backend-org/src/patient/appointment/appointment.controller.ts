import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/gurard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Post('schedule')
  create(@Body(ValidationPipe) createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('View')
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('viewAppointmentDetails/:email')
  findAllByEmail(@Param('email') email: string) {
    return this.appointmentService.findAllByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number) {
    return this.appointmentService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Delete('cancel/:id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    await this.appointmentService.cancel(id);
    return {message:'Appointment Canceled'};
  }



}