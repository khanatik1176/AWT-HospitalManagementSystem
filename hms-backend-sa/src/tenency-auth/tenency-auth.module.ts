import { Module } from '@nestjs/common';
import { TenencyAuthService } from './tenency-auth.service';
import { TenencyAuthController } from './tenency-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenancyDataEntity } from 'src/entities/tenency-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenancyDataEntity])],
  controllers: [TenencyAuthController],
  providers: [TenencyAuthService],
})
export class TenencyAuthModule {}
