import { IsString, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsIn(['doctor', 'patient', 'both'], {
    message: 'recipientType must be either doctor, patient, or both',
  })
  recipientType: 'doctor' | 'patient' | 'both';
}
