import { Test, TestingModule } from '@nestjs/testing';
import { HealthTrackerService } from './health-tracker.service';

describe('HealthTrackerService', () => {
  let service: HealthTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthTrackerService],
    }).compile();

    service = module.get<HealthTrackerService>(HealthTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
