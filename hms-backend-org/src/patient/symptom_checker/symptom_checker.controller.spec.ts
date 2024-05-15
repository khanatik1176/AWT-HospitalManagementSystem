import { Test, TestingModule } from '@nestjs/testing';
import { SymptomCheckerController } from './symptom_checker.controller';
import { SymptomCheckerService } from './symptom_checker.service';

describe('SymptomCheckerController', () => {
  let controller: SymptomCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymptomCheckerController],
      providers: [SymptomCheckerService],
    }).compile();

    controller = module.get<SymptomCheckerController>(SymptomCheckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
