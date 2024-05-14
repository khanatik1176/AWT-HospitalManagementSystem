import { IsBoolean, IsEmail, IsNotEmpty, IsString,Length, Matches} from "class-validator";

export class CreateAuthDto {

@IsEmail()
@IsNotEmpty()
email: string;

@IsString()
@IsNotEmpty()
@Length(8,20, {message : 'Password must be between 8 to 20 characters'})
@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
  password: string;


  @IsString()
  role: string;

  @IsBoolean()
  active: boolean = true;

}
