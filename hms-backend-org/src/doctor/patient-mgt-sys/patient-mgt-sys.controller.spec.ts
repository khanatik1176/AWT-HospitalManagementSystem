import { Test, TestingModule } from '@nestjs/testing';
import { PatientMgtSysController } from './patient-mgt-sys.controller';
import { PatientMgtSysService } from './patient-mgt-sys.service';

describe('PatientMgtSysController', () => {
  let controller: PatientMgtSysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientMgtSysController],
      providers: [PatientMgtSysService],
    }).compile();

    controller = module.get<PatientMgtSysController>(PatientMgtSysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
