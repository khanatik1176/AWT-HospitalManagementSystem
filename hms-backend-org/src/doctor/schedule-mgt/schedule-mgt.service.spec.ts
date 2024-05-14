import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleMgtService } from './schedule-mgt.service';

describe('ScheduleMgtService', () => {
  let service: ScheduleMgtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleMgtService],
    }).compile();

    service = module.get<ScheduleMgtService>(ScheduleMgtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
