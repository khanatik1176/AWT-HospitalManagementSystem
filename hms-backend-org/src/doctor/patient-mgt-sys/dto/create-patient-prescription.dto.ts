import { IsNotEmpty, IsNumber, IsString, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class MedicineList {
    @IsString()
    medicine_name: string;
  
    @IsString()
    time_per_day: string;
  
    @IsString()
    duration: string;
  }

export class CreatePatientPrescriptionDto {

    @IsNotEmpty()
    @IsNumber()
    patient_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    doctor_id: number;
    
    @IsNotEmpty()
    @IsString()
    prescription_date: string;
    
    @IsNotEmpty()
    @IsString()
    patient_symptoms: string;
    
    @IsNotEmpty()
    @IsOptional()
    patient_additional_symptoms?: string;
    
    @IsNotEmpty()
    @IsOptional()
    patient_additional_notes?: string;
    
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => MedicineList)
    prescription_rx_body: MedicineList[];
    
    @IsNotEmpty()
    @IsOptional()
    prescription_special_instruction?: string;
    
    @IsNotEmpty()
    @IsOptional()
    prescription_test_name?: string;

}
