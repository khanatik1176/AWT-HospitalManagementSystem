import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRepAppDto {

    @IsString()
    @IsNotEmpty()
    rep_id: number;

    @IsString()
    @IsNotEmpty()
    doc_id: number;

    @IsString()
    @IsNotEmpty()
    @IsDateString()
    app_date: string;

    @IsString()
    @IsNotEmpty()
    app_time: string;

    @IsString()
    @IsOptional()
    app_note: string;

}