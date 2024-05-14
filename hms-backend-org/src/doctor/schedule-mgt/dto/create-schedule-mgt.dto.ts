import { IsNotEmpty, IsString } from "class-validator";

export class CreateScheduleMgtDto {

    @IsNotEmpty()
    @IsString()
    schedule_date: string;

    @IsNotEmpty()
    @IsString()
    schedule_start_time: string;

    @IsNotEmpty()
    @IsString()
    schedule_end_time: string;

    @IsNotEmpty()
    @IsString()
    schedule_status: string;

}
