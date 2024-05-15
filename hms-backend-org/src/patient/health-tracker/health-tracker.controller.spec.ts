import { Test, TestingModule } from '@nestjs/testing';
import { HealthTrackerController } from './health-tracker.controller';
import { HealthTrackerService } from './health-tracker.service';

describe('HealthTrackerController', () => {
  let controller: HealthTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthTrackerController],
      providers: [HealthTrackerService],
    }).compile();

    controller = module.get<HealthTrackerController>(HealthTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
