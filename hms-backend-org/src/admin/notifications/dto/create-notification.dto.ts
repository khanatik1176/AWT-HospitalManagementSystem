import { IsString, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsIn(['doctor', 'patient', 'both'])
  recipientType: 'doctor' | 'patient' | 'both';
}