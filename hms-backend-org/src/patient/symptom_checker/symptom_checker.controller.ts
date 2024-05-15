import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe,ParseIntPipe } from '@nestjs/common';
import { SymptomCheckerService } from './symptom_checker.service';
import { CreateSymptomCheckerDto } from './dto/create-symptom_checker.dto';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/gurard/auth.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('symptom-checker')
export class SymptomCheckerController {
  constructor(private readonly symptomCheckerService: SymptomCheckerService) {}

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Post('add-symptoms')
  create(@Body(ValidationPipe) createSymptomCheckerDto: CreateSymptomCheckerDto,  @Req() req: Request) {
    return this.symptomCheckerService.createSymptoms(createSymptomCheckerDto,req.session);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('checksymptoms/:id')
  findOne (@Param('id',ParseIntPipe) id:number)
  {
    return this.symptomCheckerService.checkSymptoms(id);
  } 

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('View')
  findAll()
  {
    return this.symptomCheckerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('find/:email')
  findByEmail(@Param('email') email: string) {
    return this.symptomCheckerService.findByEmail(email);
  }

  // @UseGuards(AuthGuard)
  // @Roles('patient')
  // @Delete(':id')
  //   async remove(@Param('id',ParseIntPipe) id: number)
  //   {
  //     await this.symptomCheckerService.remove(id);

  //     return {message:'Appointment Canceled'};

  //   }

}