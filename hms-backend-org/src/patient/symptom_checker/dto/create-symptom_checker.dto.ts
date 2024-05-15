import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateSymptomCheckerDto {

@IsBoolean()
@IsOptional()
symptoms_1?: boolean;

@IsBoolean()
@IsOptional()
symptoms_2?: boolean;

@IsBoolean()
@IsOptional()
symptoms_3?: boolean;

@IsBoolean()
@IsOptional()
symptoms_4?: boolean;

@IsBoolean()
@IsOptional()
symptoms_5?: boolean;

@IsBoolean()
@IsOptional()
symptoms_6?: boolean;

@IsBoolean()
@IsOptional()
symptoms_7?: boolean;

@IsBoolean()
@IsOptional()
symptoms_8?: boolean;

@IsBoolean()
@IsOptional()
symptoms_9?: boolean;



symptom_Status: string;

@IsString()
@IsNotEmpty()
patient_email: string;  


}
