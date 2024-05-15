import { Module } from '@nestjs/common';
import { SymptomCheckerService } from './symptom_checker.service';
import { SymptomCheckerController } from './symptom_checker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomChecker } from 'src/entities/symptomChecker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomChecker])],
  controllers: [SymptomCheckerController],
  providers: [SymptomCheckerService],
})
export class SymptomCheckerModule {}
