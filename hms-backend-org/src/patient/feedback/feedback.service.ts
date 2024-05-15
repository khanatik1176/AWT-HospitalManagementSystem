import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '../entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Session } from 'express-session';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepo: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    // console.log("Feedback Successfully");
    // const feedback_data = await this.feedbackRepo.create(createFeedbackDto);
    // return await this.feedbackRepo.save(feedback_data);
  }

  async findAll() {
    return this.feedbackRepo.find({});
  }

  async findAllByEmail(email: string) {
    return await this.feedbackRepo.find({ where: { patient_email: email } });
  }

  async findbyId(id: number): Promise<Feedback | undefined> {
    const IdInfo = this.feedbackRepo.findOne({ where: { id: id } });
    return IdInfo;
  }
}