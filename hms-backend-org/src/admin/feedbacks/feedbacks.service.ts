import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '../../patient/entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }

  findOne(id: number): Promise<Feedback[]> {
    return this.feedbackRepository.find();
  }

  create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.feedbackRepository.create(createFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id);
  }

  async getAverageRating(): Promise<number> {
    console.log('Inside getAverageRating'); // Add a log to check if the method is being called
    const feedbacks = await this.feedbackRepository.find();
    if (feedbacks.length === 0) {
      return 0;
    }
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.patient_rating, 0);
    return totalRating / feedbacks.length;
  }
}
