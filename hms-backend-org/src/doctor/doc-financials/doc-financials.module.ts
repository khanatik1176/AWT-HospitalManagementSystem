import { Module } from '@nestjs/common';
import { DocFinancialsService } from './doc-financials.service';
import { DocFinancialsController } from './doc-financials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocFinancials } from '../entities/doc-financial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocFinancials])],
  controllers: [DocFinancialsController],
  providers: [DocFinancialsService],
})

export class DocFinancialsModule {}
