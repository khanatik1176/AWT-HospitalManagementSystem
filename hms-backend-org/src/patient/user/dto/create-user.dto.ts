import { IsEmail, IsNotEmpty, IsString, Matches, Length, IsAlpha } from "class-validator";

export class CreateUserDto {

@IsString()
@IsNotEmpty()
@Matches(/^[a-zA-Z .]*$/, {
  message: 'Fullname can only contain letters, spaces, and periods',
})
@Length(3,30, {message : 'Fullname must be between 3 to 30 characters'})
patient_fullname: string;

@IsEmail()
@IsNotEmpty()
patient_email: string;

@IsString()
@IsNotEmpty()
patient_date_of_birth: string;

@IsString()
@IsNotEmpty()
patient_address: string;

@IsString()
@IsNotEmpty()
@Length(11,11, {message : 'Phone number must be 11 characters'})
patient_phone_number: string;

@IsString()
@IsNotEmpty()
@Length(10,10, {message : 'NID must be 10 characters'})
patient_NID: string;

@IsString()
@IsNotEmpty()
@Length(8,20, {message : 'Password must be between 8 to 20 characters'})
@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
patient_password: string;







}
