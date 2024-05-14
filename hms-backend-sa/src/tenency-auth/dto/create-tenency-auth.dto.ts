import { IsString, IsEmail, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateTenencyAuthDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    TenancyEmail: string;

    @IsString()
    @IsNotEmpty()
    OrgRegistrationNumber: string;

    @IsBoolean()
    OrgPackageStatus: boolean;

}
