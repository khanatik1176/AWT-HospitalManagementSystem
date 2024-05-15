import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/gurard/auth.guard';
import { Roles } from '../decorators/roles.decorator';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('find/:email')
  async findAllByEmail(@Param('email') email: string) {
    return await this.userService.findAllByEmail(email);
  }
}