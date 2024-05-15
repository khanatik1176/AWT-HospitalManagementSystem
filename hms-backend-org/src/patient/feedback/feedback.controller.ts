import { Body, Controller, ParseIntPipe, Post, ValidationPipe, Get, Param, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/gurard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService){}

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Post('generate')
  create(@Body(ValidationPipe) createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('View')
  findAll() {
    return this.feedbackService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('viewFeedbackByEmail/:email')
  findAllByEmail(@Param('email') email: string) {
    return this.feedbackService.findAllByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number) {
    return this.feedbackService.findbyId(id);
  }
}