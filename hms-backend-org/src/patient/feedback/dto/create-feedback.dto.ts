import { IsNotEmpty, IsString } from "class-validator";

export class CreateFeedbackDto {
  @IsString()
  patient_feedback: string;

  @IsNotEmpty()
  @IsString()
  patient_rating: string;

  @IsString()
  @IsNotEmpty()
  feedback_date: string;

  @IsString()
  patient_email: string;  
}