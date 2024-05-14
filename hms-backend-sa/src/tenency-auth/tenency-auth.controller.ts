import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TenencyAuthService } from './tenency-auth.service';
import { CreateTenencyAuthDto } from './dto/create-tenency-auth.dto';
import { UpdateTenencyAuthDto } from './dto/update-tenency-auth.dto';

@Controller('tenency-auth')
export class TenencyAuthController {
  constructor(private readonly tenencyAuthService: TenencyAuthService) {}

  @Post('signin')
  async findTenentId(@Body() createTenencyAuthDto: CreateTenencyAuthDto) {
    const orgRegistrationNumber = await this.tenencyAuthService.findTenentId(createTenencyAuthDto.TenancyEmail);
    return orgRegistrationNumber;
  }
  
}
