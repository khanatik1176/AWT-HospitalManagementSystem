import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from '../../entities/notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return await this.notificationsService.create(createNotificationDto);
  }

  @Get()
  async findForRecipientType(@Query('recipientType') recipientType: 'doctor' | 'patient' | 'both'): Promise<Notification[]> {
    return await this.notificationsService.findForRecipientType(recipientType);
  }

  @Get('all')
  async findAll(): Promise<Notification[]> {
    return await this.notificationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Notification> {
    return await this.notificationsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{message: string}> {
    return await this.notificationsService.remove(id);
  }
}
