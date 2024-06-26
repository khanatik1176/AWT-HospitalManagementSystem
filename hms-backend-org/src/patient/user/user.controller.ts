import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { AuthGuard } from 'src/auth/gurard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('find/:email')
  async findAllByEmail(@Param('email') email: string) {
    return await this.userService.findAllByEmail(email);
  }

  // @UseGuards(AuthGuard)
  // @Roles('doctor')
  @Get('findById/:id')
  async findAllById(@Param('id') id: number) {
    return await this.userService.findAllById(id);
  }
}