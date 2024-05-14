import { IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export enum RepStatus {
    VALID = 'valid',
    BLACKLISTED = 'blacklisted'
}

export class UpdateRepListDto {

        @IsOptional()
        @IsString()
        @IsNotEmpty()
        rep_email: string;
    
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        @IsPhoneNumber('BD')
        rep_phone: string;
    
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        rep_address: string;
    
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        rep_company: string;
    
        @IsOptional()
        @IsEnum(RepStatus)
        @IsNotEmpty()
        rep_status: RepStatus;

}
