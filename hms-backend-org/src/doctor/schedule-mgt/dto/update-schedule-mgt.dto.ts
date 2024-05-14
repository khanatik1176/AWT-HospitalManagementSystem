import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateScheduleMgtDto {
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    schedule_date?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    schedule_start_time?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    schedule_end_time?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    schedule_status?: string;

}
