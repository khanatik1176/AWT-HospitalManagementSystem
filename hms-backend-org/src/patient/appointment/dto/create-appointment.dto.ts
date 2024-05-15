import { IsAlpha, IsEmail, Matches,IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {

    @IsNotEmpty()
    @IsString({ message: 'valid name is required' })
    @Matches(/^[a-zA-Z .]*$/, {
        message: 'Fullname can only contain letters, spaces, and periods',
      })
    doctor_name: string;

    @IsNotEmpty()
    @IsString()
    appointment_date: string;

    @IsNotEmpty()
    @IsString()
    appointment_time: string;

    
    patient_email: string;  





}

