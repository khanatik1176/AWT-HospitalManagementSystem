import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    try {
      const notification = this.notificationRepository.create(createNotificationDto);
      return await this.notificationRepository.save(notification);
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw new Error('Failed to create notification');
    }
  }

  async findForRecipientType(recipientType: 'doctor' | 'patient' | 'both'): Promise<Notification[]> {
    try {
      return await this.notificationRepository.find({
        where: [{ recipientType }, { recipientType: 'both' }],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw new Error('Failed to fetch notifications');
    }
  }

  async findAll(): Promise<Notification[]> {
    try {
      return await this.notificationRepository.find({ order: { createdAt: 'DESC' } });
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw new Error('Failed to fetch all notifications');
    }
  }

  async findOne(id: number): Promise<Notification> {
    try {
      return await this.notificationRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw new Error('Failed to find notification');
    }
  }

  async remove(id: number): Promise<{message: string}> {
    try {
      await this.notificationRepository.delete(id);
      return {message: "Deleted Successfully"};
    } catch (error) {
      console.error(error); // Handle error appropriately
      throw new Error('Failed to delete notification');
    }
  }
}