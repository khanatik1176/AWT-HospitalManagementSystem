import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RepMgtService } from './rep-mgt.service';
import { CreateRepListDto } from './dto/create-rep-list.dto';
import { UpdateRepListDto } from './dto/update-rep-list.dto';
import { CreateRepAppDto } from './dto/create-rep-app.dto';
import { UpdateRepAppDto } from './dto/update-rep-app.dto';
import { AuthGuard } from 'src/auth/gurard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';


@Controller('rep-mgt')
export class RepMgtController {
  constructor(private readonly repMgtService: RepMgtService) {}

  @UseGuards(AuthGuard)
  @Roles('Staff')
  @Post('AddRep')
  addRep(@Body(ValidationPipe) createRepListDto: CreateRepListDto) {
    return this.repMgtService.addRep(createRepListDto);
  }

  @UseGuards(AuthGuard)
  @Roles('Doctor, Staff')
  @Get('SearchRep/:rep_id')
  findOne(@Param('rep_id', ParseIntPipe) rep_id: number) {
    return this.repMgtService.findOne(rep_id);
  }

  @UseGuards(AuthGuard)
  @Roles('Staff')
  @Patch('UpdateRep/:rep_id')
  update(@Param('rep_id', ParseIntPipe) rep_id: number, @Body(ValidationPipe) updateRepListDto: UpdateRepListDto) {
    return this.repMgtService.updateRep(rep_id, updateRepListDto);
  }

  @UseGuards(AuthGuard)
  @Roles('Staff')
  @Post('AddRepAppointment')
  addRepAppointment(@Body(ValidationPipe) createRepAppDto: CreateRepAppDto) {
    return this.repMgtService.addRepAppointment(createRepAppDto);
  }

  @UseGuards(AuthGuard)
  @Roles('Doctor, Staff')
  @Get('SearchRepAppointment/:rep_app_id')
  findOneRepAppointment(@Param('rep_app_id', ParseIntPipe) rep_app_id: number) {
    return this.repMgtService.findAppointment(rep_app_id);
  }

  @UseGuards(AuthGuard)
  @Roles('Doctor, Staff')
  @Get('ViewRepAppointments/:doc_id')
  async getRepAppointments(@Param('doc_id', ParseIntPipe) doc_id: number) {
    const appointments = await this.repMgtService.getRepAppointments(doc_id);
    return appointments;
  }

  @UseGuards(AuthGuard)
  @Roles('Staff')
  @Patch('UpdateRepAppointment/:rep_app_id')
  updateRepAppointment(@Param('rep_app_id', ParseIntPipe) rep_app_id: number, @Body(ValidationPipe) updateRepAppDto: UpdateRepAppDto) {
    return this.repMgtService.updateRepAppointment(rep_app_id, updateRepAppDto);
  }

}
