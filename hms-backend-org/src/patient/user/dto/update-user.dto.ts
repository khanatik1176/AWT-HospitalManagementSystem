import { IsEmail, IsNotEmpty, IsOptional, IsString,Length, Matches} from "class-validator";

export class UpdateUserDto {

    @IsString()
    @Length(8,20, {message : 'Password must be between 8 to 20 characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
      })
    patient_password?: string;
}