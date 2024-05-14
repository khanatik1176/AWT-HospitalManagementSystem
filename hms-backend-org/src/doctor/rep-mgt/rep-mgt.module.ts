import { Module } from '@nestjs/common';
import { RepMgtService } from './rep-mgt.service';
import { RepMgtController } from './rep-mgt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepAppoitment } from '../entities/rep-appointment.entity';
import { RepList } from '../entities/rep-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepList]),
            TypeOrmModule.forFeature([RepAppoitment])],
  controllers: [RepMgtController],
  providers: [RepMgtService],
})

export class RepMgtModule {}
