import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from '../../entities/notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  async findForRecipientType(@Query('recipientType') recipientType: 'doctor' | 'patient' | 'both'): Promise<Notification[]> {
    return this.notificationsService.findForRecipientType(recipientType);
  }
}