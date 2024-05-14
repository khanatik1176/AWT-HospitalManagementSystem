import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Put,ParseIntPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { Request } from 'express';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Session } from 'express-session';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  // @Post('signup')
  // async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   return this.authService.signUp(createUserDto);
  // }

  @Post('set-database')
  setDatabase(@Body('databaseName') databaseName: string) {
    process.env.DATABASE_NAME = databaseName;
    console.log(`Database name set to: ${process.env.DATABASE_NAME}`);
  }
  
  @Post('signin')
  async logIn(@Body() createAuthDto: CreateAuthDto)
  {
    return this.authService.logIn(createAuthDto);
  }

  @Put('forgetpassword/:id')
  update(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) updateAuthDto: UpdateAuthDto) {
    return this.authService.forgetPassword(id, updateAuthDto);
  }

  @Get('FindOne/:email')
  findOne(@Param('email') email: string) {
    return this.authService.findOne(email);
  }

}
