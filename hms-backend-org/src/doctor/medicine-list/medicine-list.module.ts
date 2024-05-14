import { Module } from '@nestjs/common';
import { MedicineListService } from './medicine-list.service';
import { MedicineListController } from './medicine-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineList } from '../entities/medicine-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineList])],
  controllers: [MedicineListController],
  providers: [MedicineListService],
})
export class MedicineListModule {}
