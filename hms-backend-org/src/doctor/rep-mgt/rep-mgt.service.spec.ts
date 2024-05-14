import { Test, TestingModule } from '@nestjs/testing';
import { RepMgtService } from './rep-mgt.service';

describe('RepMgtService', () => {
  let service: RepMgtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepMgtService],
    }).compile();

    service = module.get<RepMgtService>(RepMgtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
