import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from '../../patient/entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('admin/feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  findAll(): Promise<Feedback[]> {
    return this.feedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Feedback[]> {
    return this.feedbacksService.findOne(id);
  }

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    return this.feedbacksService.create(createFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.feedbacksService.remove(id);
  }

  @Get('averageRating')
  async getAverageRating(): Promise<number> {
    console.log('Before calling getAverageRating'); // Add a log before the method call
    const averageRating = await this.feedbacksService.getAverageRating();
    console.log('After calling getAverageRating'); // Add a log after the method call
    return averageRating;
  }
}
