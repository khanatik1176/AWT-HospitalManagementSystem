import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleMgtController } from './schedule-mgt.controller';
import { ScheduleMgtService } from './schedule-mgt.service';

describe('ScheduleMgtController', () => {
  let controller: ScheduleMgtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleMgtController],
      providers: [ScheduleMgtService],
    }).compile();

    controller = module.get<ScheduleMgtController>(ScheduleMgtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
