import { IsNotEmpty,IsEmail, IsNumber, IsString } from "class-validator";

export class CreateHealthTrackerDto {

    @IsNumber()
    @IsNotEmpty()
    patient_height: number;

    @IsNumber()
    @IsNotEmpty()
    patient_weight: number;

    @IsNumber()
    @IsNotEmpty()
    patient_age: number;

    @IsString()
    @IsNotEmpty()
    healthTracker_Status: string;

    
 
    patient_email: string;  





}
