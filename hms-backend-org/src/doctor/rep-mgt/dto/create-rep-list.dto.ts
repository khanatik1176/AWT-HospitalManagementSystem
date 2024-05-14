import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, Matches } from 'class-validator';

export class CreateRepListDto {

    @IsString({ message: 'Please enter a representative valid name' })
    @IsNotEmpty()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'rep_name must contain only letters (a-zA-Z) and spaces' })
    rep_name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    rep_email: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('BD')
    rep_phone: string;

    @IsString()
    @IsNotEmpty()
    rep_address: string;

    @IsString()
    @IsNotEmpty()
    rep_company: string;
    
}
