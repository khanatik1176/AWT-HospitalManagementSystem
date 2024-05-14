import { Test, TestingModule } from '@nestjs/testing';
import { PatientMgtSysService } from './patient-mgt-sys.service';

describe('PatientMgtSysService', () => {
  let service: PatientMgtSysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientMgtSysService],
    }).compile();

    service = module.get<PatientMgtSysService>(PatientMgtSysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
